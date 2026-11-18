import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowUp, CheckCheck, MessageCircle, MoreHorizontal, ShieldCheck } from 'lucide-react'
import { useAuthStore } from '../stores/authStore'
import { useRideStore } from '../stores/rideStore'
import { useProfileStore } from '../stores/profileStore'
import { isChatConfigured, sendChatMessage, subscribeToChat } from '../services/chat/firebaseChat'
import type { ChatMessage, RideRequest, UserProfile } from '../types'

const EMPTY_MESSAGES:ChatMessage[]=[]
export function ChatPage(){
 const user=useAuthStore((state)=>state.user)!;
 const requests=useRideStore((state)=>state.requests);
 const profiles=useProfileStore((state)=>state.profiles);
 const conversations=useMemo(()=>requests.filter((request)=>request.status==='confirmed'&&(request.passengerId===user.id||request.driverId===user.id)).sort((a,b)=>b.createdAt-a.createdAt),[requests,user.id]);
 const [selectedId,setSelectedId]=useState('');
 const [thread,setThread]=useState<{requestId:string;messages:ChatMessage[]}|null>(null);
 const [chatError,setChatError]=useState<{requestId:string;message:string}|null>(null);
 const [draft,setDraft]=useState('');
 const bottomRef=useRef<HTMLDivElement>(null);
 const selected=conversations.find((request)=>request.id===selectedId)??conversations[0];
 const peerName=(request:RideRequest)=>otherName(request,user,profiles);
 const selectedRequestId=selected?.id;
 const messages=thread && thread.requestId===selectedRequestId?thread.messages:EMPTY_MESSAGES;
 const loading=Boolean(selectedRequestId&&isChatConfigured&&thread?.requestId!==selectedRequestId);
 const error=selectedRequestId?(chatError?.requestId===selectedRequestId?chatError.message:!isChatConfigured?'Add Firebase Realtime Database values to .env to enable live messages.':''):''
 useEffect(()=>{if(!selectedRequestId||!isChatConfigured)return;let disposed=false;let unsubscribe:()=>void=()=>undefined;void subscribeToChat(selectedRequestId,(next)=>setThread({requestId:selectedRequestId,messages:next}),(caught)=>setChatError({requestId:selectedRequestId,message:caught.message})).then((stop)=>{if(disposed)stop();else unsubscribe=stop}).catch((caught:unknown)=>setChatError({requestId:selectedRequestId,message:caught instanceof Error?caught.message:'Could not load chat.'}));return()=>{disposed=true;unsubscribe()}},[selectedRequestId])
 useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:'smooth'})},[messages])
 async function send(event:React.FormEvent){event.preventDefault();const text=draft.trim();if(!selected||!text||!isChatConfigured)return;try{await sendChatMessage({requestId:selected.id,senderId:user.id,senderName:user.fullName,senderRole:user.role,text});setDraft('');setChatError(null)}catch(caught){setChatError({requestId:selected.id,message:caught instanceof Error?caught.message:'Could not send this message.'})}}
 if(!conversations.length)return <section className="page-stack"><div className="welcome-row"><div><div className="eyebrow">STAY CONNECTED</div><h1>Messages</h1><p className="page-lede">Chat opens once both sides confirm a ride.</p></div></div><div className="surface-card request-empty"><div className="empty-icon"><MessageCircle size={21}/></div><h3>No confirmed ride chats</h3><p>Once a driver accepts and a passenger confirms a request, your conversation will be ready here.</p></div></section>
 return <section className="page-stack">
    <div className="welcome-row chat-page-heading">
        <div><div className="eyebrow">STAY CONNECTED</div>
        <h1>Messages</h1>
        <p className="page-lede">Coordinate pickup details with your confirmed ride partner.</p>
        </div></div>
        <div className="chat-layout surface-card"><aside className="conversation-list">
            <div className="conversation-heading">
                <div><b>Conversations</b><small>{conversations.length} confirmed ride{conversations.length===1?'':'s'}</small></div>
                <button className="icon-button" aria-label="More conversation options"><MoreHorizontal size={17}/></button></div>{conversations.map((request)=><button key={request.id} className={`conversation-item${request.id===selected?.id?' selected':''}`} onClick={()=>setSelectedId(request.id)}><span className="conversation-avatar">{initials(peerName(request))}</span><span className="conversation-text"><b>{peerName(request)}</b><small>{request.pickup.name} to {request.dropoff.name}</small></span><span className="conversation-time">Now</span></button>)}</aside><div className="chat-thread">{selected&&<><header className="thread-header"><span className="conversation-avatar large">{initials(peerName(selected))}</span><div className="thread-peer"><b>{peerName(selected)}</b><small><span/> Ride confirmed · {selected.pickup.name}</small></div><button className="icon-button" aria-label="Chat options"><MoreHorizontal size={18}/></button></header><div className="thread-context"><ShieldCheck size={14}/><span>Messages are only available to the confirmed ride participants.</span></div><div className="message-history">{loading?<div className="chat-loading">Loading messages…</div>:messages.length===0?<div className="chat-first-message"><div className="empty-icon"><MessageCircle size={18}/></div><b>Say hello to {peerName(selected).split(' ')[0]}</b><span>Confirm your pickup details to get started.</span></div>:messages.map((message)=><MessageBubble key={message.id} message={message} own={message.senderId?message.senderId===user.id:message.senderRole===user.role}/>)}<div ref={bottomRef}/></div>{error&&<div className="chat-error" role="status">{error}</div>}<form className="message-composer" onSubmit={send}><input value={draft} onChange={(event)=>setDraft(event.target.value)} placeholder={isChatConfigured?'Write a message…':'Configure Firebase to send a message'} disabled={!isChatConfigured}/><span className="composer-hint">Enter to send</span><button className="send-button" type="submit" aria-label="Send message" disabled={!isChatConfigured||!draft.trim()}><ArrowUp size={17}/></button></form></>}</div></div></section>
}
function otherName(request:RideRequest,user:UserProfile,profiles:UserProfile[]){const otherId=request.passengerId===user.id?request.driverId:request.passengerId;const storedName=request.passengerId===user.id?request.driverName:request.passengerName;return profiles.find((profile)=>profile.id===otherId)?.fullName??storedName??(request.passengerId===user.id?'Driver':'Passenger')}
function initials(name:string){return name.split(' ').map((part)=>part[0]).slice(0,2).join('').toUpperCase()}
function MessageBubble({message,own}:{message:ChatMessage;own:boolean}){const time=new Date(message.createdAt).toLocaleTimeString([],{hour:'numeric',minute:'2-digit'});return <div className={`message-row${own?' own':''}`}><div className="message-bubble"><p>{message.text}</p><small>{time}{own&&<CheckCheck size={12}/>}</small></div></div>}




