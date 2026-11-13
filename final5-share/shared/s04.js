/* R3 후보 4: 원료→소재→부품이 차례로 이어지고, 공정 진행선이 스크롤 위치만큼 채워짐(고정 없음) */
document.addEventListener('DOMContentLoaded',function(){
  HY.inview('.chain',{margin:'0px 0px -10% 0px'});
  var steps=document.querySelector('.steps'), items=[].slice.call(document.querySelectorAll('.step'));
  if(HY.reduced){items.forEach(function(s){s.classList.add('on');});return;}
  steps.style.setProperty('--fill',0); var tick=false;
  function upd(){tick=false;var vh=innerHeight,r=steps.getBoundingClientRect();var p=Math.max(0,Math.min(1,(vh*0.85-r.top)/(r.height+vh*0.2)));
    steps.style.setProperty('--fill',p.toFixed(3));items.forEach(function(s,i){s.classList.toggle('on',p>=i/items.length+0.02||p>0.98);});}
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd);}},{passive:true}); addEventListener('resize',upd); upd();
});
document.addEventListener('DOMContentLoaded',function(){ HY.inview('.fo-ring',{margin:'0px 0px -15% 0px'}); });
