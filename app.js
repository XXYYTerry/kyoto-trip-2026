const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const stateKey='kyoto2026-state';
const state=JSON.parse(localStorage.getItem(stateKey)||'{"checks":{},"missions":{},"budget":[],"dark":false}');
const save=()=>localStorage.setItem(stateKey,JSON.stringify(state));

$$('.day-tab').forEach(btn=>btn.addEventListener('click',()=>{
  $$('.day-tab').forEach(x=>x.classList.remove('active')); btn.classList.add('active');
  $$('.day-panel').forEach(x=>x.classList.toggle('active',x.dataset.panel===btn.dataset.day));
  window.scrollTo({top:document.querySelector('.day-tabs').offsetTop-4,behavior:'smooth'});
}));

const trip=new Date('2026-07-25T06:30:00+08:00');
const now=new Date(); const days=Math.ceil((trip-now)/86400000);
$('#countdown').textContent=days>0?`${days} 天`:days===0?'今天出發':'旅程已開始';

function applyTheme(){document.body.classList.toggle('dark',state.dark);$('#themeBtn').textContent=state.dark?'☀':'☾';}
applyTheme(); $('#themeBtn').onclick=()=>{state.dark=!state.dark;save();applyTheme()};

$$('.persist-check').forEach(i=>{i.checked=!!state.checks[i.dataset.key];i.onchange=()=>{state.checks[i.dataset.key]=i.checked;save()}});
$$('.mission').forEach(i=>{i.checked=!!state.missions[i.dataset.key];i.onchange=()=>{state.missions[i.dataset.key]=i.checked;save();updateMission()}});
function updateMission(){const all=$$('.mission'), done=all.filter(x=>x.checked).length, pct=Math.round(done/all.length*100);$('#missionProgress').textContent=pct+'%';$('#missionBar').style.width=pct+'%'} updateMission();

function renderBudget(){
  const total=state.budget.reduce((a,b)=>a+Number(b.amount),0);$('#budgetTotal').textContent=total.toLocaleString();
  $('#budgetList').innerHTML=state.budget.map((x,i)=>`<div class="budget-item"><span>${x.item}<br><small>${x.category}</small></span><b>¥${Number(x.amount).toLocaleString()}</b><button class="delete-btn" data-i="${i}">×</button></div>`).join('');
  $$('.delete-btn').forEach(b=>b.onclick=()=>{state.budget.splice(Number(b.dataset.i),1);save();renderBudget()});
}
renderBudget();
$('#budgetForm').onsubmit=e=>{e.preventDefault();state.budget.unshift({item:$('#budgetItem').value,amount:Number($('#budgetAmount').value),category:$('#budgetCategory').value});save();renderBudget();e.target.reset()};

function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1500)}
$$('.phrase').forEach(b=>b.onclick=async()=>{try{await navigator.clipboard.writeText(b.dataset.text);toast('已複製日文')}catch{toast(b.dataset.text)}});

let deferredPrompt;window.addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferredPrompt=e;$('#installBtn').hidden=false});
$('#installBtn').onclick=async()=>{if(!deferredPrompt)return;deferredPrompt.prompt();await deferredPrompt.userChoice;deferredPrompt=null;$('#installBtn').hidden=true};
if('serviceWorker'in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
