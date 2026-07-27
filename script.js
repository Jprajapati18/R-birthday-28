/* Our Garden - logic + flower art library */
const clamp=(v,a=0,b=1)=>Math.max(a,Math.min(b,v));

/* ---------- flower art library (pure SVG) ---------- */
function shade(h,a){var c=h.replace('#','');if(c.length===3)c=c.split('').map(function(x){return x+x}).join('');var r=parseInt(c.substr(0,2),16),g=parseInt(c.substr(2,2),16),b=parseInt(c.substr(4,2),16);var f=a<0?0:255,t=Math.abs(a);r=Math.round((f-r)*t)+r;g=Math.round((f-g)*t)+g;b=Math.round((f-b)*t)+b;return 'rgb('+r+','+g+','+b+')';}
function grads(idx,pal){return '<defs>'
  +'<linearGradient id="p'+idx+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="'+shade(pal.p,.42)+'"/><stop offset="0.55" stop-color="'+pal.p+'"/><stop offset="1" stop-color="'+shade(pal.p,-.3)+'"/></linearGradient>'
  +'<radialGradient id="c'+idx+'" cx="0.42" cy="0.38" r="0.68"><stop offset="0" stop-color="'+shade(pal.c,.5)+'"/><stop offset="1" stop-color="'+pal.c+'"/></radialGradient>'
  +'<linearGradient id="lf'+idx+'" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#82c874"/><stop offset="1" stop-color="#3f7d4e"/></linearGradient>'
  +'<linearGradient id="st'+idx+'" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7cbf6c"/><stop offset="1" stop-color="#3a7647"/></linearGradient>'
  +'</defs>';}
function petEll(cx,cy,n,phase,rx,ry,dist,fill){var m='';for(var i=0;i<n;i++){var a=360/n*i+phase;m+='<ellipse cx="'+cx+'" cy="'+(cy-dist)+'" rx="'+rx+'" ry="'+ry+'" fill="'+fill+'" transform="rotate('+a+' '+cx+' '+cy+')"/>';}return m;}
function petPath(cx,cy,n,phase,scale,d,fill){var m='';for(var i=0;i<n;i++){var a=360/n*i+phase;m+='<g transform="translate('+cx+' '+cy+') rotate('+a+') scale('+scale+')"><path d="'+d+'" fill="'+fill+'"/></g>';}return m;}
function dotRing(cx,cy,n,r,dist,fill){var m='';for(var i=0;i<n;i++){var a=Math.PI*2/n*i;m+='<circle cx="'+(cx+Math.sin(a)*dist).toFixed(2)+'" cy="'+(cy-Math.cos(a)*dist).toFixed(2)+'" r="'+r+'" fill="'+fill+'"/>';}return m;}

function daisy(cx,cy,idx,pal){return petEll(cx,cy,16,0,3.4,17,15,'url(#p'+idx+')')+petEll(cx,cy,16,11.25,3,16,14,shade(pal.p,.16))+'<circle cx="'+cx+'" cy="'+cy+'" r="10" fill="url(#c'+idx+')"/>'+dotRing(cx,cy,11,1.1,6,shade(pal.c,-.35));}
function cosmos(cx,cy,idx,pal){return petEll(cx,cy,8,0,9,17,13,'url(#p'+idx+')')+petEll(cx,cy,8,22.5,4,15,11,shade(pal.p,.18))+'<circle cx="'+cx+'" cy="'+cy+'" r="7" fill="url(#c'+idx+')"/>'+dotRing(cx,cy,9,1,3.4,shade(pal.c,-.3));}
function sunflower(cx,cy,idx,pal){return petEll(cx,cy,20,0,4,19,16,'url(#p'+idx+')')+petEll(cx,cy,20,9,3.4,17,15,shade(pal.p,-.14))+'<circle cx="'+cx+'" cy="'+cy+'" r="13" fill="url(#c'+idx+')"/>'+dotRing(cx,cy,18,1,9.5,shade(pal.c,-.2))+dotRing(cx,cy,12,1,5.5,shade(pal.c,-.4))+dotRing(cx,cy,1,1.4,0,shade(pal.c,-.45));}
function tulip(cx,cy,idx,pal){var d='M0 -34 C-13 -28 -13 -6 0 0 C13 -6 13 -28 0 -34 Z';return '<g transform="translate('+cx+' '+cy+')"><g transform="rotate(-22)"><path d="'+d+'" fill="'+shade(pal.p,-.14)+'"/></g><g transform="rotate(22)"><path d="'+d+'" fill="'+shade(pal.p,-.14)+'"/></g><path d="'+d+'" fill="url(#p'+idx+')"/><path d="M0 -28 C-5 -23 -5 -7 0 -3 C5 -7 5 -23 0 -28 Z" fill="'+shade(pal.p,.3)+'" opacity=".45"/></g>';}
function poppy(cx,cy,idx,pal){return petEll(cx,cy,5,0,15,17,10,'url(#p'+idx+')')+petEll(cx,cy,5,36,13,15,9,shade(pal.p,-.12))+'<circle cx="'+cx+'" cy="'+cy+'" r="7" fill="'+shade(pal.c,-.15)+'"/>'+dotRing(cx,cy,12,1.2,7,'#241019')+'<circle cx="'+cx+'" cy="'+cy+'" r="3.4" fill="#1b0f16"/>';}
function lily(cx,cy,idx,pal){var d='M0 -34 C-8 -22 -6 -6 0 0 C6 -6 8 -22 0 -34 Z';var s=petPath(cx,cy,3,60,1,d,shade(pal.p,-.12))+petPath(cx,cy,3,0,1,d,'url(#p'+idx+')');for(var i=0;i<6;i++){var a=Math.PI*2/6*i;var ex=(cx+Math.sin(a)*10).toFixed(2),ey=(cy-Math.cos(a)*10).toFixed(2);s+='<line x1="'+cx+'" y1="'+cy+'" x2="'+ex+'" y2="'+ey+'" stroke="'+shade(pal.c,-.2)+'" stroke-width="1.2"/><circle cx="'+ex+'" cy="'+ey+'" r="1.9" fill="'+shade(pal.c,-.35)+'"/>';}return s+'<circle cx="'+cx+'" cy="'+cy+'" r="4" fill="url(#c'+idx+')"/>';}
function sakura(cx,cy,idx,pal){var d='M0 -30 C-9 -26 -10 -12 -4 -4 L0 -8 L4 -4 C10 -12 9 -26 0 -30 Z';return petPath(cx,cy,5,0,1,d,'url(#p'+idx+')')+dotRing(cx,cy,6,0.9,4,shade(pal.c,-.1))+'<circle cx="'+cx+'" cy="'+cy+'" r="3" fill="url(#c'+idx+')"/>';}
function rose(cx,cy,idx,pal){var d='M0 2 C-15 -6 -12 -27 0 -31 C12 -27 15 -6 0 2 Z';var p='url(#p'+idx+')';return petPath(cx,cy,6,0,1,d,p)+petPath(cx,cy,6,30,0.72,d,shade(pal.p,-.07))+petPath(cx,cy,5,12,0.46,d,shade(pal.p,-.13))+petPath(cx,cy,4,26,0.27,d,shade(pal.p,-.2))+'<circle cx="'+cx+'" cy="'+cy+'" r="3.1" fill="'+shade(pal.p,-.26)+'"/>';}
function fhead(sp,cx,cy,idx,pal){ if(sp==='cosmos')return cosmos(cx,cy,idx,pal); if(sp==='sunflower')return sunflower(cx,cy,idx,pal); if(sp==='tulip')return tulip(cx,cy,idx,pal); if(sp==='lily')return lily(cx,cy,idx,pal); if(sp==='sakura')return sakura(cx,cy,idx,pal); if(sp==='rose')return rose(cx,cy,idx,pal); if(sp==='poppy')return poppy(cx,cy,idx,pal); return daisy(cx,cy,idx,pal); }
function flowerSVG(m,idx){ var pal={p:m.petal,c:m.center};
  return '<svg viewBox="0 0 100 190">'+grads(idx,pal)
    +'<g class="stem"><path d="M50 190 C46 150 54 116 50 92" stroke="url(#st'+idx+')" stroke-width="5.5" fill="none" stroke-linecap="round"/>'
    +'<g transform="translate(50 152)"><path d="M0 0 C-24 -5 -35 -24 -30 -41 C-9 -35 3 -17 0 0 Z" fill="url(#lf'+idx+')"/><path d="M-3 -2 C-13 -13 -22 -27 -28 -38" stroke="rgba(0,0,0,.14)" stroke-width="1" fill="none"/></g>'
    +'<g transform="translate(50 126)"><path d="M0 0 C24 -5 35 -22 30 -39 C11 -33 -3 -16 0 0 Z" fill="url(#lf'+idx+')"/><path d="M3 -2 C13 -12 22 -25 28 -36" stroke="rgba(0,0,0,.14)" stroke-width="1" fill="none"/></g>'
    +'</g><g class="head">'+fhead(m.species,50,46,idx,pal)+'</g></svg>'; }


/* ===== EDIT: 8 memory flowers (each a different colour) ===== */
const memories = [
  { species:"daisy",     date:"❤️ Love",        title:"Forever Together",         note:"Choosing each other, every single day.", photo:"photos/Love.jpg",       petal:"#ffffff", center:"#ffcf3f", left:8,  depth:.85 },
  { species:"cosmos",    date:"🤝 Trust",    title:"Unbreakable Bond", note:"Faith in us through everything.",         photo:"photos/Trust.jpg",      petal:"#f49ac1", center:"#ffd24a", left:20, depth:.5  },
  { species:"sunflower", date:"💙 Understanding",       title:"Hear Each Other", note:"Listening with heart.",                     photo:"photos/Understanding.jpg",      petal:"#ffcf3f", center:"#7a4a25", left:32, depth:.9  },
  { species:"tulip",     date:"🌿 Patience", title:"Grow Together",       note:"Giving love the time it needs.",                photo:"photos/Patience.jpg",    petal:"#f6944a", center:"#e0631f", left:44, depth:.55 },
  { species:"lily",      date:"✨ Respect",          title:"Value Always",    note:"Honoring dreams, choices, and hearts.",              photo:"photos/Respect.jpg",      petal:"#b57ee0", center:"#ffe08a", left:56, depth:.88 },
  { species:"sakura",    date:"🌸 Support",       title:"Side by Side", note:"Lifting each other through everything.",   photo:"photos/Support.jpg",     petal:"#ffd1e0", center:"#f6c65a", left:68, depth:.5  },
  { species:"rose",      date:"🤍 Forgiveness",      title:"Choose Peace",     note:"Letting go, loving even stronger.",                       photo:"photos/Forgiveness.jpg", petal:"#e8556b", center:"#ffe08a", left:80, depth:.86 },
  { species:"poppy",     date:"💍 Commitment",            title:"Always Us",            note:"Choosing forever, every single day.",                      photo:"photos/Commitment.jpg",      petal:"#ef5f5b", center:"#3a2233", left:92, depth:.6  },
];
/* ===== EDIT: the 5 leaf promises ===== */
const promises = [
  "I promise to hold your hand when life gets overwhelming.",
  "I promise to celebrate your wins like they're my own.",
  "I promise to keep choosing us, every single day.",
  "I promise to annoy you just enough to keep life interesting.",
  "I promise to roast you, then defend you five seconds later.",
];
/* ===== EDIT: the flower's little love notes ===== */
const loveNotes = [
  "You're my favourite hello and my hardest goodbye.",
  "If home had a heartbeat, it would sound like you.",
  "Thank you for making my heart feel safe.",
  "Thank you for being exactly you.",
  "I love you more than yesterday, less than tomorrow.",
];
const seedPetal="#ef6f9a", seedCenter="#ffe08a";
/* =========================================================== */

/* ---------- meadow flowers ---------- */

const bed=document.getElementById('bed'), grassFront=document.getElementById('grassFront');
document.getElementById('totalF').textContent=memories.length;
var plots=document.createElement('div'); plots.className='plots'; bed.insertBefore(plots,grassFront);
memories.forEach(function(m,i){
  var plot=document.createElement('div'); plot.className='plot';
  var el=document.createElement('div'); el.className='flower'; el.tabIndex=0;
  el.style.transitionDelay=(i*0.05)+'s';
  el.style.maxWidth=(126+((i*3)%4)*9)+'px';   /* gentle organic size variation */
  el.innerHTML=flowerSVG(m,i);
  var lab=document.createElement('div'); lab.className='label'; lab.textContent=m.date;
  el.addEventListener('click',function(){ openMemory(m,i,el); });
  el.addEventListener('keydown',function(e){ if(e.key==='Enter') openMemory(m,i,el); });
  plot.appendChild(el); plot.appendChild(lab); plots.appendChild(plot); m._el=el;
});
var io=new IntersectionObserver(function(es){ es.forEach(function(e){ if(e.isIntersecting) e.target.classList.add('bloom'); }); },{threshold:.2});
document.querySelectorAll('.flower').forEach(function(f){ io.observe(f); });

/* grass */
function buildGrass(svg,count,W,Hmax,cols){ let s=''; for(let i=0;i<count;i++){ const x=(i/count)*W+(Math.random()-.5)*(W/count);
  const h=Hmax*(0.5+Math.random()*0.5),lean=(Math.random()-.5)*24,w=6+Math.random()*5,c=cols[i%cols.length],b=Hmax;
  s+='<path d="M'+x+' '+b+' Q'+(x+lean/2)+' '+(b-h/2)+' '+(x+lean)+' '+(b-h)+' Q'+(x+lean/2+w)+' '+(b-h/2)+' '+(x+w)+' '+b+' Z" fill="'+c+'"/>'; }
  svg.innerHTML=s; }
buildGrass(document.getElementById('grassBack'),46,1200,200,['#4f9a5f','#5aa864','#438a52']);
buildGrass(grassFront,40,1200,120,['#3f7d4e','#357045','#4a8a58']);

/* ---------- card ---------- */
const card=document.getElementById('card');
function showCard({date,title,note,photo}){ const ph=document.getElementById('cPhoto');
  if(photo===undefined){ ph.className='photo hide'; }
  else { ph.className='photo'; if(photo){ ph.innerHTML='<img src="'+photo+'" alt="" onerror="this.parentNode.textContent=\'\ud83d\udcf7 photo coming soon\'">'; } else { ph.textContent='your photo here'; } }
  document.getElementById('cDate').textContent=date||''; document.getElementById('cTitle').textContent=title||'';
  document.getElementById('cNote').textContent=note||''; card.classList.add('open'); }
card.addEventListener('click',()=>card.classList.remove('open'));
addEventListener('keydown',e=>{ if(e.key==='Escape') card.classList.remove('open'); });

let picked=0; const seen=new Set();
function openMemory(m,i,el){ showCard({date:m.date,title:m.title,note:m.note,photo:m.photo});
  if(!seen.has(i)){ seen.add(i); picked++; document.getElementById('picked').textContent=picked; el.classList.add('picked'); } }

/* ================= WATER TO GROW (5 leaves + flower) ================= */
function bigRose(cx,cy,idx,pal){
  var d='M0 3 C-16 -6 -13 -29 0 -33 C13 -29 16 -6 0 3 Z', p='url(#p'+idx+')', s='';
  s+=petPath(cx,cy,5,36,1.22,'M0 6 C-5 -12 -2 -34 0 -38 C2 -34 5 -12 0 6 Z','#4f9a5f');   /* sepals */
  s+=petPath(cx,cy,8,0,1.08,d,shade(pal.p,.08));
  s+=petPath(cx,cy,8,22,0.86,d,p);
  s+=petPath(cx,cy,6,10,0.64,d,shade(pal.p,-.08));
  s+=petPath(cx,cy,5,26,0.44,d,shade(pal.p,-.15));
  s+=petPath(cx,cy,4,12,0.27,d,shade(pal.p,-.22));
  s+='<circle cx="'+cx+'" cy="'+cy+'" r="3.4" fill="'+shade(pal.p,-.28)+'"/>';
  return s;
}
const grow=document.getElementById('grow'); const cx=150, baseY=430, maxStem=300;
const leafThr=[0.2,0.35,0.5,0.65,0.8];
const leafY=leafThr.map(function(t){return baseY-maxStem*t;});
var GP={p:seedPetal,c:seedCenter};
/* 5 promise leaves (tappable) */
var leavesStr='';
for(var _i=0;_i<5;_i++){ var _s=(_i%2===0)?1:-1;
  leavesStr+='<g id="leaf'+_i+'" class="leafG" data-i="'+_i+'" style="pointer-events:auto" transform="translate('+cx+','+leafY[_i]+') scale(0)">'
    +'<circle cx="30" cy="-40" r="60" fill="rgba(0,0,0,0)" pointer-events="all"/>'
    +'<path d="M0 0 C60 -10 92 -46 80 -84 C40 -72 6 -40 0 0 Z" fill="url(#lfB)" stroke="#3f7d4e" stroke-width="2"/>'
    +'<path d="M6 -6 C36 -26 60 -50 74 -78" stroke="rgba(0,0,0,.2)" stroke-width="1.8" fill="none"/>'
    +'<path d="M22 -16 C32 -22 42 -32 49 -44 M40 -30 C50 -36 58 -46 63 -58" stroke="rgba(0,0,0,.12)" stroke-width="1" fill="none"/>'
    +'</g>'; }
/* small decorative leaves (not tappable) for a fuller plant */
var decoThr=[0.28,0.44,0.6,0.74], decoSide=[-1,1,-1,1], decoStr='';
for(var _d=0;_d<4;_d++){
  decoStr+='<g class="decoLeaf" data-t="'+decoThr[_d]+'" data-s="'+decoSide[_d]+'" style="pointer-events:none" transform="translate('+cx+','+(baseY-maxStem*decoThr[_d])+') scale(0)">'
    +'<path d="M0 0 C34 -6 52 -26 45 -48 C22 -42 3 -22 0 0 Z" fill="url(#lfB)" opacity=".92"/>'
    +'<path d="M4 -4 C20 -16 36 -30 43 -44" stroke="rgba(0,0,0,.14)" stroke-width="1.2" fill="none"/></g>'; }
/* grass tuft + pebbles at the base */
var tuft='<g id="tuft">';
for(var _t=0;_t<11;_t++){ var tx=150+(_t-5)*11+(Math.random()*4-2), th=20+Math.random()*22, tl=(Math.random()-.5)*12;
  tuft+='<path d="M'+tx.toFixed(1)+' 446 Q'+(tx+tl/2).toFixed(1)+' '+(446-th/2).toFixed(1)+' '+(tx+tl).toFixed(1)+' '+(446-th).toFixed(1)+'" stroke="'+(_t%2?'#4f9a5f':'#3f7d4e')+'" stroke-width="3" fill="none" stroke-linecap="round"/>'; }
tuft+='<ellipse cx="118" cy="452" rx="11" ry="4.5" fill="#8f8579"/><ellipse cx="186" cy="454" rx="8" ry="3.6" fill="#9c9289"/></g>';

grow.innerHTML =
  grads('B',GP)
  +'<ellipse id="wet" cx="150" cy="444" rx="94" ry="24" fill="#3a2417" opacity="0"/>'
  +'<ellipse cx="150" cy="448" rx="100" ry="28" fill="#6b4a35"/>'
  +'<ellipse cx="150" cy="442" rx="100" ry="24" fill="#7d5a42"/>'
  +tuft
  +'<g id="sproutG" transform="translate(150,426)" opacity="0"><path d="M0 0 C-14 -4 -20 -16 -16 -26 C-4 -22 2 -10 0 0 Z" fill="#5aa060"/><path d="M0 0 C14 -4 20 -16 16 -26 C4 -22 -2 -10 0 0 Z" fill="#4f9a5f"/></g>'
  +'<g id="stemG"><path d="M150 '+baseY+' C144 '+(baseY-110)+' 158 '+(baseY-210)+' 150 '+(baseY-maxStem)+'" stroke="url(#stB)" stroke-width="11" fill="none" stroke-linecap="round"/></g>'
  +decoStr
  +leavesStr
  +'<g id="budBloom"><g id="budG"><path d="M0 8 C-15 8 -19 -18 0 -40 C19 -18 15 8 0 8 Z" fill="url(#stB)"/><path d="M0 -4 C-6 -6 -8 -22 0 -34 C8 -22 6 -6 0 -4 Z" fill="'+shade(seedPetal,-.08)+'" opacity=".65"/></g>'
    +'<g id="bloomG" data-flower="1" style="pointer-events:auto" opacity="0"><circle r="54" fill="rgba(0,0,0,0)" pointer-events="all"/>'
      +'<g transform="scale(1.95)">'+bigRose(0,0,'B',GP)+'</g>'
      +'<g id="sparkleG">'+dotRing(0,0,8,1.7,52,'#fff3c0').replace(/<circle /g,'<circle class="spark" ')+'</g>'
    +'</g></g>';
const wet=grow.querySelector('#wet'), sproutG=grow.querySelector('#sproutG'), stemG=grow.querySelector('#stemG'),
      budBloom=grow.querySelector('#budBloom'), budG=grow.querySelector('#budG'), bloomG=grow.querySelector('#bloomG');
const decoEls=[].slice.call(grow.querySelectorAll('.decoLeaf'));
const leafEls=[].slice.call(grow.querySelectorAll('.leafG'));

let g=0, grown=false, watering=false;
const stageEl=document.getElementById('stage'), vineBar=document.getElementById('vineBar'),
      glow=document.getElementById('glow'), holdHint=document.getElementById('holdHint'), ptrack=document.getElementById('ptrack');
function stageText(){ let s; if(g<0.12)s='a little seed…'; else if(g<0.3)s='a sprout! keep holding 🌱';
  else if(g<0.55)s='the stem is rising…'; else if(g<0.72)s='leaves are unfurling…';
  else if(g<1)s='a bud is opening…'; else s='in full bloom 🌸'; stageEl.textContent=s; }
function updateGrow(){
  const stemFrac=clamp((g-0.06)/0.52), topY=baseY-maxStem*stemFrac;
  stemG.setAttribute('transform','translate(0,'+baseY+') scale(1,'+stemFrac+') translate(0,'+(-baseY)+')');
  wet.setAttribute('opacity',clamp(g*2.4));
  sproutG.setAttribute('opacity',clamp(g/0.08)*clamp(1-(g-0.14)/0.1));
  sproutG.setAttribute('transform','translate(150,426) scale('+(0.4+clamp(g/0.12)*0.6)+')');
  leafEls.forEach((el,i)=>{ const sc=clamp((stemFrac-leafThr[i])/0.1); const side=(i%2===0)?1:-1;
    el.setAttribute('transform','translate('+cx+','+leafY[i]+') scale('+(side*sc)+','+sc+')'); });
  decoEls.forEach(function(el){ var thr=+el.dataset.t, side=+el.dataset.s, sc=clamp((stemFrac-thr)/0.1)*0.62;
    el.setAttribute('transform','translate('+cx+','+(baseY-maxStem*thr)+') scale('+(side*sc)+','+sc+')'); });
  const budSc=clamp((g-0.4)/0.22), bloomSc=clamp((g-0.7)/0.3);
  budBloom.setAttribute('transform','translate('+cx+','+topY+')');
  budG.setAttribute('transform','scale('+(budSc*(1-bloomSc))+')'); budG.setAttribute('opacity',1-bloomSc);
  bloomG.setAttribute('opacity',bloomSc); bloomG.setAttribute('transform','scale('+bloomSc+') rotate('+(bloomSc*40)+')');
  vineBar.style.width=(g*100)+'%'; glow.style.opacity=bloomSc; stageText();
  if(g>=1 && !grown) finishGrow();
}
function finishGrow(){ grown=true; holdHint.style.display='none'; ptrack.style.opacity=1; updatePtrack();
  leafEls.forEach(el=>{ el.classList.add('tappable','hintglow'); });
  bloomG.classList.add('tappable','hintglow');
  setTimeout(petalBurst,300);
  setTimeout(()=>showCard({title:'It bloomed 🌸',date:'Our forever',note:'Tap each leaf for a promise — and tap the flower for a little love note.'}),700);
}
updateGrow();

/* watering interaction */
const scene=document.getElementById('scene'), can=document.getElementById('can');
function moveCan(e){ can.style.left=e.clientX+'px'; can.style.top=e.clientY+'px'; }
function stopWater(){ watering=false; can.style.opacity=0; can.style.transform='rotate(0)'; }
scene.addEventListener('pointerdown',e=>{ if(grown) return; watering=true; can.style.opacity=1; can.style.transform='rotate(30deg)'; moveCan(e); });
scene.addEventListener('pointermove',e=>{ if(watering) moveCan(e); });
addEventListener('pointerup',stopWater);
addEventListener('pointercancel',stopWater);            /* fires when a swipe starts scrolling -> lets the page scroll */
scene.addEventListener('pointerleave',()=>{ if(watering) stopWater(); });
function waterLoop(){ if(watering && !grown){ g=clamp(g+0.0045); updateGrow();
  dropAt(); if(Math.random()<.6) dropAt(); } requestAnimationFrame(waterLoop); }
waterLoop();
function dropAt(){ const r=scene.getBoundingClientRect();
  const sx=(can.style.left?parseFloat(can.style.left):r.left+r.width/2)+20;
  const sy=(can.style.top?parseFloat(can.style.top):r.top)+22;
  const d=document.createElement('div');
  Object.assign(d.style,{position:'fixed',zIndex:8,left:sx+'px',top:sy+'px',width:'7px',height:'15px',
    borderRadius:'50% 50% 50% 50%/62% 62% 40% 40%',background:'linear-gradient(#bfe3f5,#8fc7e8)',opacity:.96,
    pointerEvents:'none',transition:'transform .5s cubic-bezier(.5,0,.9,.5),opacity .5s'});
  document.body.appendChild(d); const landY=r.top+r.height*0.86-sy;
  requestAnimationFrame(()=>{ d.style.transform='translateY('+landY+'px)'; d.style.opacity=0; });
  setTimeout(()=>{ d.remove(); ripple(sx,r.top+r.height*0.86); },500);
}
function ripple(x,y){ const el=document.createElement('div');
  Object.assign(el.style,{position:'fixed',zIndex:8,left:x+'px',top:y+'px',width:'6px',height:'6px',
    border:'2px solid rgba(143,199,232,.8)',borderRadius:'50%',pointerEvents:'none',transform:'translate(-50%,-50%) scale(.4)',
    transition:'transform .5s ease-out,opacity .5s'});
  document.body.appendChild(el); requestAnimationFrame(()=>{ el.style.transform='translate(-50%,-50%) scale(2.4)'; el.style.opacity=0; });
  setTimeout(()=>el.remove(),520);
}

/* leaf & flower taps */
const readLeaf=new Set();
function updatePtrack(){ ptrack.textContent='Promises found '+readLeaf.size+'/5 · tap the flower for love notes 💌'; }
leafEls.forEach(el=>{ el.addEventListener('click',ev=>{ ev.stopPropagation(); if(!grown) return;
  const i=+el.dataset.i; showCard({title:'A promise 🌿',date:'Leaf '+(i+1)+' of 5',note:promises[i]});
  if(!readLeaf.has(i)){ readLeaf.add(i); el.classList.remove('hintglow');
    el.querySelector('path').setAttribute('fill','#e8b04a'); updatePtrack(); } }); });
let li=0;
bloomG.addEventListener('click',ev=>{ ev.stopPropagation(); if(!grown) return;
  showCard({title:'A little love note 💌',date:'From me, to you',note:loveNotes[li]});
  li=(li+1)%loveNotes.length; });

/* ---------- particles ---------- */
const fx=document.getElementById('fx'), fc=fx.getContext('2d'); let FW,FH;
function fxr(){ FW=fx.width=innerWidth; FH=fx.height=innerHeight; } fxr(); addEventListener('resize',fxr);
const petals=[]; for(let i=0;i<26;i++) petals.push(np(true));
function np(init){ return { x:Math.random()*innerWidth,y:init?Math.random()*innerHeight:-20,s:6+Math.random()*8,
  vy:.6+Math.random()*.9,vx:(Math.random()-.5)*.7,rot:Math.random()*6.28,vr:(Math.random()-.5)*.05,
  c:['#f7c6dc','#ffe0c2','#ffffff','#f4a9c6'][Math.floor(Math.random()*4)] }; }
const flies=[]; for(let i=0;i<30;i++) flies.push({x:Math.random()*innerWidth,y:Math.random()*innerHeight,
  ph:Math.random()*6.28,sp:.3+Math.random()*.5,vx:(Math.random()-.5)*.4,vy:-(.15+Math.random()*.35)});
let progress=0;
function drawFX(t){ requestAnimationFrame(drawFX); fc.clearRect(0,0,FW,FH);
  const dayA=clamp(1-Math.max(0,(progress-0.62))/0.16), nightA=clamp((progress-0.66)/0.16);
  if(dayA>0.02) petals.forEach(p=>{ p.y+=p.vy; p.x+=p.vx+Math.sin(t*0.001+p.rot); p.rot+=p.vr;
    if(p.y>innerHeight+20) Object.assign(p,np(false));
    fc.save(); fc.globalAlpha=dayA*.9; fc.translate(p.x,p.y); fc.rotate(p.rot); fc.fillStyle=p.c;
    fc.beginPath(); fc.ellipse(0,0,p.s,p.s*.6,0,0,6.28); fc.fill(); fc.restore(); });
  if(nightA>0.02) flies.forEach(f=>{ f.x+=f.vx; f.y+=f.vy; f.ph+=f.sp*0.05;
    if(f.y<-10){ f.y=innerHeight+10; f.x=Math.random()*innerWidth; } if(f.x<-10)f.x=innerWidth+10; if(f.x>innerWidth+10)f.x=-10;
    const gl=(Math.sin(f.ph)*.5+.5)*nightA, gr=fc.createRadialGradient(f.x,f.y,0,f.x,f.y,9);
    gr.addColorStop(0,'rgba(255,224,130,'+gl+')'); gr.addColorStop(1,'rgba(255,224,130,0)');
    fc.fillStyle=gr; fc.beginPath(); fc.arc(f.x,f.y,9,0,6.28); fc.fill(); });
}
requestAnimationFrame(drawFX);

/* sky */
const keys=[ [0.0,[191,230,242],[248,230,207]],[0.4,[168,214,240],[255,240,214]],
  [0.68,[247,196,140],[250,206,158]],[0.86,[196,132,150],[120,78,110]],[1.0,[104,70,120],[52,36,70]] ];
function lerp(a,b,t){ return a+(b-a)*t; }
function colAt(p){ let i=0; while(i<keys.length-1&&p>keys[i+1][0])i++; const a=keys[i],b=keys[Math.min(i+1,keys.length-1)],sp=(b[0]-a[0])||1,t=clamp((p-a[0])/sp);
  const mix=x=>[Math.round(lerp(a[x][0],b[x][0],t)),Math.round(lerp(a[x][1],b[x][1],t)),Math.round(lerp(a[x][2],b[x][2],t))]; return [mix(1),mix(2)]; }
const sky=document.getElementById('sky'), sun=document.getElementById('sun'),
      hf=document.getElementById('hillFar').querySelector('path'), hn=document.getElementById('hillNear').querySelector('path');
function onScroll(){ progress=scrollY/((document.body.scrollHeight-innerHeight)||1); const [tp,bt]=colAt(progress);
  sky.style.background='linear-gradient(180deg,rgb('+tp.join(',')+'),rgb('+bt.join(',')+'))';
  sun.style.top=(14+progress*66)+'%'; sun.style.opacity=clamp(1-progress*1.5); const d=1-progress*0.7;
  hf.setAttribute('fill','rgb('+Math.round(90*d+24)+','+Math.round(150*d+24)+','+Math.round(95*d+28)+')');
  hn.setAttribute('fill','rgb('+Math.round(63*d+16)+','+Math.round(125*d+18)+','+Math.round(82*d+24)+')');
  document.body.classList.toggle('dusk',progress>0.66); }
addEventListener('scroll',onScroll,{passive:true}); onScroll();

/* finale + music + butterflies */
function petalBurst(){ for(let k=0;k<42;k++){ const d=document.createElement('div'); d.textContent=['\u2740','\u2728','\ud83c\udf38'][k%3];
  Object.assign(d.style,{position:'fixed',left:'50%',top:'42%',zIndex:45,pointerEvents:'none',fontSize:(Math.random()*16+12)+'px',
    transition:'transform 2.4s ease-out,opacity 2.4s',opacity:1}); document.body.appendChild(d);
  const a=Math.random()*6.28,ds=140+Math.random()*200;
  requestAnimationFrame(()=>{ d.style.transform='translate('+Math.cos(a)*ds+'px,'+Math.sin(a)*ds+'px) rotate('+(Math.random()*360)+'deg)'; d.style.opacity=0; });
  setTimeout(()=>d.remove(),2500); } }
new IntersectionObserver(es=>es.forEach(e=>{ if(e.isIntersecting) petalBurst(); }),{threshold:.5}).observe(document.getElementById('finale'));
const song=document.getElementById('song'); let ms=false;
addEventListener('pointerdown',()=>{ if(ms)return; song.volume=.45; song.play().then(()=>ms=true).catch(()=>{}); });
document.getElementById('mute').addEventListener('click',e=>{ e.stopPropagation();
  if(song.paused){ song.play().then(()=>ms=true).catch(()=>{}); e.target.style.opacity=.9; } else { song.pause(); e.target.style.opacity=.4; } });
function butterfly(){ const b=document.createElement('img'); b.className='fly';
  b.src="data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 32'><g fill='%23e58fb8' stroke='%23b8567f' stroke-width='1'><path d='M20 16 C6 0 0 6 4 16 C0 26 6 32 20 16Z'/><path d='M20 16 C34 0 40 6 36 16 C40 26 34 32 20 16Z'/></g></svg>";
  b.style.left='-40px'; b.style.top=(20+Math.random()*50)+'%'; document.body.appendChild(b);
  let x=-40,y=parseFloat(b.style.top)/100*innerHeight,ph=Math.random()*6.28;
  const iv=setInterval(()=>{ x+=1.4; ph+=0.15; y+=Math.sin(ph)*2; b.style.left=x+'px'; b.style.top=y+'px';
    b.style.transform='scaleX('+((0.6+Math.abs(Math.sin(ph*3))*0.6))+')'; if(x>innerWidth+50){ clearInterval(iv); b.remove(); } },30); }
setInterval(()=>{ if(progress<0.6 && Math.random()<.5) butterfly(); },6000); setTimeout(butterfly,2500);
