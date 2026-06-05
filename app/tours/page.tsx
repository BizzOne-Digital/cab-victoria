'use client'
import { useState } from 'react'
import Image from 'next/image'

/* ── STOP DATA ── */
const allStops: Record<string,{day:string;night:string}> = {
  'Dallas Waterfront':       {day:'/tours/dallas-road-day.jpeg',       night:'/tours/dallas-road-night.jpg'},
  'Mile 0':                  {day:'/tours/mile0-day.jpeg',             night:'/tours/mile0-night.jpeg'},
  'Terry Fox Statue':        {day:'/tours/terry-fox-day.jpg',         night:'/tours/terry-fox-day.jpg'},
  'Beacon Hill Park':        {day:'/tours/beacon-hill-day.webp',      night:'/tours/beacon-hill-night.jpg'},
  "Totem Pole — World's Tallest": {day:'/tours/totem-pole-day.jpg',   night:'/tours/totem-pole-day.jpg'},
  'Cathedral Church':        {day:'/tours/cathedral-day.jpeg',         night:'/tours/cathedral-night.jpeg'},
  'China Town':              {day:'/tours/chinatown-day.webp',        night:'/tours/chinatown-night.jpeg'},
  'Johnson Bridge':          {day:'/tours/johnson-bridge-day.webp',   night:'/tours/johnson-bridge-night.webp'},
  'Empress Hotel':           {day:'/tours/empress-day.jpg',           night:'/tours/empress-night.jpg'},
  'Parliament Building':     {day:'/tours/parliament-day.jpg',        night:'/tours/parliament-night.jpg'},
  'Confederation Garden':    {day:'/tours/confederation-garden-day.jpg', night:'/tours/confederation-garden-day.jpg'},
  "Fisherman's Wharf":       {day:'/tours/fisherman-wharf-day.jpeg',   night:'/tours/fisherman-wharf-night.jpeg'},
  'Craigdarroch Castle':     {day:'/tours/castle-day.jpeg',            night:'/tours/castle-night.jpeg'},
  'Government House':        {day:'/tours/government-house-day.jpg',  night:'/tours/government-house-day.jpg'},
  'Inner Harbour':           {day:'/tours/inner-harbour-day.webp',    night:'/tours/inner-harbour-night.jpeg'},
  'Bastion Square':          {day:'/tours/bastion-square-day.jpg',    night:'/tours/bastion-square-night.jpg'},
  'Mt. Tolmie':              {day:'/tours/mt-tolmie-day.jpeg',         night:'/tours/mt-tolmie-night.jpeg'},
  'Gorge Waterway':          {day:'/tours/gorge-waterway-day.jpeg',    night:'/tours/gorge-waterway-day.jpeg'},
  'Japanese Garden':         {day:'/tours/japanese-garden-day.jpg',   night:'/tours/japanese-garden-day.jpg'},
  'Butchart Gardens':        {day:'/tours/butchart-day.jpg',          night:'/tours/butchart-night.webp'},
}

/* ── TOUR PACKAGES ── */
const tour1 = ['Dallas Waterfront','Mile 0','Terry Fox Statue','Beacon Hill Park',"Totem Pole — World's Tallest",'Good Acre Lake','South Park School','Cathedral Church','City Hall','China Town','Johnson Bridge','Empress Hotel','Parliament Building','Confederation Garden',"Fisherman's Wharf"]

const tour2Extra = ['Craigdarroch Castle','Government House','Inner Harbour','Bastion Square']
const tour3Extra = ['Mt. Tolmie','Government Street — Shopping','Gorge Waterway','Japanese Garden']

const tour4 = ['Butchart Gardens','Dallas Waterfront','Mile 0','Terry Fox Statue','Good Acre Lake','South Park School','City Hall','China Town','Johnson Bridge','Empress Hotel','Parliament Building',"Fisherman's Wharf"]

const allNames = [...new Set([...tour1,...tour2Extra,...tour3Extra,'Butchart Gardens'])]

type Pkg = { id:string; label:string; hours:string; tag:string; stops:string[]; desc:string }

const packages: Pkg[] = [
  {id:'1hr',label:'1',hours:'1 hour',tag:'1 hour Express Tour',stops:tour1,
   desc:'A fast-paced highlights loop covering 15 iconic Victoria landmarks.'},
  {id:'2hr',label:'2',hours:'2 hours',tag:'Victoria City Highlights 2 hours',stops:[...tour1,...tour2Extra],
   desc:'Everything in the Express Tour plus Craigdarroch Castle, Government House, Inner Harbour & Bastion Square.'},
  {id:'3hr',label:'3',hours:'3 hours',tag:'Grand City Tour 3 hours',stops:[...tour1,...tour2Extra,...tour3Extra],
   desc:'The most complete city experience — all 2-hour stops plus Mt. Tolmie, Gorge Waterway, Japanese Garden & shopping on Government Street.'},
  {id:'4hr',label:'4',hours:'4 hours',tag:'Victoria Garden Tour 4 hours',stops:tour4,
   desc:'Includes Butchart Gardens plus a curated selection of city highlights.'},
  {id:'full',label:'FULL DAY',hours:'Full day',tag:'Full Day Tour',stops:allNames,
   desc:'Everything — every stop, every garden, every viewpoint. The ultimate Victoria experience.'},
]

export default function ToursPage() {
  const [mode, setMode] = useState<'day'|'night'>('day')
  const [pkg, setPkg] = useState<Pkg>(packages[0])

  return (
    <>
    <style>{`
      .pkg-boxes  { display:flex; gap:8px; flex-wrap:wrap; justify-content:center; }
      .pkg-box    { flex:1 1 100px; min-width:80px; max-width:160px; padding:14px 10px; background:#111; border:2px solid #222; border-radius:6px; cursor:pointer; text-align:center; transition:all 0.25s; }
      .pkg-box:hover { border-color:rgba(245,166,35,0.4); }
      .pkg-box.active { border-color:var(--gold); background:rgba(245,166,35,0.08); }
      .pkg-box .num { font-size:clamp(1.6rem,4vw,2.4rem); font-weight:800; color:#555; line-height:1; transition:color 0.2s; }
      .pkg-box.active .num { color:var(--gold); }
      .pkg-box .sub { font-size:9px; font-weight:700; letter-spacing:0.08em; text-transform:uppercase; color:#444; margin-top:4px; }
      .pkg-box.active .sub { color:var(--gold); }
      .stops-grid { display:grid; grid-template-columns:repeat(auto-fill,minmax(200px,1fr)); gap:4px; }
      @media(max-width:600px){
        .stops-grid { grid-template-columns:repeat(2,1fr); }
        .pkg-box { min-width:60px; padding:10px 6px; }
      }
      @media(max-width:380px){
        .stops-grid { grid-template-columns:1fr 1fr; gap:3px; }
      }
    `}</style>

    {/* ── HERO ── */}
    <section style={{height:'clamp(220px,36vw,400px)',position:'relative',display:'flex',alignItems:'flex-end',paddingBottom:36,overflow:'hidden'}}>
      <div style={{position:'absolute',inset:0}}>
        <Image src={mode==='day' ? '/tours/inner-harbour-day.webp' : '/tours/inner-harbour-night.jpg'} alt="Victoria" fill style={{objectFit:'cover',transition:'opacity 0.6s'}} unoptimized priority />
        <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(0,0,0,0.92) 0%,rgba(0,0,0,0.22) 60%,rgba(0,0,0,0.5) 100%)'}} />
      </div>
      <div className="wrap page-hero" style={{position:'relative',zIndex:1,width:'100%'}}>
        <div className="gold-bar" />
        <p style={{fontSize:10,fontWeight:700,letterSpacing:'0.14em',textTransform:'uppercase',color:'var(--gold)',marginBottom:6}}>Explore Victoria your way</p>
        <h1 className="font-display" style={{fontSize:'clamp(2.2rem,7vw,5.5rem)',lineHeight:0.9}}>VICTORIA<br /><span style={{color:'var(--gold)'}}>CITY TOURS</span></h1>
        <p style={{color:'rgba(255,255,255,0.4)',fontSize:'clamp(12px,1.8vw,14px)',maxWidth:480,lineHeight:1.7,marginTop:8}}>Choose your tour duration below. Toggle day or night to preview how Victoria transforms after dark.</p>
      </div>
    </section>

    {/* ── STICKY CONTROLS ── */}
    <div style={{background:'rgba(8,8,8,0.97)',backdropFilter:'blur(12px)',borderBottom:'1px solid #1a1a1a',padding:'14px 0',position:'sticky',top:60,zIndex:50}}>
      <div className="wrap" style={{display:'flex',flexDirection:'column',gap:14,alignItems:'center'}}>

        {/* Day / Night toggle */}
        <div style={{display:'flex',gap:3,background:'#111',border:'1px solid #222',borderRadius:4,padding:3}}>
          {(['day','night'] as const).map(m=>(
            <button key={m} onClick={()=>setMode(m)} style={{padding:'7px 22px',borderRadius:2,fontSize:11,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',border:'none',cursor:'pointer',transition:'all 0.2s',background:mode===m ? 'var(--gold)' : 'transparent',color:mode===m ? '#000' : '#555'}}>
              {m==='day' ? '☀ Day' : '☾ Night'}
            </button>
          ))}
        </div>

        {/* How many hours - package selector */}
        <div style={{textAlign:'center',width:'100%'}}>
          <p style={{fontSize:10,fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',color:'#555',marginBottom:10}}>How many hours would you like to spend?</p>
          <div className="pkg-boxes">
            {packages.map(p=>(
              <div key={p.id} className={`pkg-box${pkg.id===p.id?' active':''}`} onClick={()=>setPkg(p)}>
                <div className="num">{p.label}</div>
                <div className="sub">{p.id==='full' ? 'Tour' : p.label==='1' ? 'hour' : 'hours'}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    {/* ── SELECTED PACKAGE INFO ── */}
    <section style={{background:'#0a0a0a',padding:'24px 0 12px'}}>
      <div className="wrap" style={{textAlign:'center'}}>
        <h2 className="font-display" style={{fontSize:'clamp(1.4rem,4vw,2.6rem)',lineHeight:1,marginBottom:6,color:'#e8e8e8'}}>
          {pkg.tag}
        </h2>
        <p style={{fontSize:'clamp(12px,1.5vw,14px)',color:'rgba(255,255,255,0.35)',maxWidth:580,margin:'0 auto 6px',lineHeight:1.7}}>{pkg.desc}</p>
        <p style={{fontSize:'clamp(11px,1.3vw,12px)',color:'rgba(255,255,255,0.22)'}}>{pkg.stops.length} stops included</p>
      </div>
    </section>

    {/* ── STOPS GRID ── */}
    <section style={{background:'#0a0a0a',padding:'12px 0 clamp(40px,6vw,60px)'}}>
      <div className="wrap">
        <div className="stops-grid">
          {pkg.stops.map(name => {
            const imgs = allStops[name]
            if (!imgs) return null
            const src = mode === 'day' ? imgs.day : imgs.night
            return (
              <div key={name} style={{position:'relative',overflow:'hidden',height:'clamp(140px,18vw,200px)',background:'#111'}}>
                <Image src={src} alt={name} fill style={{objectFit:'cover',transition:'transform 0.4s'}} unoptimized
                  onMouseEnter={e=>e.currentTarget.style.transform='scale(1.06)'}
                  onMouseLeave={e=>e.currentTarget.style.transform='scale(1)'}
                />
                <div style={{position:'absolute',inset:0,background:'linear-gradient(0deg,rgba(0,0,0,0.85) 0%,rgba(0,0,0,0.05) 55%)'}} />
                <div style={{position:'absolute',top:6,right:6}}>
                  <span style={{fontSize:8,fontWeight:700,letterSpacing:'0.06em',textTransform:'uppercase',background:mode==='day'?'rgba(255,255,255,0.15)':'rgba(245,166,35,0.25)',color:mode==='day'?'#fff':'var(--gold)',padding:'2px 7px',borderRadius:2,backdropFilter:'blur(4px)'}}>{mode==='day'?'☀':'☾'}</span>
                </div>
                <div style={{position:'absolute',bottom:0,left:0,right:0,padding:'10px 12px'}}>
                  <div style={{fontSize:'clamp(11px,1.4vw,13px)',fontWeight:700,color:'#fff',lineHeight:1.3}}>{name}</div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Custom note + Book button */}
        <div style={{marginTop:20,padding:'18px 20px',background:'rgba(245,166,35,0.04)',border:'1px solid rgba(245,166,35,0.15)',borderRadius:4,textAlign:'center'}}>
          <p style={{fontSize:'clamp(11px,1.5vw,13px)',color:'rgba(255,255,255,0.4)',lineHeight:1.7,marginBottom:14}}>
            <strong style={{color:'var(--gold)'}}>ALL TOURS are customizable</strong> as per your needs. Jay will tailor the route to what matters most to you.
          </p>
          <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
            <a href={`https://wa.me/12509868284?text=Hi Jay, I'd like to book the ${pkg.tag}. Please share pricing.`} className="btn-primary" style={{fontSize:13,padding:'12px 28px'}}>
              Book for {pkg.hours}
            </a>
            <a href={`sms:+12509868284?body=Hi Jay, I'd like to book the ${pkg.tag}.`} className="btn-secondary" style={{fontSize:12,padding:'10px 20px'}}>
              💬 Text
            </a>
            <a href={`mailto:1cab.victoria@gmail.com?subject=${pkg.tag} Enquiry&body=Hi Jay, I'd like to book the ${pkg.tag}. Please share pricing.`} className="btn-secondary" style={{fontSize:12,padding:'10px 20px'}}>
              ✉ Email
            </a>
          </div>
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section style={{background:'#080808',padding:'clamp(40px,6vw,60px) 24px',borderTop:'1px solid #1a1a1a',textAlign:'center'}}>
      <h2 className="font-display" style={{fontSize:'clamp(1.8rem,5vw,3.5rem)',marginBottom:10}}>READY TO EXPLORE?</h2>
      <p style={{color:'rgba(255,255,255,0.3)',marginBottom:24,fontSize:'clamp(12px,1.8vw,13px)',maxWidth:440,margin:'0 auto 24px'}}>1 to 20 passengers. Contact Jay for pricing and custom itineraries.</p>
      <div style={{display:'flex',gap:10,justifyContent:'center',flexWrap:'wrap'}}>
        <a href="https://wa.me/12509868284?text=Hi Jay, I'd like to book a Victoria city tour!" className="btn-primary">Book via WhatsApp</a>
        <a href="sms:+12509868284" className="btn-secondary">💬 Text</a>
        <a href="mailto:1cab.victoria@gmail.com" className="btn-secondary">✉ Email</a>
        <a href="tel:+12509868284" className="btn-secondary">📞 Call</a>
      </div>
    </section>
    </>
  )
}