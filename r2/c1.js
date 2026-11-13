/* 후보 1 인터랙션: 컬러 면이 다가오며 전폭으로 펼쳐짐 + 공정 칩 순차 채움 */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.flow').forEach(function(ol){[].forEach.call(ol.children,function(li,i){li.style.setProperty('--i',i);});});
  HY.inview('.biz-card',{margin:'0px 0px -25% 0px'});
  HY.progress('.tone:not(.hero)');
});
