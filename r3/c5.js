/* R3 후보 5: 기본 설명은 펼쳐진 상태, '세부' 버튼으로 근거·링크를 펼침 + 데스크톱 미리보기, 적용 부위 목록↔도식 연동, 비교 막대 */
document.addEventListener('DOMContentLoaded',function(){
  document.querySelectorAll('.ix-btn').forEach(function(b){var m=document.getElementById(b.getAttribute('aria-controls'));
    b.addEventListener('click',function(){var o=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!o);m.hidden=o;});});
  HY.inview('.traits',{margin:'0px 0px -20% 0px'});
  var lis=[].slice.call(document.querySelectorAll('.wh-list li')), pts=[].slice.call(document.querySelectorAll('.car-svg .pt'));
  lis.forEach(function(li,i){li.tabIndex=0;function on(){lis.forEach(function(x,j){x.classList.toggle('on',j===i);});pts.forEach(function(p,j){p.classList.toggle('on',j===i);});}
    function off(){lis[i].classList.remove('on');pts[i].classList.remove('on');}
    li.addEventListener('mouseenter',on);li.addEventListener('focus',on);li.addEventListener('mouseleave',off);li.addEventListener('blur',off);});
  var fl=document.querySelector('.ix-float'); if(!fl||HY.reduced||!matchMedia('(hover:hover) and (min-width:1081px)').matches) return;
  var x=0,y=0,cx=0,cy=0,raf=null;
  function loop(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;fl.style.transform='translate('+(cx+28)+'px,'+(cy-100)+'px)';raf=Math.abs(x-cx)+Math.abs(y-cy)>.5?requestAnimationFrame(loop):null;}
  document.querySelectorAll('.ix').forEach(function(li){
    li.addEventListener('mouseenter',function(){fl.src=li.dataset.preview;fl.classList.add('show');});
    li.addEventListener('mouseleave',function(){fl.classList.remove('show');});
    li.addEventListener('mousemove',function(e){x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(loop);});
  });
});
