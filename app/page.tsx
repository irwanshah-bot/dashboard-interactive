'use client';

import { useMemo, useState } from 'react';
import { Activity, ArrowUpRight, Bell, Building2, ChevronDown, Home, Menu, Search, Users, X } from 'lucide-react';
import './styles.css';

const residents = [
  { name: 'Aiman Hakim', unit: 'A-12-03', status: 'Aktif', type: 'Pemilik', move: '12 Jan 2026' },
  { name: 'Nur Aisyah', unit: 'B-08-11', status: 'Aktif', type: 'Penyewa', move: '08 Feb 2026' },
  { name: 'Daniel Lim', unit: 'C-04-02', status: 'Aktif', type: 'Pemilik', move: '19 Mac 2026' },
  { name: 'Siti Mariam', unit: 'A-03-09', status: 'Semakan', type: 'Penyewa', move: '27 Apr 2026' },
  { name: 'Kumar Raj', unit: 'B-15-07', status: 'Aktif', type: 'Pemilik', move: '02 Mei 2026' },
  { name: 'Farah Nadia', unit: 'C-11-06', status: 'Aktif', type: 'Penyewa', move: '14 Jun 2026' },
];

export default function Dashboard() {
  const [query, setQuery] = useState('');
  const [menu, setMenu] = useState(false);
  const filtered = useMemo(() => residents.filter(r => `${r.name} ${r.unit} ${r.type}`.toLowerCase().includes(query.toLowerCase())), [query]);
  return (
    <main className="shell">
      <aside className={menu ? 'sidebar open' : 'sidebar'}>
        <div className="brand"><div className="logo">D</div><div><b>Dashboard</b><span>Interactive</span></div><button className="close" onClick={() => setMenu(false)}><X size={20}/></button></div>
        <nav><a className="active"><Home size={18}/> Overview</a><a><Users size={18}/> Residents</a><a><Building2 size={18}/> Units</a><a><Activity size={18}/> Analytics</a></nav>
        <div className="side-card"><span>Occupancy</span><strong>87.4%</strong><div className="progress"><i style={{width:'87.4%'}}/></div><small>+4.8% this month</small></div>
      </aside>
      <section className="content">
        <header><button className="hamb" onClick={() => setMenu(true)}><Menu/></button><div><p className="eyebrow">MONDAY, 10 AUGUST 2026</p><h1>Good morning, Admin 👋</h1><p className="muted">Here’s what’s happening in your community today.</p></div><div className="header-actions"><button className="icon"><Bell size={19}/><i/></button><div className="avatar">IR</div><button className="user">Irwan <ChevronDown size={15}/></button></div></header>
        <div className="toolbar"><div className="search"><Search size={18}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search residents, units..."/></div><button className="filter">This month <ChevronDown size={16}/></button></div>
        <section className="stats">
          <Card icon={<Users/>} label="Total Residents" value="1,284" change="+8.2%"/><Card icon={<Home/>} label="Occupied Units" value="842" change="+3.4%"/><Card icon={<Building2/>} label="Available Units" value="124" change="−2.1%"/><Card icon={<Activity/>} label="Pending Reviews" value="18" change="+5 today"/>
        </section>
        <section className="grid"><div className="panel chart"><div className="panel-head"><div><h2>Residents overview</h2><p className="muted">Monthly resident activity</p></div><button className="filter">Last 6 months <ChevronDown size={15}/></button></div><div className="chart-area"><div className="y"><span>1.4k</span><span>1.1k</span><span>800</span><span>500</span><span>200</span></div><div className="bars">{[56,64,61,74,82,91].map((h,i)=><div className="bar-wrap" key={i}><div className="bar" style={{height:`${h}%`}}/><span>{['Mar','Apr','May','Jun','Jul','Aug'][i]}</span></div>)}</div></div></div>
          <div className="panel activity"><div className="panel-head"><div><h2>Quick insights</h2><p className="muted">Live community signals</p></div></div><div className="insight"><span className="dot green"/><div><b>Occupancy is rising</b><p>42 new residents this month</p></div><ArrowUpRight/></div><div className="insight"><span className="dot orange"/><div><b>18 reviews pending</b><p>Needs admin attention</p></div><ArrowUpRight/></div><div className="insight"><span className="dot purple"/><div><b>12 units available</b><p>New listings this week</p></div><ArrowUpRight/></div></div></section>
        <section className="panel table-panel"><div className="panel-head"><div><h2>Recent residents</h2><p className="muted">Latest updates across the community</p></div><button className="view">View all <ArrowUpRight size={16}/></button></div><div className="table"><div className="tr th"><span>Resident</span><span>Unit</span><span>Type</span><span>Status</span><span>Move in</span></div>{filtered.map(r=><div className="tr" key={r.unit}><span className="person"><span className="mini">{r.name.split(' ').map(x=>x[0]).join('').slice(0,2)}</span><b>{r.name}</b></span><span>{r.unit}</span><span>{r.type}</span><span><em className={r.status === 'Aktif' ? 'pill active' : 'pill review'}>{r.status}</em></span><span>{r.move}</span></div>)}</div></section>
        <footer>Dashboard Interactive <span>•</span> Built for your community <span>•</span> <b>Live</b></footer>
      </section>
    </main>
  );
}
function Card({icon,label,value,change}:{icon:React.ReactNode,label:string,value:string,change:string}) { return <div className="stat"><div className="stat-icon">{icon}</div><div><p>{label}</p><strong>{value}</strong><small>{change} <span>vs last month</span></small></div></div> }
