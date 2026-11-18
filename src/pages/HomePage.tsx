import { ArrowDownLeft, ArrowUpRight, ArrowRight, CarFront, Compass, Clock3, MapPin, Plus, Route, Sparkles, UsersRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuthStore } from '../stores/authStore'
import { useProfileStore } from '../stores/profileStore'
import { useRideStore } from '../stores/rideStore'

export function HomePage() {
  const user = useAuthStore((state) => state.user)!
  const firstName = user.fullName.split(' ')[0]
  const isDriver = user.role === 'driver'
  const openRequests = useRideStore((state) => state.requests.filter((request) => request.status === 'open').length)
  const driverCount = useProfileStore((state) => state.profiles.filter((profile) => profile.role === 'driver' && profile.id !== user.id).length)
  const recentRequest = useRideStore((state) => state.requests.filter((request) => isDriver ? request.driverId === user.id || request.status === 'open' : request.passengerId === user.id).sort((a,b)=>b.createdAt-a.createdAt)[0])
  return <div className="page-stack">
    <section className="welcome-row"><div><div className="eyebrow"><Sparkles size={14}/> YOUR JATRIA DASHBOARD</div><h1>Good morning, {firstName}<span className="wave"></span></h1><p className="page-lede">{isDriver ? 'Your next passenger could be just around the corner.' : 'A better ride starts with a shared journey.'}</p></div><Link to={isDriver?'/app/requests':'/app/rides'} className="button button-primary"><Plus size={17}/>{isDriver ? 'Browse requests' : 'Find a ride'}</Link></section>
    <section className="hero-panel"><div className="hero-copy"><div className="hero-kicker"><span className="hero-kicker-icon"><Route size={14}/></span> THE SMARTER WAY TO MOVE</div><h2>{isDriver ? 'Ready for your next trip?' : 'Where are you heading?'}</h2><p>{isDriver ? 'Explore nearby requests, meet new riders, and make every trip count.' : 'Connect with trusted local drivers and make the most of every journey.'}</p><Link to={isDriver ? '/app/requests' : '/app/rides'} className="hero-link">{isDriver ? 'Open ride requests' : 'Explore nearby rides'} <ArrowRight size={16}/></Link></div><div className="hero-art" aria-hidden="true"><div className="orbit orbit-one"/><div className="orbit orbit-two"/><div className="map-route"><span className="route-pin start"/><span className="route-pin end"/><svg viewBox="0 0 260 150"><path d="M28 120 C65 115, 60 45, 116 63 S176 133 226 34" fill="none" stroke="#0d9f8f" strokeWidth="3" strokeDasharray="6 8" strokeLinecap="round"/></svg></div><div className="floating-car"><CarFront size={32}/></div><div className="floating-label"><MapPin size={12}/> Gulshan, Dhaka</div></div></section>
    <section className="stats-grid"><StatCard icon={<Route size={18}/>} tone="mint" label={isDriver ? 'Requests nearby' : 'Available drivers'} value={String(isDriver ? openRequests : driverCount)} note={isDriver ? 'Open requests in Jatria' : 'Jatria driver accounts'} trend={<><ArrowUpRight size={14}/>{isDriver ? openRequests : driverCount} active</>}/><StatCard icon={<UsersRound size={18}/>} tone="lavender" label="Community rating" value={`${user.rating.toFixed(2)} / 5`} note="Built on trusted rides" trend={<span className="star-rating">★★★★★</span>}/><StatCard icon={<Clock3 size={18}/>} tone="peach" label="Your trips" value={String(user.trips)} note="Since joining Jatria" trend={<><ArrowUpRight size={14}/> On the move</>}/></section>
    <section className="lower-grid"><article className="surface-card activity-card"><div className="section-heading"><div><h3>Recent activity</h3><p>Your latest ride updates</p></div><Link to="/app/requests" className="text-link">View all <ArrowRight size={14}/></Link></div>{recentRequest?<div className="activity-empty"><div className="empty-icon"><Route size={21}/></div><div><b>{recentRequest.pickup.name} to {recentRequest.dropoff.name}</b><p>{recentRequest.status.replaceAll('_',' ')} · {recentRequest.currency}{recentRequest.fare}</p></div></div>:<div className="activity-empty"><div className="empty-icon"><Route size={21}/></div><div><b>Your journey starts here</b><p>{isDriver?'New passenger requests will appear here.':'Ride requests and confirmations will show up here.'}</p></div></div>}</article><article className="surface-card quick-card"><div className="section-heading"><div><h3>Quick actions</h3><p>Get where you need to go</p></div></div><Link to={isDriver ? '/app/requests' : '/app/rides'} className="quick-action"><span className="quick-icon"><Compass size={18}/></span><span><b>{isDriver ? 'Browse ride requests' : 'Explore nearby drivers'}</b><small>{isDriver ? 'Choose a trip that fits your route' : 'Find a ride that works for you'}</small></span><ArrowRight size={16}/></Link><Link to="/app/profile" className="quick-action"><span className="quick-icon quick-icon-soft"><UsersRound size={18}/></span><span><b>Complete your profile</b><small>Add details so others know you</small></span><ArrowRight size={16}/></Link></article></section>
    <div className="dashboard-footnote"><span><ArrowDownLeft size={14}/></span> Built for the way Dhaka moves <i/> Powered by community
    </div>
  </div>
}

function StatCard({ icon, tone, label, value, note, trend }: { icon: React.ReactNode; tone: string; label: string; value: string; note: string; trend: React.ReactNode }) {
  return <article className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><span className="stat-label">{label}</span><div className="stat-value">{value}</div><div className="stat-bottom"><span>{note}</span><span className="stat-trend">{trend}</span></div></article>
}



