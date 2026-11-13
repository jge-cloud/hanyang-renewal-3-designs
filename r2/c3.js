/* 후보 3 인터랙션: 실제 부품 선택 → 무대 교체와 NPS 종류 연결, 단면 층 강조, 종류 탭(방향키 지원) */
document.addEventListener('DOMContentLoaded',function(){
  var stage=document.querySelector('.stage'), im=document.getElementById('stage-img');
  var nm=document.getElementById('st-name'), ty=document.getElementById('st-type'), stc=document.getElementById('st-struct'), ln=document.getElementById('st-link');
  var btns=[].slice.call(document.querySelectorAll('.thumb'));
  function pick(b){
    btns.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');});
    var apply=function(){im.src=b.dataset.src;im.width=Math.round(b.dataset.w*1.7);im.height=Math.round(b.dataset.h*1.7);im.alt=b.dataset.name+' 실제 제품 사진';nm.textContent=b.dataset.name;ty.textContent=b.dataset.type;stc.textContent=b.dataset.struct;ln.href=b.dataset.href;ln.textContent=b.dataset.type+' 상세';stage.classList.remove('swap');};
    if(HY.reduced){apply();return;}
    stage.classList.add('swap'); setTimeout(apply,180);
  }
  btns.forEach(function(b){b.addEventListener('click',function(){pick(b);});});

  var fig=document.querySelector('.ana-fig');
  document.querySelectorAll('[data-layer]').forEach(function(b){
    function on(){fig.className='ana-fig hl-'+b.dataset.layer;}
    function off(){if(b.getAttribute('aria-pressed')!=='true')fig.className='ana-fig';}
    b.addEventListener('mouseenter',on);b.addEventListener('focus',on);b.addEventListener('mouseleave',off);b.addEventListener('blur',off);
    b.addEventListener('click',function(){var p=b.getAttribute('aria-pressed')==='true';document.querySelectorAll('[data-layer]').forEach(function(x){x.setAttribute('aria-pressed','false');});b.setAttribute('aria-pressed',p?'false':'true');p?fig.className='ana-fig':on();});
  });

  var tabs=[].slice.call(document.querySelectorAll('[role=tab]'));
  function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on;});t.focus();}
  tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t);});t.addEventListener('keydown',function(e){var k=e.key,n=null;if(k==='ArrowRight')n=tabs[(i+1)%tabs.length];if(k==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];if(k==='Home')n=tabs[0];if(k==='End')n=tabs[tabs.length-1];if(n){e.preventDefault();sel(n);}});});
});
