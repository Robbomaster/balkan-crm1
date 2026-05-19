import { useState } from "react";

// ─── DATE ─────────────────────────────────────────────────────────────────────
const agents = [
  { id:'A1', name:'Mihai Ionescu',  role:'Manager Vânzări' },
  { id:'A2', name:'Andreea Popa',   role:'Agent' },
  { id:'A3', name:'Radu Stoica',    role:'Agent' },
  { id:'A4', name:'Elena Dima',     role:'Operator Stoc' },
];
const partnerB2BTypes = ['Farmacie','Sală de sport','Clinică beauty'];
const partnerB2PTypes = ['Influencer','Antrenor','Nutriționist','Blogger'];

const initialProducts = [
  { id:'BLK-001', sku:'OMG3-90',    name:'Omega 3 Premium',      variant:'90 capsule',   category:'Acizi grași',  priceVanzare:89,  priceAchizitie:32, stocTotal:8,   pragMinim:20, batches:[{ id:'B001-1', cantitate:8,   termenValabilitate:'2026-08-20', lot:'LOT-2025-01' }] },
  { id:'BLK-002', sku:'WHY-ISO-2K', name:'Whey Protein Isolate', variant:'Ciocolată 2kg',category:'Proteine',      priceVanzare:245, priceAchizitie:98, stocTotal:170, pragMinim:30, batches:[{ id:'B002-1', cantitate:20,  termenValabilitate:'2026-08-20', lot:'LOT-2025-01B' },{ id:'B002-2', cantitate:150, termenValabilitate:'2027-04-14', lot:'LOT-2025-03A' }] },
  { id:'BLK-003', sku:'WHY-ISO-2KV',name:'Whey Protein Isolate', variant:'Vanilie 2kg',  category:'Proteine',      priceVanzare:245, priceAchizitie:98, stocTotal:85,  pragMinim:30, batches:[{ id:'B003-1', cantitate:85,  termenValabilitate:'2027-02-10', lot:'LOT-2025-02A' }] },
  { id:'BLK-007', sku:'CRT-500',    name:'Creatină Monohidrat',  variant:'500g',         category:'Performanță',  priceVanzare:119, priceAchizitie:41, stocTotal:3,   pragMinim:15, batches:[{ id:'B007-1', cantitate:3,   termenValabilitate:'2026-06-15', lot:'LOT-2024-12A' }] },
  { id:'BLK-015', sku:'COL-MAR-300',name:'Colagen Marin',        variant:'300g',         category:'Beauty',        priceVanzare:169, priceAchizitie:58, stocTotal:14,  pragMinim:20, batches:[{ id:'B015-1', cantitate:14,  termenValabilitate:'2026-07-30', lot:'LOT-2025-01C' }] },
  { id:'BLK-022', sku:'ZNC-C60',    name:'Zinc + Vitamina C',    variant:'60 capsule',   category:'Imunitate',    priceVanzare:59,  priceAchizitie:18, stocTotal:150, pragMinim:40, batches:[{ id:'B022-1', cantitate:150, termenValabilitate:'2027-09-01', lot:'LOT-2025-04A' }] },
  { id:'BLK-031', sku:'MGN-B6-120', name:'Magneziu + B6',        variant:'120 capsule',  category:'Recuperare',   priceVanzare:79,  priceAchizitie:27, stocTotal:62,  pragMinim:25, batches:[{ id:'B031-1', cantitate:62,  termenValabilitate:'2027-11-15', lot:'LOT-2025-04B' }] },
  { id:'BLK-044', sku:'VIT-D3K2',   name:'Vitamina D3 + K2',     variant:'60 capsule',   category:'Imunitate',    priceVanzare:69,  priceAchizitie:22, stocTotal:98,  pragMinim:30, batches:[{ id:'B044-1', cantitate:98,  termenValabilitate:'2028-01-20', lot:'LOT-2025-05A' }] },
];

const initialCustomers = [
  { id:'C001', name:'Andrei Marian',  email:'andrei.m@gmail.com',  phone:'0722 111 222', canal:'Balkan.ro', sursa:'Direct',       agentId:'A2', dataInreg:'2024-08-12', tags:['VIP'], ltv:1840 },
  { id:'C002', name:'Ioana Popescu',  email:'ioana.p@yahoo.ro',    phone:'0741 333 444', canal:'eMAG',      sursa:'eMAG',         agentId:'A3', dataInreg:'2024-10-05', tags:[], ltv:645 },
  { id:'C003', name:'Mihai Costea',   email:'m.costea@gmail.com',  phone:'0756 555 666', canal:'Balkan.ro', sursa:'Cod MARIA15',  agentId:'A2', dataInreg:'2024-11-20', tags:[], ltv:420 },
  { id:'C004', name:'Livia Nicu',     email:'livia.n@outlook.com', phone:'0731 777 888', canal:'Balkan.ro', sursa:'Direct',       agentId:'A3', dataInreg:'2025-01-15', tags:['Nou'], ltv:189 },
  { id:'C005', name:'Dan Florescu',   email:'dan.f@gmail.com',     phone:'0722 999 000', canal:'Trendyol',  sursa:'Trendyol',     agentId:'A3', dataInreg:'2024-09-08', tags:[], ltv:890 },
  { id:'C006', name:'Maria Gheorghe', email:'maria.g@yahoo.ro',    phone:'0745 123 456', canal:'Balkan.ro', sursa:'Cod POPFIT20', agentId:'A2', dataInreg:'2025-02-14', tags:['Nou'], ltv:245 },
  { id:'C007', name:'Cristina Lupu',  email:'cris.lupu@gmail.com', phone:'0733 234 567', canal:'eMAG',      sursa:'eMAG',         agentId:'A3', dataInreg:'2024-07-22', tags:['VIP'], ltv:2340 },
  { id:'C008', name:'Bogdan Neagu',   email:'bogdan.n@gmail.com',  phone:'0721 345 678', canal:'Balkan.ro', sursa:'Direct',       agentId:'A2', dataInreg:'2025-03-01', tags:['Nou'], ltv:119 },
];

const initialB2B = [
  { id:'P2B-01', name:'Farmacia Dona Cluj',  tip:'Farmacie',       oras:'Cluj-Napoca', cui:'RO12345678', contact:'Georgiana Pop', email:'dona@farmacie.ro',   phone:'0264 111 222', agentId:'A2', termeneP:30, soldFacturi:4200, comenzi:12, valoareTotala:18400 },
  { id:'P2B-02', name:'Sala Power Gym',      tip:'Sală de sport',  oras:'Iași',        cui:'RO23456789', contact:'Ionuț Petre',   email:'power@gym.ro',       phone:'0232 222 333', agentId:'A3', termeneP:45, soldFacturi:0,    comenzi:8,  valoareTotala:9800 },
  { id:'P2B-03', name:'Clinica BeautyMed',   tip:'Clinică beauty', oras:'București',   cui:'RO34567890', contact:'Alina Marin',   email:'info@beautymed.ro',  phone:'021 333 444',  agentId:'A2', termeneP:30, soldFacturi:1690, comenzi:5,  valoareTotala:6200 },
  { id:'P2B-04', name:'Sensiblu Timișoara',  tip:'Farmacie',       oras:'Timișoara',   cui:'RO45678901', contact:'Marius Stan',   email:'sensiblu@pharma.ro', phone:'0256 444 555', agentId:'A3', termeneP:30, soldFacturi:2100, comenzi:4,  valoareTotala:5100 },
  { id:'P2B-05', name:'FitZone Brașov',      tip:'Sală de sport',  oras:'Brașov',      cui:'RO56789012', contact:'Vlad Coman',    email:'fitzone@sport.ro',   phone:'0268 555 666', agentId:'A2', termeneP:45, soldFacturi:800,  comenzi:3,  valoareTotala:3400 },
];

const initialB2P = [
  { id:'PBP-01', username:'@fitbymaria',      platforma:'Instagram', tip:'Influencer',   cod:'MARIA15',  reducere:15, comision:8,  agentId:'A2', activ:'Activ',         tokenuri:24, vanzariGenerate:3240 },
  { id:'PBP-02', username:'@antrenorulpop',   platforma:'TikTok',    tip:'Antrenor',     cod:'POPFIT20', reducere:20, comision:10, agentId:'A3', activ:'Activ',         tokenuri:18, vanzariGenerate:1680 },
  { id:'PBP-03', username:'@healthwithalina', platforma:'YouTube',   tip:'Nutriționist', cod:'ALINA10',  reducere:10, comision:6,  agentId:'A2', activ:'Parțial activ', tokenuri:6,  vanzariGenerate:890 },
  { id:'PBP-04', username:'@gainsbyradu',     platforma:'Instagram', tip:'Antrenor',     cod:'RADU12',   reducere:12, comision:7,  agentId:'A3', activ:'Inactiv',       tokenuri:3,  vanzariGenerate:340 },
];

const initialOrders = [
  { id:'ORD-2401', clientId:'C001', canal:'Balkan.ro', sursa:'Direct',       valoare:340,  costLivrare:15, status:'Livrat',     data:'2026-05-19', agentId:'A2', curier:'Cargus',     awb:'CGS001234', codAfiliere:null,       items:[{productId:'BLK-001',cantitate:2,pret:89},{productId:'BLK-022',cantitate:1,pret:59}] },
  { id:'ORD-2400', clientId:null,   canal:'B2B',       sursa:'P2B-01',       valoare:2100, costLivrare:0,  status:'Procesare',  data:'2026-05-19', agentId:'A2', curier:null,         awb:null,         codAfiliere:null,       items:[{productId:'BLK-002',cantitate:5,pret:245},{productId:'BLK-007',cantitate:2,pret:119}] },
  { id:'ORD-2399', clientId:'C003', canal:'Balkan.ro', sursa:'Cod MARIA15',  valoare:680,  costLivrare:15, status:'Livrat',     data:'2026-05-18', agentId:'A2', curier:'FanCourier', awb:'FAN005678', codAfiliere:'MARIA15',  items:[{productId:'BLK-002',cantitate:2,pret:245},{productId:'BLK-022',cantitate:2,pret:59}] },
  { id:'ORD-2398', clientId:'C002', canal:'eMAG',      sursa:'eMAG',         valoare:215,  costLivrare:0,  status:'Livrat',     data:'2026-05-18', agentId:'A3', curier:'Cargus',     awb:'CGS001100', codAfiliere:null,       items:[{productId:'BLK-022',cantitate:1,pret:59},{productId:'BLK-044',cantitate:1,pret:69}] },
  { id:'ORD-2397', clientId:null,   canal:'B2B',       sursa:'P2B-02',       valoare:1450, costLivrare:0,  status:'Nou',        data:'2026-05-17', agentId:'A3', curier:null,         awb:null,         codAfiliere:null,       items:[{productId:'BLK-007',cantitate:1,pret:119},{productId:'BLK-031',cantitate:10,pret:79}] },
  { id:'ORD-2396', clientId:'C007', canal:'Balkan.ro', sursa:'Direct',       valoare:189,  costLivrare:15, status:'Retur',      data:'2026-05-17', agentId:'A2', curier:'Cargus',     awb:'CGS000998', codAfiliere:null,       items:[{productId:'BLK-015',cantitate:1,pret:169}] },
  { id:'ORD-2395', clientId:'C005', canal:'Trendyol',  sursa:'Trendyol',     valoare:490,  costLivrare:0,  status:'Expediat',   data:'2026-05-16', agentId:'A3', curier:'FanCourier', awb:'FAN004321', codAfiliere:null,       items:[{productId:'BLK-002',cantitate:2,pret:245}] },
  { id:'ORD-2394', clientId:'C006', canal:'Balkan.ro', sursa:'Cod POPFIT20', valoare:245,  costLivrare:15, status:'Livrat',     data:'2026-05-15', agentId:'A2', curier:'Cargus',     awb:'CGS000850', codAfiliere:'POPFIT20', items:[{productId:'BLK-003',cantitate:1,pret:245}] },
  { id:'ORD-2393', clientId:'C001', canal:'Balkan.ro', sursa:'Direct',       valoare:410,  costLivrare:15, status:'Livrat',     data:'2026-05-10', agentId:'A2', curier:'Cargus',     awb:'CGS000700', codAfiliere:null,       items:[{productId:'BLK-031',cantitate:2,pret:79},{productId:'BLK-044',cantitate:2,pret:69}] },
  { id:'ORD-2392', clientId:'C004', canal:'Balkan.ro', sursa:'Direct',       valoare:169,  costLivrare:15, status:'In livrare', data:'2026-05-19', agentId:'A3', curier:'FanCourier', awb:'FAN005999', codAfiliere:null,       items:[{productId:'BLK-015',cantitate:1,pret:169}] },
];

const initialInvoices = [
  { id:'INV-001', partnerId:'P2B-01', valoare:2100, dataEmitere:'2026-04-10', dataScadenta:'2026-05-10', status:'Restantă' },
  { id:'INV-002', partnerId:'P2B-01', valoare:2100, dataEmitere:'2026-05-01', dataScadenta:'2026-05-31', status:'Neplatită' },
  { id:'INV-003', partnerId:'P2B-03', valoare:1690, dataEmitere:'2026-05-05', dataScadenta:'2026-06-04', status:'Neplatită' },
  { id:'INV-004', partnerId:'P2B-04', valoare:2100, dataEmitere:'2026-05-10', dataScadenta:'2026-06-09', status:'Neplatită' },
  { id:'INV-005', partnerId:'P2B-02', valoare:1450, dataEmitere:'2026-04-15', dataScadenta:'2026-05-30', status:'Plătită' },
  { id:'INV-006', partnerId:'P2B-05', valoare:800,  dataEmitere:'2026-05-12', dataScadenta:'2026-06-11', status:'Neplatită' },
];

const monthlySales = [
  { luna:'Ian', balkan:12400, emag:5800, trendyol:3200, b2b:8900 },
  { luna:'Feb', balkan:15200, emag:7100, trendyol:4100, b2b:11200 },
  { luna:'Mar', balkan:18900, emag:8400, trendyol:5300, b2b:13800 },
  { luna:'Apr', balkan:16700, emag:7800, trendyol:4800, b2b:12400 },
  { luna:'Mai', balkan:18400, emag:9800, trendyol:6200, b2b:14200 },
];

// ─── HELPERS ──────────────────────────────────────────────────────────────────
const lei = (n) => new Intl.NumberFormat('ro-RO',{style:'currency',currency:'RON',maximumFractionDigits:0}).format(n);
const fmtDate = (d) => d ? new Date(d).toLocaleDateString('ro-RO',{day:'2-digit',month:'short',year:'numeric'}) : '—';
const daysUntil = (d) => Math.ceil((new Date(d) - new Date()) / 86400000);
const getProd = (id) => initialProducts.find(p => p.id === id);
const getAgent = (id) => agents.find(a => a.id === id);
const getB2BPart = (id, list) => list.find(p => p.id === id);
const getCust = (id, list) => list.find(c => c.id === id);

const daysStockLeft = (product) => {
  const qty = initialOrders.filter(o=>o.status==='Livrat').flatMap(o=>o.items).filter(i=>i.productId===product.id).reduce((s,i)=>s+i.cantitate,0);
  const daily = qty / 90;
  return daily ? Math.round(product.stocTotal / daily) : null;
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const C = {
  bg:          '#F6F6F4',
  surface:     '#FFFFFF',
  border:      '#E4E4E0',
  text:        '#1A1A1A',
  textSub:     '#5A5A5A',
  textMuted:   '#9A9A9A',
  accent:      '#0F6E56',
  accentBg:    '#EBF5F1',
  danger:      '#B83232',
  dangerBg:    '#FBF0F0',
  warn:        '#9A5A00',
  warnBg:      '#FDF6E8',
};

const statusC = {
  'Nou':        {bg:'#EEF0FF',text:'#3730A3'},'Confirmat':{bg:'#FFF8E6',text:'#92400E'},
  'Procesare':  {bg:'#FFF8E6',text:'#92400E'},'AWB generat':{bg:'#EEF4FF',text:'#1E40AF'},
  'Expediat':   {bg:'#EEF4FF',text:'#1E40AF'},'In livrare':{bg:'#EBF5F1',text:'#0A5040'},
  'Livrat':     {bg:'#EBF5F1',text:'#0A5040'},'Retur':{bg:C.dangerBg,text:C.danger},
  'Refuzat':    {bg:C.dangerBg,text:C.danger},'Anulat':{bg:'#F2F2F0',text:'#606060'},
};
const canalC = {
  'Balkan.ro':{bg:'#EEF4FF',text:'#1E40AF'},'eMAG':{bg:'#FFF8E6',text:'#92400E'},
  'Trendyol':{bg:'#F7F0FF',text:'#6B21A8'},'B2B':{bg:'#FFF4EE',text:'#9A3412'},
};
const activC = {
  'Activ':{bg:C.accentBg,text:C.accent},'Parțial activ':{bg:C.warnBg,text:C.warn},'Inactiv':{bg:'#F2F2F0',text:'#606060'},
};

// ─── ATOMS ────────────────────────────────────────────────────────────────────
const Tag = ({label,bg,text}) => (
  <span style={{background:bg,color:text,padding:'2px 7px',borderRadius:3,fontSize:11,fontWeight:500,whiteSpace:'nowrap'}}>{label}</span>
);
const STag = ({status}) => { const s=statusC[status]||{bg:'#F2F2F0',text:'#606060'}; return <Tag label={status} bg={s.bg} text={s.text}/>; };
const CTag = ({canal}) => { const s=canalC[canal]||{bg:'#F2F2F0',text:'#606060'}; return <Tag label={canal} bg={s.bg} text={s.text}/>; };

const avSeeds = ['#DBEAFE:#1E40AF','#D1FAE5:#065F46','#FCE7F3:#9D174D','#FEF3C7:#92400E','#EDE9FE:#5B21B6','#FFEDD5:#9A3412'];
const Av = ({name,size=30}) => {
  const [bg,text] = (avSeeds[name?name.charCodeAt(0)%avSeeds.length:0]).split(':');
  const ini = name ? name.split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase() : '?';
  return <div style={{width:size,height:size,borderRadius:'50%',background:bg,color:text,display:'flex',alignItems:'center',justifyContent:'center',fontSize:size*0.34,fontWeight:500,flexShrink:0}}>{ini}</div>;
};

const Btn = ({children,onClick,variant='ghost',disabled,style:sx}) => {
  const base = {padding:'6px 13px',borderRadius:5,fontSize:13,fontWeight:500,cursor:disabled?'not-allowed':'pointer',fontFamily:'inherit',display:'inline-flex',alignItems:'center',gap:6,opacity:disabled?0.4:1,border:'none'};
  const v = {
    ghost:   {...base,background:C.surface,border:`1px solid ${C.border}`,color:C.text},
    primary: {...base,background:C.accent,color:'white'},
    subtle:  {...base,background:'transparent',color:C.textSub},
  };
  return <button onClick={onClick} disabled={disabled} style={{...v[variant],...(sx||{})}}>{children}</button>;
};

const Inp = (props) => <input {...props} style={{width:'100%',padding:'7px 10px',border:`1px solid ${C.border}`,borderRadius:5,fontSize:13,color:C.text,fontFamily:'inherit',outline:'none',background:'white',boxSizing:'border-box',...(props.style||{})}}/>;
const Sel = ({children,...props}) => <select {...props} style={{width:'100%',padding:'7px 10px',border:`1px solid ${C.border}`,borderRadius:5,fontSize:13,color:C.text,fontFamily:'inherit',outline:'none',background:'white',boxSizing:'border-box'}}>{children}</select>;

const Field = ({label,children}) => (
  <div style={{marginBottom:11}}>
    <div style={{fontSize:11,color:C.textMuted,marginBottom:3,textTransform:'uppercase',letterSpacing:'0.05em'}}>{label}</div>
    {children}
  </div>
);

const StatCard = ({label,value,sub,danger}) => (
  <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:7,padding:'13px 15px'}}>
    <div style={{fontSize:11,color:C.textMuted,marginBottom:5,textTransform:'uppercase',letterSpacing:'0.05em'}}>{label}</div>
    <div style={{fontSize:21,fontWeight:500,color:C.text,lineHeight:1.1}}>{value}</div>
    {sub&&<div style={{fontSize:11,color:danger?C.danger:C.textSub,marginTop:3}}>{sub}</div>}
  </div>
);

const Modal = ({title,onClose,children,width=500}) => (
  <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.2)',zIndex:1000,display:'flex',alignItems:'center',justifyContent:'center',padding:20}} onClick={e=>e.target===e.currentTarget&&onClose()}>
    <div style={{background:'white',borderRadius:9,width,maxWidth:'95vw',maxHeight:'90vh',overflow:'auto',border:`1px solid ${C.border}`,boxShadow:'0 4px 24px rgba(0,0,0,0.08)'}}>
      <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'14px 18px',borderBottom:`1px solid ${C.border}`}}>
        <span style={{fontSize:14,fontWeight:500,color:C.text}}>{title}</span>
        <button onClick={onClose} style={{background:'none',border:'none',cursor:'pointer',color:C.textMuted,fontSize:16,lineHeight:1,padding:2}}>✕</button>
      </div>
      <div style={{padding:'16px 18px'}}>{children}</div>
    </div>
  </div>
);

const MRow = ({label,value,mono}) => (
  <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:`1px solid ${C.bg||'#F6F6F4'}`}}>
    <span style={{fontSize:12,color:C.textMuted}}>{label}</span>
    <span style={{fontSize:13,color:C.text,fontFamily:mono?'monospace':undefined}}>{value||'—'}</span>
  </div>
);

const SBar = ({value,onChange,placeholder}) => (
  <div style={{display:'flex',alignItems:'center',gap:8,background:'white',border:`1px solid ${C.border}`,borderRadius:5,padding:'6px 11px',flex:1}}>
    <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke={C.textMuted} strokeWidth="1.5"><circle cx="7" cy="7" r="5"/><path d="M11.5 11.5L14 14"/></svg>
    <input value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{border:'none',background:'transparent',outline:'none',fontSize:13,color:C.text,flex:1,fontFamily:'inherit'}}/>
  </div>
);

const Pill = ({label,active,onClick}) => (
  <button onClick={onClick} style={{padding:'3px 11px',borderRadius:20,fontSize:12,cursor:'pointer',border:`1px solid ${active?C.accent:C.border}`,background:active?C.accentBg:'white',color:active?C.accent:C.textSub,fontFamily:'inherit',fontWeight:active?500:400,transition:'all 0.1s'}}>{label}</button>
);

const Tbl = ({headers,rows,emptyMsg='Nu există date'}) => (
  <div style={{overflowX:'auto'}}>
    <table style={{width:'100%',borderCollapse:'collapse',fontSize:13}}>
      <thead>
        <tr>{headers.map((h,i)=><th key={i} style={{textAlign:'left',padding:'7px 11px',fontSize:11,fontWeight:500,color:C.textMuted,textTransform:'uppercase',letterSpacing:'0.05em',borderBottom:`1px solid ${C.border}`,whiteSpace:'nowrap'}}>{h}</th>)}</tr>
      </thead>
      <tbody>
        {rows.length===0
          ?<tr><td colSpan={headers.length} style={{padding:28,textAlign:'center',color:C.textMuted,fontSize:13}}>{emptyMsg}</td></tr>
          :rows.map((row,i)=>(
            <tr key={i} style={{borderBottom:`1px solid #F4F4F2`,cursor:row.onClick?'pointer':'default'}}
              onMouseEnter={e=>e.currentTarget.style.background='#F9F9F7'}
              onMouseLeave={e=>e.currentTarget.style.background='transparent'}
              onClick={row.onClick}>
              {row.cells.map((cell,j)=><td key={j} style={{padding:'9px 11px',color:C.text,verticalAlign:'middle'}}>{cell}</td>)}
            </tr>
          ))
        }
      </tbody>
    </table>
  </div>
);

const Card = ({children,style:sx}) => <div style={{background:C.surface,border:`1px solid ${C.border}`,borderRadius:7,padding:16,...(sx||{})}}>{children}</div>;
const CLabel = ({children}) => <div style={{fontSize:11,color:C.textMuted,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:12}}>{children}</div>;
const Page = ({title,action,children}) => (
  <div>
    <div style={{display:'flex',alignItems:'center',justifyContent:'space-between',marginBottom:18}}>
      <h1 style={{fontSize:17,fontWeight:500,color:C.text,margin:0}}>{title}</h1>
      {action}
    </div>
    {children}
  </div>
);
const G = ({cols=4,gap=11,children,style:sx}) => <div style={{display:'grid',gridTemplateColumns:`repeat(${cols},1fr)`,gap,marginBottom:16,...(sx||{})}}>{children}</div>;
const HR = () => <div style={{height:1,background:C.border,margin:'10px 0'}}/>;

// ─── BAR CHART ────────────────────────────────────────────────────────────────
const BarChart = ({data}) => {
  const ch = [{key:'balkan',label:'Balkan.ro',color:'#2563EB'},{key:'emag',label:'eMAG',color:'#D97706'},{key:'trendyol',label:'Trendyol',color:'#7C3AED'},{key:'b2b',label:'B2B',color:'#059669'}];
  const max = Math.max(...data.flatMap(d=>ch.map(c=>d[c.key])));
  return (
    <div>
      <div style={{display:'flex',gap:12,marginBottom:10}}>
        {ch.map(c=><div key={c.key} style={{display:'flex',alignItems:'center',gap:4}}><div style={{width:7,height:7,borderRadius:1,background:c.color}}/><span style={{fontSize:11,color:C.textSub}}>{c.label}</span></div>)}
      </div>
      <div style={{display:'flex',gap:10,height:96,alignItems:'flex-end'}}>
        {data.map((d,i)=>(
          <div key={i} style={{flex:1,display:'flex',flexDirection:'column',alignItems:'center',gap:4}}>
            <div style={{display:'flex',gap:2,alignItems:'flex-end',height:76}}>
              {ch.map(c=><div key={c.key} style={{width:10,background:c.color,borderRadius:'2px 2px 0 0',height:`${(d[c.key]/max)*76}px`,opacity:0.7}} title={`${c.label}: ${lei(d[c.key])}`}/>)}
            </div>
            <div style={{fontSize:10,color:C.textMuted}}>{d.luna}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ══════════════════════════════════════════════════════════════════════════════
// PAGINI
// ══════════════════════════════════════════════════════════════════════════════

const Dashboard = ({orders,products,customers,b2p,invoices}) => {
  const vanzari = orders.filter(o=>o.status==='Livrat').reduce((s,o)=>s+o.valoare,0);
  const active  = orders.filter(o=>!['Livrat','Retur','Refuzat','Anulat'].includes(o.status)).length;
  const restant = invoices.filter(i=>i.status!=='Plătită').reduce((s,i)=>s+i.valoare,0);
  const stocCrit = products.filter(p=>p.stocTotal<=p.pragMinim);
  const termene  = products.flatMap(p=>p.batches.filter(b=>daysUntil(b.termenValabilitate)<=90&&daysUntil(b.termenValabilitate)>0).map(b=>({...b,prod:p})));
  const tokenuri = b2p.reduce((s,p)=>s+p.tokenuri,0);

  const topProd = [...products].map(p=>{
    const val=orders.filter(o=>o.status==='Livrat').flatMap(o=>o.items).filter(i=>i.productId===p.id).reduce((s,i)=>s+i.cantitate*i.pret,0);
    const qty=orders.filter(o=>o.status==='Livrat').flatMap(o=>o.items).filter(i=>i.productId===p.id).reduce((s,i)=>s+i.cantitate,0);
    return {...p,val,qty};
  }).filter(p=>p.val>0).sort((a,b)=>b.val-a.val).slice(0,5);

  const topAgenti = agents.filter(a=>a.role!=='Operator Stoc').map(a=>{
    const ao=orders.filter(o=>o.agentId===a.id&&o.status==='Livrat');
    return {...a,nr:ao.length,val:ao.reduce((s,o)=>s+o.valoare,0)};
  }).sort((a,b)=>b.val-a.val);

  const ltvCanal = ['Balkan.ro','eMAG','Trendyol'].map(canal=>{
    const cl=customers.filter(c=>c.canal===canal);
    return {canal,avg:cl.length?Math.round(cl.reduce((s,c)=>s+c.ltv,0)/cl.length):0,count:cl.length};
  });
  const maxLtv = Math.max(...ltvCanal.map(l=>l.avg));

  return (
    <Page title="Dashboard">
      <G cols={4}>
        <StatCard label="Vânzări luna aceasta" value={lei(vanzari)} sub="Comenzi livrate"/>
        <StatCard label="Comenzi active" value={active} sub="În procesare sau livrare"/>
        <StatCard label="Clienți" value={customers.length} sub={`${customers.filter(c=>c.tags.includes('Nou')).length} noi luna aceasta`}/>
        <StatCard label="Sold restant B2B" value={lei(restant)} sub={`${invoices.filter(i=>i.status==='Restantă').length} facturi restante`} danger/>
      </G>
      <G cols={2} gap={13} style={{marginBottom:13}}>
        <Card><CLabel>Vânzări pe canale — últimele 5 luni</CLabel><BarChart data={monthlySales}/></Card>
        <Card>
          <CLabel>LTV mediu per canal</CLabel>
          {ltvCanal.map(({canal,avg,count})=>(
            <div key={canal} style={{marginBottom:14}}>
              <div style={{display:'flex',justifyContent:'space-between',marginBottom:4}}>
                <span style={{fontSize:13,color:C.text}}>{canal}</span>
                <span style={{fontSize:13,fontWeight:500,color:C.accent}}>{lei(avg)}</span>
              </div>
              <div style={{height:3,background:C.bg,borderRadius:2,overflow:'hidden'}}>
                <div style={{height:'100%',width:maxLtv?`${(avg/maxLtv)*100}%`:'0%',background:C.accent,borderRadius:2}}/>
              </div>
              <div style={{fontSize:11,color:C.textMuted,marginTop:3}}>{count} clienți</div>
            </div>
          ))}
        </Card>
      </G>
      <G cols={3} gap={13} style={{marginBottom:0}}>
        <Card>
          <CLabel>Stoc critic & termene</CLabel>
          {stocCrit.length===0&&termene.length===0
            ?<span style={{fontSize:13,color:C.textSub}}>Fără alerte</span>
            :<>
              {stocCrit.map(p=>(
                <div key={p.id} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:`1px solid #F4F4F2`}}>
                  <span style={{fontSize:12,color:C.text}}>{p.name} <span style={{color:C.textMuted}}>{p.variant}</span></span>
                  <Tag label={`${p.stocTotal} buc`} bg={C.dangerBg} text={C.danger}/>
                </div>
              ))}
              {termene.slice(0,3).map(b=>(
                <div key={b.id} style={{display:'flex',justifyContent:'space-between',padding:'5px 0',borderBottom:`1px solid #F4F4F2`}}>
                  <span style={{fontSize:12,color:C.text}}>{b.prod.name}</span>
                  <Tag label={`${daysUntil(b.termenValabilitate)} zile`} bg={C.warnBg} text={C.warn}/>
                </div>
              ))}
            </>
          }
        </Card>
        <Card>
          <CLabel>Top produse — valoare</CLabel>
          {topProd.map((p,i)=>(
            <div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'5px 0',borderBottom:i<topProd.length-1?`1px solid #F4F4F2`:'none'}}>
              <div>
                <div style={{fontSize:13,color:C.text}}>{p.name}</div>
                <div style={{fontSize:11,color:C.textMuted}}>{p.qty} buc vândute</div>
              </div>
              <span style={{fontSize:13,fontWeight:500,color:C.accent}}>{lei(p.val)}</span>
            </div>
          ))}
        </Card>
        <Card>
          <CLabel>Performanță agenți</CLabel>
          {topAgenti.map((a,i)=>(
            <div key={a.id} style={{display:'flex',alignItems:'center',gap:9,padding:'5px 0',borderBottom:i<topAgenti.length-1?`1px solid #F4F4F2`:'none'}}>
              <Av name={a.name} size={26}/>
              <div style={{flex:1}}>
                <div style={{fontSize:13,color:C.text}}>{a.name}</div>
                <div style={{fontSize:11,color:C.textMuted}}>{a.nr} comenzi</div>
              </div>
              <span style={{fontSize:13,fontWeight:500,color:C.accent}}>{lei(a.val)}</span>
            </div>
          ))}
          <HR/>
          <div style={{display:'flex',justifyContent:'space-between'}}>
            <span style={{fontSize:12,color:C.textMuted}}>Tokenuri B2P neplatite</span>
            <span style={{fontSize:12,color:C.textSub}}>{tokenuri} tok · {lei(tokenuri*10)}</span>
          </div>
        </Card>
      </G>
    </Page>
  );
};

// ─── INVENTAR ─────────────────────────────────────────────────────────────────
const Inventar = ({products,setProducts}) => {
  const [search,setSearch]=useState('');
  const [cat,setCat]=useState('Toate');
  const [showAdd,setShowAdd]=useState(false);
  const [detail,setDetail]=useState(null);
  const [np,setNp]=useState({id:'',sku:'',name:'',variant:'',category:'Proteine',priceVanzare:'',priceAchizitie:'',stocTotal:'',pragMinim:''});

  const cats=['Toate',...new Set(products.map(p=>p.category))];
  const filtered=products.filter(p=>`${p.name} ${p.variant} ${p.id}`.toLowerCase().includes(search.toLowerCase())&&(cat==='Toate'||p.category===cat));

  const ss=(p)=>{
    if(p.stocTotal===0) return {label:'Epuizat',bg:C.dangerBg,text:C.danger};
    if(p.stocTotal<=p.pragMinim*0.5) return {label:'Critic',bg:C.dangerBg,text:C.danger};
    if(p.stocTotal<=p.pragMinim) return {label:'Redus',bg:C.warnBg,text:C.warn};
    return {label:'OK',bg:C.accentBg,text:C.accent};
  };

  const rows=filtered.map(p=>{
    const s=ss(p); const days=daysStockLeft(p);
    const urg=p.batches.filter(b=>daysUntil(b.termenValabilitate)<=90&&daysUntil(b.termenValabilitate)>0);
    return {onClick:()=>setDetail(p),cells:[
      <span style={{fontFamily:'monospace',fontSize:11,color:C.textMuted}}>{p.id}</span>,
      <div><div style={{fontWeight:500,color:C.text}}>{p.name}</div><div style={{fontSize:11,color:C.textMuted}}>{p.variant}</div></div>,
      <span style={{fontSize:12,color:C.textSub}}>{p.category}</span>,
      <span style={{fontWeight:500}}>{lei(p.priceVanzare)}</span>,
      <div style={{display:'flex',alignItems:'center',gap:8}}>
        <span style={{fontWeight:500,minWidth:36}}>{p.stocTotal} buc</span>
        <div style={{width:44,height:3,background:C.bg,borderRadius:2,overflow:'hidden'}}>
          <div style={{height:'100%',background:p.stocTotal<=p.pragMinim?C.danger:C.accent,width:`${Math.min(100,(p.stocTotal/(p.pragMinim*3))*100)}%`,borderRadius:2}}/>
        </div>
      </div>,
      days?<span style={{fontSize:12,color:days<14?C.danger:days<30?C.warn:C.textSub}}>{days}z</span>:<span style={{color:C.textMuted}}>—</span>,
      <Tag label={s.label} bg={s.bg} text={s.text}/>,
      urg.length>0?<Tag label={`${daysUntil(urg[0].termenValabilitate)} zile`} bg={C.warnBg} text={C.warn}/>:<span style={{color:C.textMuted}}>—</span>,
    ]};
  });

  return (
    <Page title="Produse & stoc" action={<Btn variant="primary" onClick={()=>setShowAdd(true)}>+ Produs nou</Btn>}>
      <G cols={4}>
        <StatCard label="Total produse" value={products.length}/>
        <StatCard label="Valoare stoc" value={lei(products.reduce((s,p)=>s+p.stocTotal*p.priceAchizitie,0))} sub="La preț achiziție"/>
        <StatCard label="Stoc critic" value={products.filter(p=>p.stocTotal<=p.pragMinim).length} sub="Sub pragul minim" danger/>
        <StatCard label="Termene sub 90 zile" value={products.flatMap(p=>p.batches).filter(b=>daysUntil(b.termenValabilitate)<=90&&daysUntil(b.termenValabilitate)>0).length} sub="Loturi în atenție"/>
      </G>
      <Card>
        <div style={{display:'flex',gap:9,marginBottom:11,flexWrap:'wrap'}}>
          <SBar value={search} onChange={setSearch} placeholder="Caută după nume, ID sau SKU..."/>
          <div style={{display:'flex',gap:5,flexWrap:'wrap'}}>{cats.map(c=><Pill key={c} label={c} active={cat===c} onClick={()=>setCat(c)}/>)}</div>
        </div>
        <Tbl headers={['ID','Produs','Categorie','Preț','Stoc','Suficiență','Status','Alertă termen']} rows={rows} emptyMsg="Niciun produs"/>
      </Card>

      {detail&&(
        <Modal title={`${detail.name} — ${detail.variant}`} onClose={()=>setDetail(null)} width={540}>
          <G cols={2} gap={9} style={{marginBottom:14}}>
            {[['ID / SKU',`${detail.id} / ${detail.sku}`,true],['Categorie',detail.category],['Preț vânzare',lei(detail.priceVanzare)],['Preț achiziție',lei(detail.priceAchizitie)]].map(([k,v,mono])=>(
              <div key={k} style={{padding:10,background:C.bg,borderRadius:5}}>
                <div style={{fontSize:11,color:C.textMuted,marginBottom:2}}>{k}</div>
                <div style={{fontWeight:500,fontFamily:mono?'monospace':undefined,fontSize:13}}>{v}</div>
              </div>
            ))}
          </G>
          <div style={{fontSize:11,color:C.textMuted,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:9}}>Portofoliu loturi (FEFO)</div>
          <table style={{width:'100%',fontSize:12,borderCollapse:'collapse',marginBottom:14}}>
            <thead><tr style={{background:C.bg}}>{['Lot','Cantitate','Termen','Zile rămase','Status'].map(h=><th key={h} style={{padding:'6px 9px',textAlign:'left',fontWeight:500,color:C.textMuted,fontSize:11,textTransform:'uppercase',letterSpacing:'0.04em'}}>{h}</th>)}</tr></thead>
            <tbody>{detail.batches.map(b=>{
              const d=daysUntil(b.termenValabilitate);
              return <tr key={b.id} style={{borderTop:`1px solid ${C.border}`}}>
                <td style={{padding:'6px 9px',fontFamily:'monospace',fontSize:11,color:C.textSub}}>{b.lot}</td>
                <td style={{padding:'6px 9px',fontWeight:500}}>{b.cantitate} buc</td>
                <td style={{padding:'6px 9px',color:C.textSub}}>{fmtDate(b.termenValabilitate)}</td>
                <td style={{padding:'6px 9px',color:d<30?C.danger:d<90?C.warn:C.textSub}}>{d} zile</td>
                <td style={{padding:'6px 9px'}}><Tag label={d<=0?'Expirat':d<=30?'Critic':d<=90?'Atenție':'OK'} bg={d<=30?C.dangerBg:d<=90?C.warnBg:C.accentBg} text={d<=30?C.danger:d<=90?C.warn:C.accent}/></td>
              </tr>;
            })}</tbody>
          </table>
          {daysStockLeft(detail)&&(
            <div style={{padding:11,background:C.bg,borderRadius:5,borderLeft:`2px solid ${C.accent}`}}>
              <div style={{fontSize:11,color:C.textMuted,marginBottom:2}}>Indicator suficiență stoc</div>
              <div style={{fontSize:13,color:C.text}}>La ritmul actual, stocul este suficient pentru aproximativ <strong style={{fontWeight:500}}>{daysStockLeft(detail)} zile</strong>.</div>
            </div>
          )}
        </Modal>
      )}

      {showAdd&&(
        <Modal title="Produs nou" onClose={()=>setShowAdd(false)}>
          <G cols={2} gap={9} style={{marginBottom:0}}>
            <Field label="ID produs"><Inp value={np.id} onChange={e=>setNp(p=>({...p,id:e.target.value}))} placeholder="BLK-050"/></Field>
            <Field label="SKU"><Inp value={np.sku} onChange={e=>setNp(p=>({...p,sku:e.target.value}))} placeholder="WHY-2K-S"/></Field>
            <Field label="Denumire"><Inp value={np.name} onChange={e=>setNp(p=>({...p,name:e.target.value}))} placeholder="Whey Protein..."/></Field>
            <Field label="Variantă"><Inp value={np.variant} onChange={e=>setNp(p=>({...p,variant:e.target.value}))} placeholder="Căpșuni 1kg"/></Field>
            <Field label="Categorie"><Sel value={np.category} onChange={e=>setNp(p=>({...p,category:e.target.value}))}>{['Proteine','Acizi grași','Performanță','Imunitate','Beauty','Recuperare'].map(c=><option key={c}>{c}</option>)}</Sel></Field>
            <Field label="Preț vânzare (lei)"><Inp type="number" value={np.priceVanzare} onChange={e=>setNp(p=>({...p,priceVanzare:e.target.value}))} placeholder="0"/></Field>
            <Field label="Preț achiziție (lei)"><Inp type="number" value={np.priceAchizitie} onChange={e=>setNp(p=>({...p,priceAchizitie:e.target.value}))} placeholder="0"/></Field>
            <Field label="Stoc inițial (buc)"><Inp type="number" value={np.stocTotal} onChange={e=>setNp(p=>({...p,stocTotal:e.target.value}))} placeholder="0"/></Field>
            <Field label="Prag minim alertă"><Inp type="number" value={np.pragMinim} onChange={e=>setNp(p=>({...p,pragMinim:e.target.value}))} placeholder="20"/></Field>
          </G>
          <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:13}}>
            <Btn onClick={()=>setShowAdd(false)}>Anulează</Btn>
            <Btn variant="primary" onClick={()=>{if(np.id&&np.name){setProducts(prev=>[...prev,{...np,priceVanzare:+np.priceVanzare,priceAchizitie:+np.priceAchizitie,stocTotal:+np.stocTotal,pragMinim:+np.pragMinim,batches:[]}]);setShowAdd(false);}}}>Salvează</Btn>
          </div>
        </Modal>
      )}
    </Page>
  );
};

// ─── COMENZI ──────────────────────────────────────────────────────────────────
const Comenzi = ({orders,setOrders,customers,b2b}) => {
  const [search,setSearch]=useState('');
  const [fC,setFC]=useState('Toate');
  const [fS,setFS]=useState('Toate');
  const [showAdd,setShowAdd]=useState(false);
  const [detail,setDetail]=useState(null);
  const [no,setNo]=useState({canal:'Balkan.ro',clientId:'',partnerId:'',valoare:'',costLivrare:15,curier:'Cargus',codAfiliere:'',agentId:'A2'});

  const canale=['Toate','Balkan.ro','eMAG','Trendyol','B2B'];
  const statusuri=['Toate','Nou','Procesare','Expediat','In livrare','Livrat','Retur','Anulat'];
  const filtered=orders.filter(o=>{
    const cl=getCust(o.clientId,customers); const pt=getB2BPart(o.sursa,b2b);
    return `${o.id} ${cl?.name||''} ${pt?.name||''} ${o.codAfiliere||''}`.toLowerCase().includes(search.toLowerCase())&&(fC==='Toate'||o.canal===fC)&&(fS==='Toate'||o.status===fS);
  });

  const rows=filtered.map(o=>{
    const cl=getCust(o.clientId,customers); const pt=getB2BPart(o.sursa,b2b); const ag=getAgent(o.agentId);
    const nm=cl?.name||pt?.name||o.sursa||'—';
    return {onClick:()=>setDetail(o),cells:[
      <span style={{fontFamily:'monospace',fontSize:11,color:C.textSub}}>{o.id}</span>,
      <div style={{display:'flex',alignItems:'center',gap:8}}><Av name={nm} size={24}/><span style={{color:C.text}}>{nm}</span></div>,
      <CTag canal={o.canal}/>,
      o.codAfiliere?<Tag label={o.codAfiliere} bg="#F5F3FF" text="#5B21B6"/>:<span style={{color:C.textMuted,fontSize:12}}>—</span>,
      <span style={{fontWeight:500}}>{lei(o.valoare)}</span>,
      <span style={{color:C.textSub,fontSize:12}}>{fmtDate(o.data)}</span>,
      ag?<div style={{display:'flex',alignItems:'center',gap:6}}><Av name={ag.name} size={20}/><span style={{fontSize:12,color:C.textSub}}>{ag.name.split(' ')[0]}</span></div>:'—',
      <STag status={o.status}/>,
      o.awb?<span style={{fontFamily:'monospace',fontSize:11,color:C.textMuted}}>{o.awb}</span>:<span style={{color:C.textMuted,fontSize:12}}>—</span>,
    ]};
  });

  return (
    <Page title="Comenzi" action={<Btn variant="primary" onClick={()=>setShowAdd(true)}>+ Comandă nouă</Btn>}>
      <G cols={4}>
        <StatCard label="Total filtrat" value={lei(filtered.reduce((s,o)=>s+o.valoare,0))} sub={`${filtered.length} comenzi`}/>
        <StatCard label="Active" value={orders.filter(o=>!['Livrat','Retur','Refuzat','Anulat'].includes(o.status)).length} sub="Nesoluționate"/>
        <StatCard label="Livrate" value={orders.filter(o=>o.status==='Livrat').length}/>
        <StatCard label="Retururi" value={orders.filter(o=>['Retur','Refuzat'].includes(o.status)).length} danger/>
      </G>
      <Card>
        <div style={{display:'flex',gap:9,marginBottom:10,flexWrap:'wrap'}}>
          <SBar value={search} onChange={setSearch} placeholder="Caută comandă, client, AWB, cod afiliere..."/>
          <Btn>Import Excel B2B</Btn>
        </div>
        <div style={{display:'flex',gap:5,marginBottom:8,flexWrap:'wrap',alignItems:'center'}}>
          <span style={{fontSize:11,color:C.textMuted,marginRight:3}}>Canal</span>
          {canale.map(c=><Pill key={c} label={c} active={fC===c} onClick={()=>setFC(c)}/>)}
        </div>
        <div style={{display:'flex',gap:5,marginBottom:13,flexWrap:'wrap',alignItems:'center'}}>
          <span style={{fontSize:11,color:C.textMuted,marginRight:3}}>Status</span>
          {statusuri.map(s=><Pill key={s} label={s} active={fS===s} onClick={()=>setFS(s)}/>)}
        </div>
        <Tbl headers={['Nr. comandă','Client / Partener','Canal','Cod afiliere','Valoare','Data','Agent','Status','AWB']} rows={rows} emptyMsg="Nicio comandă"/>
      </Card>

      {detail&&(()=>{
        const cl=getCust(detail.clientId,customers); const ag=getAgent(detail.agentId); const pt=getB2BPart(detail.sursa,b2b);
        return (
          <Modal title={`Comandă ${detail.id}`} onClose={()=>setDetail(null)} width={560}>
            <G cols={2} gap={9} style={{marginBottom:13}}>
              {[['Client / Partener',cl?.name||pt?.name||'—'],['Status',<STag status={detail.status}/>],['Canal',detail.canal+(detail.codAfiliere?` · ${detail.codAfiliere}`:'')],['Agent',ag?.name||'—'],['Curier',detail.curier||'—'],['AWB',detail.awb||'—']].map(([k,v])=>(
                <div key={k} style={{padding:9,background:C.bg,borderRadius:5}}>
                  <div style={{fontSize:11,color:C.textMuted,marginBottom:3}}>{k}</div>
                  <div style={{fontWeight:500,fontSize:13}}>{v}</div>
                </div>
              ))}
            </G>
            <div style={{fontSize:11,color:C.textMuted,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:9}}>Produse</div>
            {detail.items.map((item,i)=>{
              const pr=getProd(item.productId);
              return <div key={i} style={{display:'flex',justifyContent:'space-between',padding:'6px 0',borderBottom:`1px solid #F4F4F2`}}>
                <span style={{fontSize:13,color:C.text}}>{pr?.name} <span style={{color:C.textMuted}}>{pr?.variant}</span></span>
                <span style={{fontSize:13,fontWeight:500}}>×{item.cantitate} = {lei(item.cantitate*item.pret)}</span>
              </div>;
            })}
            <div style={{display:'flex',justifyContent:'space-between',padding:'11px 0 0',marginTop:3}}>
              <span style={{fontWeight:500,color:C.textSub}}>Total</span>
              <span style={{fontWeight:500,fontSize:15,color:C.accent}}>{lei(detail.valoare)}</span>
            </div>
            <HR/>
            <div style={{display:'flex',gap:8,justifyContent:'flex-end'}}>
              {!detail.awb&&<Btn variant="primary">Generează AWB</Btn>}
              <Btn>Schimbă status</Btn>
            </div>
          </Modal>
        );
      })()}

      {showAdd&&(
        <Modal title="Comandă nouă" onClose={()=>setShowAdd(false)}>
          <G cols={2} gap={9} style={{marginBottom:0}}>
            <Field label="Canal"><Sel value={no.canal} onChange={e=>setNo(p=>({...p,canal:e.target.value}))}>{['Balkan.ro','eMAG','Trendyol','B2B'].map(c=><option key={c}>{c}</option>)}</Sel></Field>
            <Field label="Agent"><Sel value={no.agentId} onChange={e=>setNo(p=>({...p,agentId:e.target.value}))}>{agents.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</Sel></Field>
            {no.canal==='B2B'
              ?<Field label="Partener B2B"><Sel value={no.partnerId} onChange={e=>setNo(p=>({...p,partnerId:e.target.value}))}><option value="">Selectează...</option>{b2b.map(p=><option key={p.id} value={p.id}>{p.name}</option>)}</Sel></Field>
              :<Field label="Client"><Sel value={no.clientId} onChange={e=>setNo(p=>({...p,clientId:e.target.value}))}><option value="">Selectează...</option>{customers.map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</Sel></Field>}
            <Field label="Valoare (lei)"><Inp type="number" value={no.valoare} onChange={e=>setNo(p=>({...p,valoare:e.target.value}))} placeholder="0"/></Field>
            <Field label="Curier"><Sel value={no.curier} onChange={e=>setNo(p=>({...p,curier:e.target.value}))}>{['Cargus','FanCourier','DPD','Sameday'].map(c=><option key={c}>{c}</option>)}</Sel></Field>
            <Field label="Cost livrare (lei)"><Inp type="number" value={no.costLivrare} onChange={e=>setNo(p=>({...p,costLivrare:+e.target.value}))}/></Field>
            <Field label="Cod afiliere"><Inp value={no.codAfiliere} onChange={e=>setNo(p=>({...p,codAfiliere:e.target.value}))} placeholder="ex: MARIA15"/></Field>
          </G>
          <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:13}}>
            <Btn onClick={()=>setShowAdd(false)}>Anulează</Btn>
            <Btn variant="primary" onClick={()=>{if(no.valoare){setOrders(prev=>[{id:`ORD-${Math.floor(Math.random()*9000)+1000}`,clientId:no.clientId||null,canal:no.canal,sursa:no.canal==='B2B'?no.partnerId:'Direct',valoare:+no.valoare,costLivrare:no.costLivrare,status:'Nou',data:new Date().toISOString().split('T')[0],agentId:no.agentId,curier:no.curier,awb:null,codAfiliere:no.codAfiliere||null,items:[]},...prev]);setShowAdd(false);}}}>Adaugă</Btn>
          </div>
        </Modal>
      )}
    </Page>
  );
};

// ─── CLIENȚI ──────────────────────────────────────────────────────────────────
const Clienti = ({customers,orders}) => {
  const [search,setSearch]=useState('');
  const [fC,setFC]=useState('Toate');
  const [fT,setFT]=useState('Toate');
  const [detail,setDetail]=useState(null);

  const canale=['Toate','Balkan.ro','eMAG','Trendyol'];
  const taguri=['Toate','VIP','Nou'];
  const filtered=customers.filter(c=>`${c.name} ${c.email} ${c.phone}`.toLowerCase().includes(search.toLowerCase())&&(fC==='Toate'||c.canal===fC)&&(fT==='Toate'||c.tags.includes(fT)));
  const cOrds=(id)=>orders.filter(o=>o.clientId===id);

  const rows=filtered.map(c=>{
    const ag=getAgent(c.agentId);
    return {onClick:()=>setDetail(c),cells:[
      <div style={{display:'flex',alignItems:'center',gap:8}}><Av name={c.name} size={26}/><div><div style={{fontWeight:500,color:C.text}}>{c.name}</div><div style={{fontSize:11,color:C.textMuted}}>{c.email}</div></div></div>,
      <CTag canal={c.canal}/>,
      <span style={{fontSize:12,color:C.textSub}}>{c.sursa}</span>,
      ag?<div style={{display:'flex',alignItems:'center',gap:6}}><Av name={ag.name} size={20}/><span style={{fontSize:12,color:C.textSub}}>{ag.name.split(' ')[0]}</span></div>:'—',
      <span style={{fontWeight:500}}>{cOrds(c.id).length}</span>,
      <span style={{fontWeight:500,color:C.accent}}>{lei(c.ltv)}</span>,
      <span style={{fontSize:12,color:C.textSub}}>{fmtDate(c.dataInreg)}</span>,
      <div style={{display:'flex',gap:4}}>{c.tags.map(t=><Tag key={t} label={t} bg={t==='VIP'?C.warnBg:C.accentBg} text={t==='VIP'?C.warn:C.accent}/>)}</div>
    ]};
  });

  return (
    <Page title="Clienți" action={<Btn variant="primary">+ Client nou</Btn>}>
      <G cols={4}><StatCard label="Total clienți" value={customers.length}/><StatCard label="LTV mediu" value={lei(Math.round(customers.reduce((s,c)=>s+c.ltv,0)/customers.length))} sub="Toate canalele"/><StatCard label="VIP" value={customers.filter(c=>c.tags.includes('VIP')).length}/><StatCard label="Noi luna aceasta" value={customers.filter(c=>c.tags.includes('Nou')).length}/></G>
      <Card>
        <div style={{display:'flex',gap:9,marginBottom:9}}><SBar value={search} onChange={setSearch} placeholder="Caută după nume, email, telefon..."/></div>
        <div style={{display:'flex',gap:5,marginBottom:8,alignItems:'center'}}><span style={{fontSize:11,color:C.textMuted,marginRight:3}}>Canal</span>{canale.map(c=><Pill key={c} label={c} active={fC===c} onClick={()=>setFC(c)}/>)}</div>
        <div style={{display:'flex',gap:5,marginBottom:13,alignItems:'center'}}><span style={{fontSize:11,color:C.textMuted,marginRight:3}}>Tag</span>{taguri.map(t=><Pill key={t} label={t} active={fT===t} onClick={()=>setFT(t)}/>)}</div>
        <Tbl headers={['Client','Canal','Sursă','Agent','Comenzi','LTV','Data înreg.','Taguri']} rows={rows} emptyMsg="Niciun client"/>
      </Card>
      {detail&&(
        <Modal title={detail.name} onClose={()=>setDetail(null)} width={540}>
          <div style={{display:'flex',alignItems:'center',gap:11,marginBottom:14}}>
            <Av name={detail.name} size={40}/>
            <div><div style={{fontWeight:500,fontSize:14}}>{detail.name}</div><div style={{fontSize:12,color:C.textMuted}}>{detail.email} · {detail.phone}</div></div>
          </div>
          <MRow label="Canal" value={detail.canal}/><MRow label="Sursă" value={detail.sursa}/>
          <MRow label="Agent" value={getAgent(detail.agentId)?.name}/><MRow label="Înregistrat" value={fmtDate(detail.dataInreg)}/>
          <div style={{display:'flex',justifyContent:'space-between',padding:'9px 0',borderBottom:`1px solid ${C.border}`,marginBottom:14}}>
            <span style={{fontSize:12,color:C.textMuted}}>Lifetime Value (LTV)</span>
            <span style={{fontWeight:500,fontSize:15,color:C.accent}}>{lei(detail.ltv)}</span>
          </div>
          <div style={{fontSize:11,color:C.textMuted,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:9}}>Istoric comenzi ({cOrds(detail.id).length})</div>
          {cOrds(detail.id).length===0?<span style={{fontSize:13,color:C.textMuted}}>Nicio comandă.</span>
            :cOrds(detail.id).map(o=>(
              <div key={o.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:`1px solid #F4F4F2`}}>
                <div><span style={{fontFamily:'monospace',fontSize:11,color:C.textMuted}}>{o.id}</span><span style={{marginLeft:9,fontSize:12,color:C.textSub}}>{fmtDate(o.data)}</span></div>
                <div style={{display:'flex',gap:9,alignItems:'center'}}><span style={{fontWeight:500}}>{lei(o.valoare)}</span><STag status={o.status}/></div>
              </div>
            ))
          }
        </Modal>
      )}
    </Page>
  );
};

// ─── B2B ──────────────────────────────────────────────────────────────────────
const ParteneriB2B = ({b2b,invoices}) => {
  const [search,setSearch]=useState('');
  const [fT,setFT]=useState('Toate');
  const [detail,setDetail]=useState(null);
  const tipuri=['Toate',...partnerB2BTypes];
  const filtered=b2b.filter(p=>p.name.toLowerCase().includes(search.toLowerCase())&&(fT==='Toate'||p.tip===fT));
  const pInv=(id)=>invoices.filter(i=>i.partnerId===id);
  const topTip=(tip)=>b2b.filter(p=>p.tip===tip).sort((a,b)=>b.valoareTotala-a.valoareTotala).slice(0,3);

  const rows=filtered.map(p=>{
    const ag=getAgent(p.agentId); const rest=pInv(p.id).filter(f=>f.status==='Restantă').reduce((s,f)=>s+f.valoare,0);
    return {onClick:()=>setDetail(p),cells:[
      <div><div style={{fontWeight:500,color:C.text}}>{p.name}</div><div style={{fontSize:11,color:C.textMuted}}>{p.oras}</div></div>,
      <Tag label={p.tip} bg="#EEF4FF" text="#1E40AF"/>,
      <span style={{fontSize:12,color:C.textSub}}>{p.contact}</span>,
      ag?<div style={{display:'flex',alignItems:'center',gap:6}}><Av name={ag.name} size={20}/><span style={{fontSize:12,color:C.textSub}}>{ag.name.split(' ')[0]}</span></div>:'—',
      <span style={{fontWeight:500}}>{p.comenzi}</span>,
      <span style={{fontWeight:500,color:C.accent}}>{lei(p.valoareTotala)}</span>,
      <span style={{fontWeight:500,color:p.soldFacturi>0?C.danger:C.textMuted}}>{lei(p.soldFacturi)}</span>,
      rest>0?<Tag label="Restantă" bg={C.dangerBg} text={C.danger}/>:<Tag label="La zi" bg={C.accentBg} text={C.accent}/>,
    ]};
  });

  return (
    <Page title="Parteneri B2B" action={<Btn variant="primary">+ Partener nou</Btn>}>
      <G cols={3} gap={12} style={{marginBottom:16}}>
        {partnerB2BTypes.map(tip=>(
          <Card key={tip}>
            <CLabel>Top {tip.toLowerCase()}</CLabel>
            {topTip(tip).map((p,i)=>(
              <div key={p.id} style={{display:'flex',justifyContent:'space-between',padding:'4px 0',borderBottom:i<2?`1px solid #F4F4F2`:'none'}}>
                <span style={{fontSize:12,color:C.text}}>{i+1}. {p.name}</span>
                <span style={{fontSize:12,fontWeight:500,color:C.accent}}>{lei(p.valoareTotala)}</span>
              </div>
            ))}
          </Card>
        ))}
      </G>
      <Card>
        <div style={{display:'flex',gap:9,marginBottom:10,flexWrap:'wrap'}}>
          <SBar value={search} onChange={setSearch} placeholder="Caută partener..."/>
          <div style={{display:'flex',gap:5}}>{tipuri.map(t=><Pill key={t} label={t} active={fT===t} onClick={()=>setFT(t)}/>)}</div>
        </div>
        <Tbl headers={['Partener','Tip','Contact','Agent','Comenzi','Valoare totală','Sold facturi','Scadențe']} rows={rows} emptyMsg="Niciun partener"/>
      </Card>
      {detail&&(()=>{
        const facturi=pInv(detail.id); const ag=getAgent(detail.agentId);
        return (
          <Modal title={detail.name} onClose={()=>setDetail(null)} width={560}>
            <MRow label="CUI" value={detail.cui} mono/><MRow label="Oraș" value={detail.oras}/>
            <MRow label="Contact" value={detail.contact}/><MRow label="Email" value={detail.email}/>
            <MRow label="Agent Balkan.ro" value={ag?.name}/><MRow label="Termene plată" value={`${detail.termeneP} zile`}/>
            <div style={{marginTop:14,fontSize:11,color:C.textMuted,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:9}}>Facturi ({facturi.length})</div>
            <table style={{width:'100%',fontSize:12,borderCollapse:'collapse'}}>
              <thead><tr style={{background:C.bg}}>{['Nr.','Valoare','Emisă','Scadentă','Status'].map(h=><th key={h} style={{padding:'6px 9px',textAlign:'left',fontWeight:500,color:C.textMuted,fontSize:11,textTransform:'uppercase',letterSpacing:'0.04em'}}>{h}</th>)}</tr></thead>
              <tbody>{facturi.map(f=>(
                <tr key={f.id} style={{borderTop:`1px solid ${C.border}`}}>
                  <td style={{padding:'6px 9px',fontFamily:'monospace',fontSize:11,color:C.textSub}}>{f.id}</td>
                  <td style={{padding:'6px 9px',fontWeight:500}}>{lei(f.valoare)}</td>
                  <td style={{padding:'6px 9px',color:C.textSub}}>{fmtDate(f.dataEmitere)}</td>
                  <td style={{padding:'6px 9px',color:C.textSub}}>{fmtDate(f.dataScadenta)}</td>
                  <td style={{padding:'6px 9px'}}><Tag label={f.status} bg={f.status==='Plătită'?C.accentBg:f.status==='Restantă'?C.dangerBg:C.warnBg} text={f.status==='Plătită'?C.accent:f.status==='Restantă'?C.danger:C.warn}/></td>
                </tr>
              ))}</tbody>
            </table>
          </Modal>
        );
      })()}
    </Page>
  );
};

// ─── B2P ──────────────────────────────────────────────────────────────────────
const ParteneriB2P = ({b2p,setB2p}) => {
  const [detail,setDetail]=useState(null);
  const [showAdd,setShowAdd]=useState(false);
  const [np,setNp]=useState({username:'',platforma:'Instagram',tip:'Influencer',cod:'',reducere:10,comision:8,agentId:'A2'});
  const totalTok=b2p.reduce((s,p)=>s+p.tokenuri,0);

  const rows=b2p.map(p=>{
    const ag=getAgent(p.agentId); const ac=activC[p.activ]||{bg:'#F2F2F0',text:'#606060'};
    return {onClick:()=>setDetail(p),cells:[
      <div><div style={{fontWeight:500,color:C.text}}>{p.username}</div><div style={{fontSize:11,color:C.textMuted}}>{p.platforma}</div></div>,
      <Tag label={p.tip} bg="#F5F3FF" text="#5B21B6"/>,
      <span style={{fontFamily:'monospace',fontSize:12,color:C.textSub}}>{p.cod}</span>,
      <span style={{fontWeight:500}}>{p.reducere}%</span>,
      <span style={{fontWeight:500}}>{p.comision}%</span>,
      ag?<div style={{display:'flex',alignItems:'center',gap:6}}><Av name={ag.name} size={20}/><span style={{fontSize:12,color:C.textSub}}>{ag.name.split(' ')[0]}</span></div>:'—',
      <span style={{fontWeight:500,color:C.accent}}>{lei(p.vanzariGenerate)}</span>,
      <div><span style={{fontWeight:500}}>{p.tokenuri} tok</span><div style={{fontSize:11,color:C.textMuted}}>{lei(p.tokenuri*10)} cash</div></div>,
      <Tag label={p.activ} bg={ac.bg} text={ac.text}/>,
    ]};
  });

  return (
    <Page title="Influenceri & B2P" action={<Btn variant="primary" onClick={()=>setShowAdd(true)}>+ Partener B2P</Btn>}>
      <G cols={4}><StatCard label="Parteneri" value={b2p.length}/><StatCard label="Activi" value={b2p.filter(p=>p.activ==='Activ').length} sub="2+ comenzi pe lună"/><StatCard label="Vânzări generate" value={lei(b2p.reduce((s,p)=>s+p.vanzariGenerate,0))} sub="Prin coduri afiliere"/><StatCard label="Tokenuri neplatite" value={`${totalTok} tok`} sub={`${lei(totalTok*10)} cash · ${lei(totalTok*20)} produse`}/></G>
      <Card><Tbl headers={['Partener','Tip','Cod','Reducere','Comision','Agent','Vânzări','Tokenuri','Status']} rows={rows} emptyMsg="Niciun partener B2P"/></Card>
      {detail&&(
        <Modal title={detail.username} onClose={()=>setDetail(null)} width={500}>
          <MRow label="Platformă" value={detail.platforma}/><MRow label="Tip" value={detail.tip}/>
          <MRow label="Cod afiliere" value={detail.cod} mono/><MRow label="Link" value={`balkan.ro?cod=${detail.cod}`} mono/>
          <MRow label="Reducere client" value={`${detail.reducere}%`}/><MRow label="Comision" value={`${detail.comision}%`}/>
          <HR/>
          <div style={{fontSize:11,color:C.textMuted,textTransform:'uppercase',letterSpacing:'0.05em',marginBottom:10}}>Tokenuri</div>
          <G cols={3} gap={9} style={{marginBottom:11}}>
            {[{label:'Disponibile',val:`${detail.tokenuri} tok`},{label:'Monetizat (×10)',val:lei(detail.tokenuri*10)},{label:'În produse (×20)',val:lei(detail.tokenuri*20)}].map(x=>(
              <div key={x.label} style={{padding:10,background:C.bg,borderRadius:5,textAlign:'center'}}>
                <div style={{fontSize:16,fontWeight:500,color:C.text}}>{x.val}</div>
                <div style={{fontSize:11,color:C.textMuted,marginTop:3}}>{x.label}</div>
              </div>
            ))}
          </G>
          <div style={{padding:10,background:C.bg,borderRadius:5,borderLeft:`2px solid ${C.accent}`}}>
            <div style={{fontSize:11,color:C.textMuted,marginBottom:2}}>Formula comision lunar</div>
            <div style={{fontSize:12,color:C.text}}>(Vânzări − cost livrare − TVA) × {detail.comision}% ÷ 10 = tokenuri</div>
          </div>
        </Modal>
      )}
      {showAdd&&(
        <Modal title="Partener B2P nou" onClose={()=>setShowAdd(false)}>
          <G cols={2} gap={9} style={{marginBottom:0}}>
            <Field label="Username"><Inp value={np.username} onChange={e=>setNp(p=>({...p,username:e.target.value}))} placeholder="@username"/></Field>
            <Field label="Platformă"><Sel value={np.platforma} onChange={e=>setNp(p=>({...p,platforma:e.target.value}))}>{['Instagram','TikTok','YouTube','Facebook','Altele'].map(x=><option key={x}>{x}</option>)}</Sel></Field>
            <Field label="Tip"><Sel value={np.tip} onChange={e=>setNp(p=>({...p,tip:e.target.value}))}>{[...partnerB2PTypes,'Altul'].map(x=><option key={x}>{x}</option>)}</Sel></Field>
            <Field label="Cod afiliere"><Inp value={np.cod} onChange={e=>setNp(p=>({...p,cod:e.target.value.toUpperCase()}))} placeholder="CODUNUIC"/></Field>
            <Field label="Reducere client (%)"><Inp type="number" value={np.reducere} onChange={e=>setNp(p=>({...p,reducere:+e.target.value}))}/></Field>
            <Field label="Comision partener (%)"><Inp type="number" value={np.comision} onChange={e=>setNp(p=>({...p,comision:+e.target.value}))}/></Field>
            <Field label="Agent responsabil"><Sel value={np.agentId} onChange={e=>setNp(p=>({...p,agentId:e.target.value}))}>{agents.map(a=><option key={a.id} value={a.id}>{a.name}</option>)}</Sel></Field>
          </G>
          <div style={{display:'flex',justifyContent:'flex-end',gap:8,marginTop:13}}>
            <Btn onClick={()=>setShowAdd(false)}>Anulează</Btn>
            <Btn variant="primary" onClick={()=>{if(np.username&&np.cod){setB2p(prev=>[...prev,{id:`PBP-0${prev.length+1}`,...np,activ:'Inactiv',tokenuri:0,vanzariGenerate:0}]);setShowAdd(false);}}}>Salvează</Btn>
          </div>
        </Modal>
      )}
    </Page>
  );
};

// ─── IMPORT ───────────────────────────────────────────────────────────────────
const Import = () => {
  const [drag,setDrag]=useState(null);
  const zones=[
    {label:'Produse & stoc',desc:'ID, Denumire, Categorie, Preț, Stoc, Lot, Termen valabilitate'},
    {label:'Clienți',desc:'Nume, Email, Telefon, Canal, Agent'},
    {label:'Comenzi',desc:'Nr. comandă, Client, Canal, Produse, Valoare, Data'},
    {label:'Parteneri B2B',desc:'Denumire, Tip, Oraș, CUI, Contact, Agent'},
    {label:'Parteneri B2P',desc:'Username, Tip, Cod, Reducere, Comision'},
  ];
  return (
    <Page title="Import date">
      <G cols={2} gap={12} style={{marginBottom:16}}>
        {zones.map(z=>(
          <div key={z.label} onDragOver={e=>{e.preventDefault();setDrag(z.label);}} onDragLeave={()=>setDrag(null)} onDrop={()=>setDrag(null)}
            style={{border:`1px dashed ${drag===z.label?C.accent:C.border}`,borderRadius:7,padding:'20px 16px',cursor:'pointer',background:drag===z.label?C.accentBg:'white',transition:'all 0.15s'}}>
            <div style={{fontWeight:500,fontSize:13,marginBottom:4,color:C.text}}>{z.label}</div>
            <div style={{fontSize:12,color:C.textMuted,marginBottom:9}}>{z.desc}</div>
            <div style={{fontSize:12,color:C.textSub}}>Trage fișierul sau <span style={{color:C.accent}}>apasă pentru upload</span></div>
            <div style={{fontSize:11,color:C.textMuted,marginTop:2}}>.csv · .xlsx · max 10MB</div>
          </div>
        ))}
        <div style={{border:`1px solid ${C.border}`,borderRadius:7,padding:'20px 16px',background:C.bg,display:'flex',flexDirection:'column',gap:9}}>
          <div style={{fontWeight:500,fontSize:13,color:C.text}}>Template-uri Excel</div>
          <div style={{fontSize:12,color:C.textMuted}}>Formate predefinite pentru import</div>
          {['Produse','Clienți','Comenzi B2B'].map(t=><Btn key={t}>Descarcă template {t.toLowerCase()}</Btn>)}
        </div>
      </G>
      <Card>
        <CLabel>Istoric importuri</CLabel>
        <Tbl headers={['Fișier','Tip','Rânduri','Data','Status']} rows={[
          {cells:['produse_mai2026.xlsx','Produse','38',fmtDate('2026-05-15'),<Tag label="Succes" bg={C.accentBg} text={C.accent}/>]},
          {cells:['clienti_emag_q1.csv','Clienți','204',fmtDate('2026-04-02'),<Tag label="Succes" bg={C.accentBg} text={C.accent}/>]},
          {cells:['comenzi_b2b_apr.xlsx','Comenzi B2B','89',fmtDate('2026-04-01'),<Tag label="Succes" bg={C.accentBg} text={C.accent}/>]},
        ]}/>
      </Card>
    </Page>
  );
};

// ─── APP ──────────────────────────────────────────────────────────────────────
const nav = [
  {id:'dashboard',label:'Dashboard',sec:'General'},
  {id:'comenzi',  label:'Comenzi',  sec:'Vânzări'},
  {id:'inventar', label:'Produse & stoc',sec:'Vânzări'},
  {id:'clienti',  label:'Clienți',  sec:'CRM'},
  {id:'b2b',      label:'Parteneri B2B',sec:'CRM'},
  {id:'b2p',      label:'Influenceri B2P',sec:'CRM'},
  {id:'import',   label:'Import date',sec:'Date'},
];
const sections=[...new Set(nav.map(n=>n.sec))];

export default function App() {
  const [page,setPage]=useState('dashboard');
  const [products,setProducts]=useState(initialProducts);
  const [customers]=useState(initialCustomers);
  const [orders,setOrders]=useState(initialOrders);
  const [b2b]=useState(initialB2B);
  const [b2p,setB2p]=useState(initialB2P);
  const invoices=initialInvoices;

  const activeOrds=orders.filter(o=>!['Livrat','Retur','Refuzat','Anulat'].includes(o.status)).length;
  const stocAlert=products.filter(p=>p.stocTotal<=p.pragMinim).length;

  return (
    <div style={{display:'flex',height:'100vh',fontFamily:'-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif',background:C.bg,overflow:'hidden',fontSize:14,color:C.text}}>

      {/* SIDEBAR */}
      <div style={{width:200,background:C.surface,borderRight:`1px solid ${C.border}`,display:'flex',flexDirection:'column',flexShrink:0}}>
        <div style={{padding:'14px 15px 12px',borderBottom:`1px solid ${C.border}`}}>
          <div style={{fontSize:14,fontWeight:500,color:C.text}}>Balkan <span style={{color:C.accent}}>CRM</span></div>
          <div style={{fontSize:11,color:C.textMuted,marginTop:1}}>Suplimente alimentare</div>
        </div>
        <nav style={{flex:1,overflowY:'auto',padding:'6px 8px'}}>
          {sections.map(sec=>(
            <div key={sec}>
              <div style={{fontSize:10,color:C.textMuted,textTransform:'uppercase',letterSpacing:'0.08em',padding:'10px 8px 3px'}}>{sec}</div>
              {nav.filter(n=>n.sec===sec).map(n=>{
                const isA=page===n.id;
                const bdg=n.id==='comenzi'?activeOrds:n.id==='inventar'?(stocAlert||null):null;
                return (
                  <button key={n.id} onClick={()=>setPage(n.id)} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'6px 9px',borderRadius:5,cursor:'pointer',background:isA?C.accentBg:'transparent',border:'none',width:'100%',textAlign:'left',color:isA?C.accent:C.textSub,fontWeight:isA?500:400,fontSize:13,fontFamily:'inherit',transition:'background 0.1s'}}>
                    {n.label}
                    {bdg>0&&<span style={{background:isA?C.accent:'#E8E8E4',color:isA?'white':C.textSub,fontSize:10,fontWeight:500,padding:'1px 5px',borderRadius:10,minWidth:16,textAlign:'center'}}>{bdg}</span>}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>
        <div style={{padding:'9px 11px',borderTop:`1px solid ${C.border}`,display:'flex',alignItems:'center',gap:8}}>
          <Av name="Mihai Ionescu" size={24}/>
          <div>
            <div style={{fontSize:12,fontWeight:500,color:C.text}}>Mihai Ionescu</div>
            <div style={{fontSize:10,color:C.textMuted}}>Manager vânzări</div>
          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div style={{flex:1,overflow:'auto',padding:20}}>
        {page==='dashboard'&&<Dashboard orders={orders} products={products} customers={customers} b2p={b2p} invoices={invoices}/>}
        {page==='inventar' &&<Inventar products={products} setProducts={setProducts}/>}
        {page==='comenzi'  &&<Comenzi orders={orders} setOrders={setOrders} customers={customers} b2b={b2b}/>}
        {page==='clienti'  &&<Clienti customers={customers} orders={orders}/>}
        {page==='b2b'      &&<ParteneriB2B b2b={b2b} invoices={invoices}/>}
        {page==='b2p'      &&<ParteneriB2P b2p={b2p} setB2p={setB2p}/>}
        {page==='import'   &&<Import/>}
      </div>
    </div>
  );
}
