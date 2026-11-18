import { useEffect, lazy, Suspense } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AppShell } from './components/layout/AppShell'
import { useAuthStore } from './stores/authStore'

const AuthPage=lazy(()=>import('./pages/AuthPage').then((module)=>({default:module.AuthPage})))
const HomePage=lazy(()=>import('./pages/HomePage').then((module)=>({default:module.HomePage})))
const RidesPage=lazy(()=>import('./pages/RidesPage').then((module)=>({default:module.RidesPage})))
const RequestsPage=lazy(()=>import('./pages/RequestsPage').then((module)=>({default:module.RequestsPage})))
const ChatPage=lazy(()=>import('./pages/ChatPage').then((module)=>({default:module.ChatPage})))
const ProfilePage=lazy(()=>import('./pages/ProfilePage').then((module)=>({default:module.ProfilePage})))
function ProtectedApp(){const user=useAuthStore((state)=>state.user);if(!user)return <Navigate to="/signin" replace/>;return <AppShell/>}
function LoadingScreen(){return <div className="route-loading" role="status"><span className="loading-mark"/><b>Opening Jatria…</b></div>}
export default function App(){const initialize=useAuthStore((state)=>state.initialize);const isReady=useAuthStore((state)=>state.isReady);useEffect(()=>{let cancelled=false;let unsubscribe:()=>void=()=>{};void initialize().then((stop)=>{if(cancelled)stop();else unsubscribe=stop});return()=>{cancelled=true;unsubscribe()}},[initialize]);if(!isReady)return <LoadingScreen/>;return <Suspense fallback={<LoadingScreen/>}><Routes><Route path="/" element={<Navigate to="/app" replace/>}/><Route path="/signin" element={<AuthPage mode="signin"/>}/><Route path="/register" element={<AuthPage mode="register"/>}/><Route path="/app" element={<ProtectedApp/>}><Route index element={<HomePage/>}/><Route path="rides" element={<RidesPage/>}/><Route path="requests" element={<RequestsPage/>}/><Route path="chat" element={<ChatPage/>}/><Route path="profile" element={<ProfilePage/>}/></Route><Route path="*" element={<Navigate to="/app" replace/>}/></Routes></Suspense>}
