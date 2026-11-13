/* 공통: 모바일 메뉴, 모션 감소 감지, 화면 진입 감지 */
(function(){
  var d=document, root=d.documentElement;
  root.classList.add('js');
  var rm=window.matchMedia('(prefers-reduced-motion: reduce)');
  window.HY={reduced:rm.matches};
  if(rm.matches) root.classList.add('reduced');
  rm.addEventListener&&rm.addEventListener('change',function(e){window.HY.reduced=e.matches;root.classList.toggle('reduced',e.matches);});

  var btn=d.querySelector('.menu-btn'), dlg=d.getElementById('mmenu');
  if(btn&&dlg&&dlg.showModal){
    btn.addEventListener('click',function(){dlg.showModal();btn.setAttribute('aria-expanded','true');});
    dlg.addEventListener('close',function(){btn.setAttribute('aria-expanded','false');btn.focus();});
    dlg.querySelector('[data-close]').addEventListener('click',function(){dlg.close();});
    dlg.addEventListener('click',function(e){if(e.target===dlg)dlg.close();});
  }

  /* 진입 시 .is-in — 내용은 처음부터 보이고, 움직임만 덧붙인다 */
  window.HY.inview=function(sel,opts){
    var els=d.querySelectorAll(sel); if(!els.length) return;
    if(!('IntersectionObserver' in window)){els.forEach(function(e){e.classList.add('is-in');});return;}
    var io=new IntersectionObserver(function(ents){ents.forEach(function(en){if(en.isIntersecting){en.target.classList.add('is-in');if(!(opts&&opts.repeat))io.unobserve(en.target);}else if(opts&&opts.repeat){en.target.classList.remove('is-in');}});},{rootMargin:(opts&&opts.margin)||'0px 0px -12% 0px',threshold:(opts&&opts.threshold)||0});
    els.forEach(function(e){io.observe(e);});
  };
  /* 스크롤 진행값(0~1)을 요소에 --p 로 전달 — 고정·강제 스크롤 없이 */
  window.HY.progress=function(sel){
    var els=[].slice.call(d.querySelectorAll(sel)); if(!els.length||window.HY.reduced) return;
    var tick=false;
    function upd(){tick=false;var vh=window.innerHeight;els.forEach(function(el){var r=el.getBoundingClientRect();var p=(vh-r.top)/(vh+r.height);el.style.setProperty('--p',Math.max(0,Math.min(1,p)).toFixed(3));});}
    window.addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd);}},{passive:true});
    window.addEventListener('resize',upd); upd();
  };
})();
