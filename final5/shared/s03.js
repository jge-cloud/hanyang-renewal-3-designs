/* R3 후보 3: 부품 선택 → 사진·이름·설명·구조가 함께 바뀜, 레일 이동 버튼과 방향키, 구조 탭 */
document.addEventListener('DOMContentLoaded',function(){
  var stage=document.querySelector('.stage'), im=document.getElementById('st-img');
  var f={name:'st-name',type:'st-type',desc:'st-desc',struct:'st-struct'};
  var ln=document.getElementById('st-link'), pos=document.getElementById('rail-pos');
  var list=document.querySelector('.thumbs'), btns=[].slice.call(list.querySelectorAll('.thumb'));
  var prev=document.querySelector('.nav.prev'), next=document.querySelector('.nav.next');
  function pick(b,focus){
    var i=btns.indexOf(b); btns.forEach(function(x){x.setAttribute('aria-pressed',x===b?'true':'false');x.tabIndex=x===b?0:-1;});
    pos.textContent=i+1; if(focus) b.focus();
    b.scrollIntoView({block:'nearest',inline:'nearest',behavior:HY.reduced?'auto':'smooth'});
    var d=b.dataset, apply=function(){im.src=d.src;im.width=d.w;im.height=d.h;im.alt=d.name+' 실제 제품 사진';
      for(var k in f) document.getElementById(f[k]).textContent=d[k];
      ln.href=d.href; ln.textContent=d.type+' 상세';
      document.querySelectorAll('.mini').forEach(function(m){m.hidden=m.dataset.type!==d.type;});
      stage.classList.remove('swap');};
    if(HY.reduced){apply();} else {stage.classList.add('swap');setTimeout(apply,160);}
  }
  btns.forEach(function(b,i){b.tabIndex=b.getAttribute('aria-pressed')==='true'?0:-1;
    b.addEventListener('click',function(){pick(b);});
    b.addEventListener('keydown',function(e){var n=null;if(e.key==='ArrowRight')n=btns[Math.min(btns.length-1,i+1)];if(e.key==='ArrowLeft')n=btns[Math.max(0,i-1)];if(e.key==='Home')n=btns[0];if(e.key==='End')n=btns[btns.length-1];if(n){e.preventDefault();pick(n,true);}});});
  function upd(){prev.disabled=list.scrollLeft<4;next.disabled=list.scrollLeft+list.clientWidth>=list.scrollWidth-4;}
  prev.addEventListener('click',function(){list.scrollBy({left:-list.clientWidth,behavior:HY.reduced?'auto':'smooth'});});
  next.addEventListener('click',function(){list.scrollBy({left:list.clientWidth,behavior:HY.reduced?'auto':'smooth'});});
  list.addEventListener('scroll',upd,{passive:true}); addEventListener('resize',upd); upd();

  var tabs=[].slice.call(document.querySelectorAll('[role=tab]'));
  function sel(t){tabs.forEach(function(x){var on=x===t;x.setAttribute('aria-selected',on);x.tabIndex=on?0:-1;document.getElementById(x.getAttribute('aria-controls')).hidden=!on;});t.focus();}
  tabs.forEach(function(t,i){t.addEventListener('click',function(){sel(t);});t.addEventListener('keydown',function(e){var n=null;if(e.key==='ArrowRight')n=tabs[(i+1)%tabs.length];if(e.key==='ArrowLeft')n=tabs[(i-1+tabs.length)%tabs.length];if(n){e.preventDefault();sel(n);}});});
});
