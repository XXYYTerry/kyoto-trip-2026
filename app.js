const qs=(s,p=document)=>p.querySelector(s), qsa=(s,p=document)=>[...p.querySelectorAll(s)];
const store={get:(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}},set:(k,v)=>localStorage.setItem(k,JSON.stringify(v))};
const toast=(msg)=>{const t=qs('#toast');t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),1500)};

const days=[
{date:'7/25',day:'D1',title:'抵達京都・河原町購物',sub:'輕鬆開場，先逛錦市場與本次必去 3COINS。',mood:'舒適度 ★★★★☆',metrics:['約 8,000 步','購物主日','晚餐彈性'],stops:[
['10:10','✈️','抵達關西機場','入境、領行李，預留 60–90 分鐘。','Kansai International Airport'],
['11:40','🚆','HARUKA 前往京都','搭指定席較適合親子，約 80 分鐘。','Kyoto Station'],
['13:30','🏨','飯店寄放行李','稍作休息，再前往河原町。','Daiwa Roynet Hotel Kyoto Shijo Karasuma'],
['15:00','🍢','錦市場','邊走邊吃，先逛會較早收店的市場。','Nishiki Market Kyoto'],
['16:20','🛍️','寺町・新京極','室內外商店街交錯，依孩子體力縮短。','Shinkyogoku Shopping Street'],
['17:10','⭐','3COINS +plus 河原町 OPA 店','本次唯一排入正式行程的 3COINS，逛約 30–45 分鐘。','3COINS +plus 河原町OPA店'],
['18:10','🏬','京都高島屋 S.C.／Nintendo KYOTO','百貨、伴手禮與角色周邊一次完成；不想逛太久可只去 T8。','Kyoto Takashimaya S.C.'],
['19:30','🍽️','河原町晚餐','打開「美食」頁，依排隊與孩子狀況決定。','Kyoto Kawaramachi Station']
],foodArea:'河原町'},
{date:'7/26',day:'D2',title:'宇治抹茶 × 奈良小鹿',sub:'上午宇治、下午奈良；戶外較多，記得補水。',mood:'舒適度 ★★★☆☆',metrics:['約 13,000 步','JR 移動','戶外日'],stops:[
['08:00','🚆','京都 → 宇治','搭 JR 奈良線，約 20–30 分鐘。','Uji Station Kyoto'],
['09:00','🍵','宇治表參道','抹茶甜點與伴手禮，先逛再進平等院。','Byodoin Omotesando Uji'],
['10:30','🏯','平等院・宇治川','停留約 60–90 分鐘。','Byodoin Temple'],
['12:15','🍜','宇治午餐','候選餐廳請看「美食」頁，熱門店可提早排。','Uji Station Kyoto'],
['13:30','🚆','宇治 → 奈良','搭 JR 前往奈良。','Nara Station'],
['14:30','🦌','奈良公園','分次拿鹿仙貝，孩子怕鹿就先在外圍觀察。','Nara Park'],
['16:00','🙏','東大寺','看大佛殿，視天氣縮短戶外時間。','Todai-ji'],
['18:30','🌙','返回京都','可在京都站或飯店附近簡單用餐。','Kyoto Station']
],foodArea:'宇治奈良'},
{date:'7/27',day:'D3',title:'清水寺 × 京都車站購物',sub:'早上經典京都，午後改為有冷氣的親子與百貨行程。',mood:'舒適度 ★★★★☆',metrics:['早起避暑','室內午後','伊勢丹'],stops:[
['07:30','🚕','前往清水寺','建議搭計程車，節省上坡體力。','Kiyomizu-dera'],
['08:00','🏯','清水寺','清晨人潮較少，停留 75–90 分鐘。','Kiyomizu-dera'],
['09:30','📷','三年坂・二年坂・八坂塔','一路慢走拍照，中途找甜點休息。','Sannenzaka Kyoto'],
['11:30','🍽️','祇園／東山午餐','可選湯豆腐、蕎麥麵或親子友善餐廳。','Gion Kyoto'],
['14:00','🐧','午後二選一','京都水族館較輕鬆；鐵道博物館適合喜歡火車的小朋友。','Kyoto Aquarium'],
['16:30','🏬','JR 京都伊勢丹','正式購物行程：B1 伴手禮、熟食與甜點，累了可直接在館內吃晚餐。','JR Kyoto Isetan'],
['18:00','🛍️','京都 Porta 地下街','順路逛街與用餐；3COINS Porta 僅列補充，不必特別去。','Kyoto Porta']
],foodArea:'京都車站'},
{date:'7/28',day:'D4',title:'USJ 親子任務日',sub:'預設 09:00 入園，以 17:10 任天堂世界時段為核心。',mood:'舒適度 ★★★☆☆',metrics:['09:00 入園','快通 2 項','晚宿機場'],usj:true,stops:[
['07:15','🧳','京都飯店退房','大行李盡量精簡，確認前往 USJ 與晚間飯店方式。','Daiwa Roynet Hotel Kyoto Shijo Karasuma'],
['09:00','🌍','USJ 入園','不衝極限，先看 USJ App 等候時間再選設施。','Universal Studios Japan'],
['09:20','🎢','上午自由玩','優先沒有快速通關、孩子也想玩的設施。','Universal Studios Japan'],
['11:30','🍔','提早午餐','避開 12:00–14:00 尖峰，餐廳候選請看美食頁。','Universal Studios Japan'],
['13:00','🪄','哈利波特／親子園區','依體力選擇哈利波特、小小兵、Snoopy 或芝麻街。','The Wizarding World of Harry Potter Japan'],
['15:30','🦈','JAWS 快速通關','無指定時間，可依當日動線在 15:30 左右使用；也可移到晚上。','JAWS Universal Studios Japan'],
['16:35','🍄','前往任天堂世界入口','不要壓線，預留上廁所與移動時間。','Super Nintendo World Japan'],
['17:10','🏎️','瑪利歐賽車 Express','指定時段 17:10–17:40。','Mario Kart Koopa Challenge'],
['17:40','🛤️','咚奇剛瘋狂礦車 Express','指定時段 17:40–18:10。','Donkey Kong Country USJ'],
['18:10','🌙','任天堂世界夜景','拍照、購物；耀西視等候時間與孩子體力決定。','Super Nintendo World Japan'],
['19:30','🚆','前往機場飯店','入住 Odysis Suites Osaka Airport Hotel。','Odysis Suites Osaka Airport Hotel']
],foodArea:'USJ'},
{date:'7/29',day:'D5',title:'關西機場・平安回台',sub:'早上不排景點，保留充足報到與移動時間。',mood:'舒適度 ★★★★★',metrics:['BR177','11:10 起飛','輕鬆收尾'],stops:[
['07:00','☀️','早餐與最後整理','確認護照、退稅品、充電器與伴手禮。','Odysis Suites Osaka Airport Hotel'],
['08:15','🏨','退房前往 KIX','預留接駁與航廈移動時間。','Kansai International Airport'],
['09:00','🛫','報到・托運・安檢','完成後再買最後伴手禮。','Kansai International Airport'],
['11:10','🇹🇼','BR177 返回台灣','旅程完成，平安回家。','Kansai International Airport']
],foodArea:'關西機場'}];

const prepGroups=[
['證件與票券',['護照與護照影本','電子機票截圖','飯店訂房憑證','旅遊保險資料','USJ 入園門票 QR Code','Express Pass QR Code','重要資料分享給同行家人']],
['手機與交通',['安裝並登入 USJ App','下載 Google Maps 離線地圖','完成 eSIM 設定','確認 ICOCA／交通卡','行動電源充滿電','飯店與景點加入收藏']],
['親子與行李',['兒童常備藥','體溫計','防曬用品','小風扇與冰毛巾','雨具','替換衣物','水壺與簡單零食']],
['最後確認',['確認 BR178：7/25 06:30','設定起床鬧鐘','確認前往機場交通','確認行李重量','護照放入隨身包','手機／相機／行動電源充電']]
];
const restaurants=[
{area:'河原町',name:'錦市場小吃巡禮',type:'快速吃',budget:'¥800–1,500',queue:'彈性',kid:'親子友善',desc:'第一天剛抵達，最彈性的選擇；看到想吃的就少量分食。',map:'Nishiki Market Kyoto'},
{area:'河原町',name:'名代豬排 勝牛（河原町周邊）',type:'日式',budget:'¥1,500–2,500',queue:'中',kid:'可',desc:'炸牛排份量好掌握，適合逛街後快速吃正餐。',map:'Gyukatsu Kyoto Katsugyu Kawaramachi'},
{area:'河原町',name:'京極かねよ',type:'京都特色',budget:'¥2,500–4,000',queue:'偏高',kid:'可',desc:'鰻魚飯老店，想吃特色且願意等候時再選。',map:'Kyogoku Kane-yo Kyoto'},
{area:'河原町',name:'京都高島屋餐廳樓層',type:'不想排隊',budget:'¥1,500–3,000',queue:'低～中',kid:'親子友善',desc:'選擇多、有冷氣、有洗手間，孩子累時最穩。',map:'Kyoto Takashimaya Restaurant'},
{area:'宇治奈良',name:'中村藤吉本店',type:'抹茶',budget:'¥1,500–2,500',queue:'偏高',kid:'可',desc:'宇治代表性抹茶餐點；熱門時可只買甜點或伴手禮。',map:'Nakamura Tokichi Honten Uji'},
{area:'宇治奈良',name:'伊藤久右衛門 JR宇治站前店',type:'抹茶',budget:'¥1,200–2,500',queue:'中',kid:'親子友善',desc:'離車站近，行程彈性高，抹茶餐與甜點都有。',map:'Itoh Kyuemon JR Uji Station'},
{area:'宇治奈良',name:'志津香 釜飯',type:'奈良特色',budget:'¥1,500–2,500',queue:'偏高',kid:'可',desc:'奈良經典釜飯，等待時間長時不必勉強。',map:'Kamameshi Shizuka Nara Park'},
{area:'宇治奈良',name:'奈良公園周邊蕎麥麵／烏龍麵',type:'快速吃',budget:'¥900–1,500',queue:'低～中',kid:'親子友善',desc:'想保留餵鹿時間時，選這類最有效率。',map:'udon near Nara Park'},
{area:'京都車站',name:'奧丹清水',type:'京都特色',budget:'¥3,000–5,000',queue:'中',kid:'可',desc:'傳統湯豆腐，適合想安排一餐京都感。',map:'Okutan Kiyomizu Kyoto'},
{area:'京都車站',name:'京都拉麵小路',type:'快速吃',budget:'¥1,000–1,800',queue:'中',kid:'可',desc:'伊勢丹樓上，選擇多；可依現場隊伍決定。',map:'Kyoto Ramen Koji'},
{area:'京都車站',name:'JR 京都伊勢丹餐廳街',type:'不想排隊',budget:'¥1,500–3,500',queue:'低～中',kid:'親子友善',desc:'購物後直接吃最省力，也方便找兒童餐具。',map:'JR Kyoto Isetan Restaurant'},
{area:'京都車站',name:'Porta 地下街餐廳',type:'平價',budget:'¥1,000–2,000',queue:'低～中',kid:'親子友善',desc:'雨天、炎熱或想快速回飯店時的穩定選擇。',map:'Kyoto Porta Restaurant'},
{area:'USJ',name:'Studio Stars Restaurant',type:'親子友善',budget:'¥1,500–2,500',queue:'中',kid:'親子友善',desc:'座位與餐點選擇相對穩定，適合提早午餐。',map:'Studio Stars Restaurant USJ'},
{area:'USJ',name:'Snoopy Backlot Cafe',type:'親子友善',budget:'¥1,200–2,000',queue:'中',kid:'很適合',desc:'小朋友接受度高，搭配親子園區動線。',map:'Snoopy Backlot Cafe USJ'},
{area:'USJ',name:'Mel’s Drive-In',type:'快速吃',budget:'¥1,500–2,500',queue:'中',kid:'可',desc:'漢堡類，快速補充體力，行程好控制。',map:'Mels Drive-In USJ'},
{area:'USJ',name:'Universal CityWalk 晚餐',type:'離園後',budget:'¥1,200–3,000',queue:'中',kid:'親子友善',desc:'若園內沒吃飽再選；但晚間還要前往機場飯店，避免拖太晚。',map:'Universal CityWalk Osaka restaurants'},
{area:'關西機場',name:'關西機場航廈餐廳',type:'快速吃',budget:'¥1,000–2,500',queue:'低～中',kid:'親子友善',desc:'完成報到與安檢後再視時間決定。',map:'Kansai Airport restaurants'}];
const mainShopping=[
{name:'3COINS +plus 河原町 OPA 店',day:'Day 1｜必逛',desc:'錦市場、新京極後順路前往；本次唯一排入正式行程的 3COINS。',map:'3COINS +plus 河原町OPA店'},
{name:'京都高島屋 S.C.／T8',day:'Day 1｜正式行程',desc:'Nintendo KYOTO、角色周邊、百貨與美食集中，適合第一天購物。',map:'Kyoto Takashimaya S.C.'},
{name:'JR 京都伊勢丹',day:'Day 3｜正式行程',desc:'京都站直通；重點逛 B1 甜點、熟食與伴手禮，也可直接用餐。',map:'JR Kyoto Isetan'},
{name:'京都 Porta 地下街',day:'Day 3｜正式行程',desc:'有冷氣、交通方便，當作伊勢丹後的彈性購物與晚餐區。',map:'Kyoto Porta'}];
const optionalShopping=[
['3COINS 京都 Porta 店','Day 3 已在附近，但不必特地去'],['Loft 京都','Day 1 河原町周邊，喜歡文具再加'],['Hands 京都','河原町周邊補充選項'],['Standard Products／DAISO','看當下需求再逛'],['Pokémon Center KYOTO','對角色有興趣再安排'],['Universal CityWalk 商店','USJ 離園後還有體力才逛']];
const phrases=[['我要內用','店内で食べます。'],['請給我兒童餐具','子供用の食器をお願いします。'],['不需要袋子','袋はいりません。'],['洗手間在哪裡？','トイレはどこですか？'],['可以少冰嗎？','氷を少なめにできますか？'],['小孩不能吃辣','子供は辛いものが食べられません。'],['請問還要等多久？','あとどれくらい待ちますか？'],['可以刷卡嗎？','クレジットカードは使えますか？']];

function renderOverview(){qs('#overviewCards').innerHTML=days.map(d=>`<button class="overview-card" data-go="itinerary" data-dayjump="${d.day}"><span class="date-pill">${d.date} ${d.day}</span><h3>${d.title}</h3><p>${d.sub}</p></button>`).join('')}
function renderPrep(){qs('#prepGroups').innerHTML=prepGroups.map((g,gi)=>`<div class="task-group"><h3>${g[0]}</h3>${g[1].map((x,i)=>`<label class="check-row"><input type="checkbox" class="prep-check" data-key="prep-${gi}-${i}"><span>${x}</span></label>`).join('')}</div>`).join('');const saved=store.get('prep',{});qsa('.prep-check').forEach(c=>{c.checked=!!saved[c.dataset.key];c.onchange=()=>{saved[c.dataset.key]=c.checked;store.set('prep',saved);updatePrep()}});updatePrep()}
function updatePrep(){const all=qsa('.prep-check'),done=all.filter(x=>x.checked).length,p=Math.round(done/all.length*100)||0;qs('#prepPercent').textContent=p+'%';qs('#prepBar').style.width=p+'%';qs('#prepRemain').textContent=p===100?'全部完成，可以安心出發！':`還有 ${all.length-done} 項任務未完成`}
let currentDay=0;
function renderDays(){qs('#dayTabs').innerHTML=days.map((d,i)=>`<button class="day-tab ${i===currentDay?'active':''}" data-day="${i}"><small>${d.date}</small><b>${d.day}</b></button>`).join('');qsa('.day-tab').forEach(b=>b.onclick=()=>{currentDay=+b.dataset.day;renderDays();renderDay()});renderDay()}
function renderDay(){const d=days[currentDay];let mission='';if(d.usj){const saved=store.get('missions',{});const items=[['mario','瑪利歐賽車 17:10'],['dk','咚奇剛礦車 17:40'],['jaws','JAWS（彈性）'],['hp','哈利波特園區'],['night','任天堂世界夜景']];mission=`<div class="mission-card"><div class="mission-head"><div><span class="mini-label">USJ QUEST</span><h3>今日任務</h3></div><b id="missionPct">0%</b></div><div class="progress"><span id="missionBar"></span></div><div class="mission-list">${items.map(([k,n])=>`<label><input type="checkbox" class="mission-check" data-key="${k}" ${saved[k]?'checked':''}>${n}</label>`).join('')}</div></div>`}
qs('#dayContent').innerHTML=`<div class="day-header"><span class="kicker">${d.date} · ${d.day}</span><h2>${d.title}</h2><p>${d.sub}</p><div class="day-metrics">${d.metrics.map(x=>`<div class="metric"><small>TRIP NOTE</small><b>${x}</b></div>`).join('')}</div><div class="comfort">🌿 ${d.mood}</div></div>${mission}<div class="timeline">${d.stops.map(s=>`<div class="stop"><time>${s[0]}</time><div class="dot">${s[1]}</div><div class="stop-card"><h3>${s[2]}</h3><p>${s[3]}</p><a class="map-btn" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s[4])}">Google Maps</a></div></div>`).join('')}</div><div class="food-inline"><div class="food-inline-head"><div><span class="kicker">MEAL OPTIONS</span><h3>${d.foodArea}餐廳候選</h3></div><button class="text-btn" data-go="food" data-filter="${d.foodArea}">查看清單 →</button></div></div>`;
qsa('[data-go]',qs('#dayContent')).forEach(bindGo);qsa('.mission-check').forEach(c=>c.onchange=()=>{const m=store.get('missions',{});m[c.dataset.key]=c.checked;store.set('missions',m);updateMissions()});updateMissions()}
function updateMissions(){const all=qsa('.mission-check');if(!all.length)return;const done=all.filter(x=>x.checked).length,p=Math.round(done/all.length*100);qs('#missionPct').textContent=p+'%';qs('#missionBar').style.width=p+'%'}
let foodFilter='全部';
function renderFood(){const areas=['全部','河原町','宇治奈良','京都車站','USJ','關西機場'];qs('#foodFilters').innerHTML=areas.map(a=>`<button class="filter-chip ${a===foodFilter?'active':''}" data-area="${a}">${a}</button>`).join('');qsa('.filter-chip').forEach(b=>b.onclick=()=>{foodFilter=b.dataset.area;renderFood()});const fav=store.get('foodFav',{});const list=restaurants.filter(r=>foodFilter==='全部'||r.area===foodFilter);qs('#foodList').innerHTML=list.map((r,i)=>`<article class="restaurant-card"><div class="restaurant-top"><div><span class="badge">${r.area} · ${r.type}</span><h3>${r.name}</h3></div><button class="favorite-btn ${fav[r.name]?'active':''}" data-fav="${r.name}">♥</button></div><p>${r.desc}</p><div class="restaurant-meta"><span>💴 ${r.budget}</span><span>⏳ ${r.queue}</span><span>👧 ${r.kid}</span></div><a class="map-btn" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.map)}">查看地圖</a></article>`).join('');qsa('[data-fav]').forEach(b=>b.onclick=()=>{fav[b.dataset.fav]=!fav[b.dataset.fav];store.set('foodFav',fav);renderFood();toast(fav[b.dataset.fav]?'已加入收藏':'已取消收藏')})}
function renderShopping(){qs('#mainShopping').innerHTML=mainShopping.map(s=>`<article class="shop-card"><div class="shop-top"><div><span class="badge">${s.day}</span><h3>${s.name}</h3></div></div><p>${s.desc}</p><a class="map-btn" target="_blank" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.map)}">導航</a></article>`).join('');qs('#optionalShopping').innerHTML=optionalShopping.map(x=>`<div class="mini-item"><b>${x[0]}</b><small>${x[1]}</small></div>`).join('')}
function renderPhrases(){qs('#phraseList').innerHTML=phrases.map(x=>`<button class="phrase" data-copy="${x[1]}">${x[0]}<small>${x[1]}</small></button>`).join('')}
function renderBudget(){const arr=store.get('budget',[]);qs('#budgetTotal').textContent=arr.reduce((s,x)=>s+x.amount,0).toLocaleString();qs('#budgetList').innerHTML=arr.map((x,i)=>`<div class="budget-row"><div><b>${x.item}</b><small>${x.cat}</small></div><div><b>¥${x.amount.toLocaleString()}</b><button data-del="${i}">刪除</button></div></div>`).join('');qsa('[data-del]').forEach(b=>b.onclick=()=>{arr.splice(+b.dataset.del,1);store.set('budget',arr);renderBudget()})}
function bindGo(el){el.onclick=()=>{const target=el.dataset.go;if(el.dataset.filter)foodFilter=el.dataset.filter;if(el.dataset.dayjump){currentDay=days.findIndex(d=>d.day===el.dataset.dayjump);renderDays()}showView(target)}}
function showView(name){qsa('.view').forEach(v=>v.classList.toggle('active',v.id===`view-${name}`));qsa('.nav-item').forEach(n=>n.classList.toggle('active',n.dataset.go===name||(name==='prepare'&&n.dataset.go==='more')||(['emergency','info','budget','phrases'].includes(name)&&n.dataset.go==='more')));if(name==='food')renderFood();if(name==='budget')renderBudget();window.scrollTo({top:name==='home'?0:430,behavior:'smooth'})}
function initCountdown(){const now=new Date(),trip=new Date('2026-07-25T06:30:00+08:00'),diff=Math.ceil((trip-now)/86400000);qs('#countdown').textContent=diff>0?`${diff} 天`:diff===0?'今天出發':'旅程中／已完成'}

renderOverview();renderPrep();renderDays();renderFood();renderShopping();renderPhrases();renderBudget();initCountdown();
qsa('[data-go]').forEach(bindGo);
qsa('[data-copy]').forEach(b=>b.onclick=async()=>{await navigator.clipboard?.writeText(b.dataset.copy);toast('已複製日文')});
qs('#budgetForm').onsubmit=e=>{e.preventDefault();const arr=store.get('budget',[]);arr.push({item:qs('#budgetItem').value.trim(),amount:+qs('#budgetAmount').value,cat:qs('#budgetCategory').value});store.set('budget',arr);e.target.reset();renderBudget();toast('已加入記帳')};
const dark=store.get('dark',false);document.body.classList.toggle('dark',dark);qs('#themeBtn').textContent=dark?'☀':'☾';qs('#themeBtn').onclick=()=>{document.body.classList.toggle('dark');const d=document.body.classList.contains('dark');store.set('dark',d);qs('#themeBtn').textContent=d?'☀':'☾'};
if('serviceWorker' in navigator)window.addEventListener('load',()=>navigator.serviceWorker.register('./sw.js'));
