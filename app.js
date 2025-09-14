/*
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import { ARABIC_LETTERS } from './data/letters.js';

// -------------------- i18n ----------------------------------------------
const I18N = {
  en:{
    learn:'Learn',practice:'Practice',progress:'Progress',
    joinsBoth:'joins both sides',joinsRightOnly:'right-joining only',
    mode:'Mode',identifyForm:'Identify by Form',chooseForm:'Choose Correct Form',audioLetter:'Audio → Letter',
    start:'Start',questions:'questions',correct:'Correct',reviewErrors:'Review errors',
    mastery:'Mastery',lastSeen:'Last seen',accuracy:'Accuracy',reset:'Reset progress',export:'Export',import:'Import'
  },
  ru:{
    learn:'Учить',practice:'Практика',progress:'Прогресс',
    joinsBoth:'соединяется с обеих сторон',joinsRightOnly:'только справа',
    mode:'Режим',identifyForm:'Опознай форму',chooseForm:'Выбери форму',audioLetter:'Звук → буква',
    start:'Старт',questions:'вопросов',correct:'Верно',reviewErrors:'Повторить ошибки',
    mastery:'Уровень',lastSeen:'Когда',accuracy:'Точность',reset:'Сбросить прогресс',export:'Экспорт',import:'Импорт'
  }
};
let lang = navigator.language && navigator.language.startsWith('ru') ? 'ru':'en';
const t = k=>I18N[lang][k]||k;

// -------------------- Storage -------------------------------------------
const STORAGE_KEY='arabic_trainer_v1';
function defaultStats(){return{mastery:0,ease:2.3,streak:0,lastSeen:0,correct:0,incorrect:0};}
let progress = JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
ARABIC_LETTERS.forEach(l=>{if(!progress[l.base]) progress[l.base]=defaultStats();});
const saveProgress=()=>localStorage.setItem(STORAGE_KEY,JSON.stringify(progress));

// -------------------- Speech service ------------------------------------
class SpeechService{
  constructor(){
    this.enabled='speechSynthesis' in window;
    if(this.enabled){
      const setVoice=()=>{this.voice=speechSynthesis.getVoices().find(v=>v.lang.startsWith('ar'))||null;};
      setVoice(); speechSynthesis.onvoiceschanged=setVoice;
    }
  }
  speak(text){ if(this.enabled && this.voice){ const u=new SpeechSynthesisUtterance(text); u.voice=this.voice; speechSynthesis.cancel(); speechSynthesis.speak(u);} }
}
const speech=new SpeechService();

// -------------------- Helpers -------------------------------------------
function highlight(word,letter){return word.replace(new RegExp(letter,'g'),'<mark>'+letter+'</mark>');}
function random(arr){return arr[Math.floor(Math.random()*arr.length)];}
function weightedRandom(){
  const total=ARABIC_LETTERS.reduce((s,l)=>s+(6-(progress[l.base].mastery||0)),0);
  let n=Math.random()*total;
  for(const l of ARABIC_LETTERS){const w=6-(progress[l.base].mastery||0); if((n-=w)<=0) return l;}
  return ARABIC_LETTERS[0];
}
function updateStats(letter, ok){const st=progress[letter.base]; if(ok){st.correct++;st.streak++;st.ease=Math.min(st.ease+0.1,3); if([3,7,15].includes(st.streak)) st.mastery=Math.min(st.mastery+1,5);} else {st.incorrect++;st.streak=0;st.ease=Math.max(st.ease-0.2,1.3); if(st.mastery>0) st.mastery--; } st.lastSeen=Date.now(); saveProgress();}
function shuffleOptions(options, correct){const set=new Set([correct]); while(set.size<4){set.add(random(options));} return Array.from(set).sort(()=>Math.random()-0.5);}

// -------------------- Router -------------------------------------------
const views={learn:document.getElementById('learn'),practice:document.getElementById('practice'),progress:document.getElementById('progress')};
const tabs=document.querySelectorAll('.tab');
function showView(id){Object.keys(views).forEach(k=>views[k].hidden=k!==id); tabs.forEach(t=>t.classList.toggle('active',t.dataset.tab===id));}
window.addEventListener('hashchange',()=>{const id=location.hash.replace('#','')||'learn'; showView(id); if(id==='learn') renderLearn(); if(id==='practice') renderPractice(); if(id==='progress') renderProgress();});

// -------------------- Learn --------------------------------------------
function renderLearn(){
  if(views.learn.dataset.ready) return;
  const grid=document.createElement('div'); grid.className='letters-grid';
  ARABIC_LETTERS.forEach(l=>{
    const card=document.createElement('div'); card.className='card';
    const forms=`<div class="forms-row" dir="rtl" lang="ar">${l.forms.isolated}${l.forms.initial}${l.forms.medial}${l.forms.final}</div>`;
    const badge=`<span class="badge">${l.joinsLeft? t('joinsBoth'):t('joinsRightOnly')}</span>`;
    const play=`<button class="play" data-letter="${l.name_ar}">▶</button>`;
    const samples=l.sample_words.map(w=>`<li><span dir="rtl" lang="ar">${highlight(w.ar,l.base)}</span> - ${w.en}</li>`).join('');
    card.innerHTML=`${forms}<h3 dir="rtl" lang="ar">${l.base} — ${l.name_ar} (${l.name_en}) ${play}</h3>${badge}<ul class="sample-words">${samples}</ul>`;
    grid.appendChild(card);
  });
  grid.addEventListener('click',e=>{if(e.target.classList.contains('play')) speech.speak(e.target.dataset.letter);});
  views.learn.appendChild(grid); views.learn.dataset.ready=1;
}

// -------------------- Practice -----------------------------------------
let session=null;
function renderPractice(){
  if(views.practice.dataset.ready) return;
  const cfg=document.createElement('div'); cfg.className='practice-config';
  cfg.innerHTML=`<label>${t('mode')}: <select id="mode-select"><option value="identify">${t('identifyForm')}</option><option value="choose">${t('chooseForm')}</option><option value="audio">${t('audioLetter')}</option></select></label>
  <label> ${t('questions')} <select id="len-select"><option value="10">10</option><option value="20">20</option><option value="30" selected>30</option></select></label>
  <button id="start-btn">${t('start')}</button>`;
  views.practice.appendChild(cfg);
  const qa=document.createElement('div'); qa.id='question-area'; views.practice.appendChild(qa);
  document.getElementById('start-btn').addEventListener('click',startSession);
  views.practice.dataset.ready=1;
}

function startSession(){
  session={mode:document.getElementById('mode-select').value,length:parseInt(document.getElementById('len-select').value,10),index:0,correct:0,mistakes:[]};
  nextQuestion();
}

function renderQuestion(prompt, options, correct, rtl, cb){
  const area=document.getElementById('question-area'); area.innerHTML='';
  const qEl=document.createElement('div'); qEl.className='question'; qEl.innerHTML=rtl?`<span dir="rtl" lang="ar">${prompt}</span>`:prompt; area.appendChild(qEl);
  const opts=document.createElement('div'); opts.className='options';
  options.forEach((opt,i)=>{const b=document.createElement('button'); b.innerHTML=rtl?`<span dir="rtl" lang="ar">${opt}</span>`:opt; b.dataset.val=opt; b.addEventListener('click',()=>choose(b)); b.accessKey=(i+1).toString(); opts.appendChild(b);});
  area.appendChild(opts);
  const bar=document.createElement('div'); bar.className='progress-bar'; bar.innerHTML='<span></span>'; area.appendChild(bar);
  const handle=e=>{if(e.key>='1'&&e.key<='4'){const btn=opts.children[e.key-1]; btn&&btn.click();}};
  document.addEventListener('keydown',handle);
  function choose(btn){ if(opts.dataset.lock) return; opts.dataset.lock=1; document.removeEventListener('keydown',handle); const val=btn.dataset.val; const ok=val===correct; cb(ok); Array.from(opts.children).forEach(b=>{if(b.dataset.val===correct) b.classList.add('correct'); if(b===btn && !ok) b.classList.add('wrong');}); setTimeout(nextQuestion,800); }
}


function nextQuestion(){
  if(session.index>=session.length){ return showSummary(); }
  const letter=weightedRandom();
  const positions=['isolated','initial','medial','final'];
  if(session.mode==='identify'){
    const pos=random(positions);
    const opts=shuffleOptions(ARABIC_LETTERS.map(l=>l.name_en),letter.name_en);
    renderQuestion(letter.forms[pos],opts,letter.name_en,true,ok=>{updateStats(letter,ok); if(ok) session.correct++; else session.mistakes.push(letter); session.index++; updateBar();});
  } else if(session.mode==='choose'){
    const pos=random(positions);
    const opts=shuffleOptions(positions.map(p=>letter.forms[p]),letter.forms[pos]);
    renderQuestion(`${letter.name_en} - ${pos}`,opts,letter.forms[pos],false,ok=>{updateStats(letter,ok); if(ok) session.correct++; else session.mistakes.push(letter); session.index++; updateBar();});
  } else {
    const opts=shuffleOptions(ARABIC_LETTERS.map(l=>l.base),letter.base);
    if(speech.enabled) speech.speak(letter.name_ar);
    renderQuestion('?',opts,letter.base,true,ok=>{updateStats(letter,ok); if(ok) session.correct++; else session.mistakes.push(letter); session.index++; updateBar();});
  }
}
function updateBar(){const bar=document.querySelector('.progress-bar span'); if(bar) bar.style.width=((session.index/session.length)*100)+'%';}

function showSummary(){
  const area=document.getElementById('question-area'); const acc=Math.round((session.correct/session.length)*100); const missed=[...new Set(session.mistakes.map(l=>l.base))];
  area.innerHTML=`<div class="summary"><p>${acc}% ${t('correct')}</p>${missed.length?`<button id="review-btn">${t('reviewErrors')}</button>`:''}</div>`;
  const btn=document.getElementById('review-btn'); if(btn){btn.onclick=()=>{session.queue=missed.map(b=>ARABIC_LETTERS.find(l=>l.base===b)); reviewNext();};}
}
function reviewNext(){
  const area=document.getElementById('question-area');
  if(!session.queue.length){ area.innerHTML='<p>'+t('correct')+'</p>'; return; }
  const letter=session.queue.shift();
  const opts=shuffleOptions(ARABIC_LETTERS.map(l=>l.base),letter.base);
  renderQuestion(letter.forms.isolated,opts,letter.base,true,ok=>{updateStats(letter,ok); if(!ok) session.queue.push(letter); reviewNext();});
}

// -------------------- Progress -----------------------------------------
function renderProgress(){
  const table=document.createElement('table'); table.className='table';
  table.innerHTML=`<tr><th>${t('practice')}</th><th>${t('mastery')}</th><th>${t('lastSeen')}</th><th>${t('accuracy')}</th></tr>`;
  ARABIC_LETTERS.forEach(l=>{const st=progress[l.base]; const acc=st.correct+st.incorrect?Math.round(st.correct/(st.correct+st.incorrect)*100):0; table.innerHTML+=`<tr><td dir="rtl" lang="ar">${l.base}</td><td>${st.mastery}</td><td>${st.lastSeen?new Date(st.lastSeen).toLocaleDateString():''}</td><td>${acc}%</td></tr>`;});
  views.progress.innerHTML=''; views.progress.appendChild(table);
  const ctrl=document.createElement('p'); ctrl.innerHTML=`<button id="reset-btn">${t('reset')}</button> <button id="export-btn">${t('export')}</button> <label style="margin-left:1rem">${t('import')} <input id="import-file" type="file" style="display:none"></label>`; views.progress.appendChild(ctrl);
  document.getElementById('reset-btn').onclick=()=>{if(confirm('Sure?')){progress={}; ARABIC_LETTERS.forEach(l=>progress[l.base]=defaultStats()); saveProgress(); renderProgress();}};
  document.getElementById('export-btn').onclick=()=>{const blob=new Blob([JSON.stringify(progress)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='arabic-progress.json'; a.click();};
  document.getElementById('import-file').addEventListener('change',e=>{const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{try{progress=JSON.parse(r.result); saveProgress(); renderProgress();}catch{alert('Invalid JSON');}}; r.readAsText(f);});
}

// -------------------- Language toggle ----------------------------------
const langToggle=document.getElementById('lang-toggle');
function updateLang(){langToggle.textContent=lang.toUpperCase();}
langToggle.addEventListener('click',()=>{lang=lang==='en'?'ru':'en'; updateLang(); showView(location.hash.replace('#','')||'learn'); if(location.hash==='#learn') renderLearn(); if(location.hash==='#practice') renderPractice(); if(location.hash==='#progress') renderProgress();});
updateLang();

// init
showView(location.hash.replace('#','')||'learn');
renderLearn();
