/* 후보 4 인터랙션: 공정 진행선이 스크롤 위치만큼 채워지고 단계가 차례로 켜짐 (화면 고정 없음) */
document.addEventListener('DOMContentLoaded',function(){
  var steps=document.querySelector('.steps'), items=[].slice.call(document.querySelectorAll('.step'));
  if(!steps) return;
  if(HY.reduced){items.forEach(function(s){s.classList.add('on');});return;}
  steps.style.setProperty('--fill',0);
  var tick=false;
  function upd(){tick=false;var vh=innerHeight,r=steps.getBoundingClientRect();var p=Math.max(0,Math.min(1,(vh*0.8-r.top)/(r.height+vh*0.25)));
    steps.style.setProperty('--fill',p.toFixed(3));items.forEach(function(s,i){s.classList.toggle('on',p>=i/items.length+0.02||p>0.98);});}
  addEventListener('scroll',function(){if(!tick){tick=true;requestAnimationFrame(upd);}},{passive:true}); addEventListener('resize',upd); upd();
});
