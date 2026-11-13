(() => {
  const frame=document.querySelector('#preview'),links=[...document.querySelectorAll('[data-variant]')],standalone=document.querySelector('#standalone');
  const labels=['01 — 큰 이미지와 타이포그래피','02 — 제품과 소재 기술','03 — 개선 6 · 정보의 밀도와 흐름'];
  let routesReady=false,frameURL=frame.getAttribute('src');
  let routes=new Map([['home','메인 홈페이지']]),candidate=1,page='home',search='',hash='';
  fetch('/hanyang-renewal-3-designs/routes.json').then(r=>r.json()).then(data=>{routesReady=true;routes=new Map(data.pages.map(x=>[x.key,x.title]));loadURL(false)}).catch(()=>loadURL(false));
  function safePage(value){return /^[a-z0-9_-]+$/.test(value||'')?value:'home'}
  function locationURL(){const q=new URLSearchParams({v:String(candidate)});if(page!=='home')q.set('page',page);if(search)q.set('search',search);if(hash)q.set('hash',hash);return '/hanyang-renewal-3-designs/?'+q}
  function childURL(){return `/hanyang-renewal-3-designs/v${candidate}/${page}.html${search}${hash}`}
  function paint(navigate=true){links.forEach(a=>{const current=+a.dataset.variant===candidate;if(current)a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');const q=new URLSearchParams({v:a.dataset.variant,page});if(search)q.set('search',search);if(hash)q.set('hash',hash);a.href='/hanyang-renewal-3-designs/?'+q});standalone.href=childURL();frame.title=`후보 ${candidate} 홈페이지 미리보기`;document.querySelector('#direction-label').textContent=labels[candidate-1];document.querySelector('#current-page').textContent=routes.get(page)||page;if(navigate&&frameURL!==childURL()){frameURL=childURL();frame.contentWindow.location.replace(frameURL);}}
  function loadURL(navigate=true){const q=new URLSearchParams(location.search);candidate=[1,2,3].includes(+q.get('v'))?+q.get('v'):1;page=safePage(q.get('page'));if(routes.size>1&&!routes.has(page))page='home';search=q.get('search')||'';hash=q.get('hash')||'';if(search&&!search.startsWith('?'))search='';if(hash&&!hash.startsWith('#'))hash='';paint(navigate || frame.getAttribute('src')!==childURL())}
  links.forEach(link=>link.addEventListener('click',e=>{if(e.metaKey||e.ctrlKey||e.shiftKey)return;e.preventDefault();candidate=+link.dataset.variant;history.pushState(null,'',locationURL());paint()}));
  window.addEventListener('message',e=>{if(e.origin!==location.origin||e.source!==frame.contentWindow||e.data?.type!=='hanyang:location'||+e.data.candidate!==candidate)return;const next=safePage(e.data.page);if(routesReady&&!routes.has(next))return;page=next;search=typeof e.data.search==='string'?e.data.search:'';hash=typeof e.data.hash==='string'?e.data.hash:'';frameURL=childURL();history.replaceState(null,'',locationURL());paint(false)});
  window.addEventListener('popstate',()=>loadURL());loadURL(false);
})();
