import { useEffect } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { CarFront, ChevronDown, Compass, LayoutDashboard, LogOut, MessageCircle, Plus } from 'lucide-react'
import { useAuthStore } from '../../stores/authStore'
import { useProfileStore } from '../../stores/profileStore'
import { useRideStore } from '../../stores/rideStore'

const sharedNavItems=[{to:'/app',label:'Overview',icon:LayoutDashboard,end:true},{to:'/app/requests',label:'Ride requests',icon:CarFront},{to:'/app/chat',label:'Messages',icon:MessageCircle}]
const titles:Record<string,string>={'/app':'Overview','/app/rides':'Find a ride','/app/requests':'Ride requests','/app/chat':'Messages','/app/profile':'Your profile'}

export function AppShell(){
 const user=useAuthStore((state)=>state.user)!
 const signOut=useAuthStore((state)=>state.signOut)
 const {pathname}=useLocation()
 const initials=user.fullName.split(' ').map((part)=>part[0]).slice(0,2).join('').toUpperCase()
 const initProfiles=useProfileStore((state)=>state.initialize)
 const initRides=useRideStore((state)=>state.initialize)
 const navItems=user.role==='passenger'?[sharedNavItems[0],{to:'/app/rides',label:'Find a ride',icon:Compass},...sharedNavItems.slice(1)]:sharedNavItems

 useEffect(()=>{let cancelled=false;let stopProfiles:()=>void=()=>{};let stopRides:()=>void=()=>{};void initProfiles().then((stop)=>{if(cancelled)stop();else stopProfiles=stop});void initRides().then((stop)=>{if(cancelled)stop();else stopRides=stop});return()=>{cancelled=true;stopProfiles();stopRides()}},[initProfiles,initRides])

 return <div className="app-shell"><aside className="sidebar"><Link className="brand-lockup" to="/app"><img src="/brand/jatria-symbol.svg" alt=""/><span>Jatria</span></Link><div className="workspace-label">YOUR SPACE</div><nav className="side-nav" aria-label="Main navigation">{navItems.map(({to,label,icon:Icon,end})=><NavLink key={to} to={to} end={end} className={({isActive})=>`nav-link${isActive?' active':''}`}><Icon size={19}/><span>{label}</span></NavLink>)}</nav><div className="sidebar-spacer"/>{user.role==='passenger'&&<Link className="sidebar-cta" to="/app/rides"><span className="cta-icon"><Plus size={17}/></span><span><b>Plan a ride</b><small>Find your next trip</small></span></Link>}<div className="sidebar-bottom"><Link className="profile-mini" to="/app/profile"><span className="avatar avatar-small">{initials}</span><span className="mini-copy"><b>{user.fullName}</b><small>{user.role==='driver'?'Driver account':'Passenger account'}</small></span><ChevronDown size={16}/></Link><button className="signout-link" onClick={()=>void signOut()}><LogOut size={15}/> Sign out</button></div></aside><main className="main-area"><header className="topbar"><div className="breadcrumbs"><span>Jatria</span><span className="crumb-divider">/</span><strong>{titles[pathname]??'Overview'}</strong></div><div className="topbar-actions"><Link to="/app/profile" className="avatar avatar-top" aria-label="Your profile">{initials}</Link></div></header><div className="page-content"><Outlet/></div></main><nav className="mobile-nav" aria-label="Mobile navigation">{navItems.map(({to,label,icon:Icon,end})=><NavLink key={to} to={to} end={end}><Icon size={19}/><span>{label==='Overview'?'Home':label==='Find a ride'?'Rides':label==='Ride requests'?'Requests':'Chat'}</span></NavLink>)}</nav></div>
}
