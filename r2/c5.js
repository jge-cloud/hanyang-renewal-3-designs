/* 후보 5 인터랙션: 인덱스 목록 펼침(키보드·스크린리더 지원) + 데스크톱 마우스 위치를 따라오는 미리보기 이미지 */
document.addEventListener('DOMContentLoaded',function(){
  var items=[].slice.call(document.querySelectorAll('.ix'));
  items.forEach(function(li,i){
    var b=li.querySelector('button'), body=li.querySelector('.ix-body');
    body.hidden=i!==0; b.setAttribute('aria-expanded',i===0?'true':'false');
    b.addEventListener('click',function(){var open=b.getAttribute('aria-expanded')==='true';b.setAttribute('aria-expanded',!open);body.hidden=open;});
  });
  var fl=document.querySelector('.ix-float'); if(!fl||HY.reduced||!matchMedia('(hover:hover) and (min-width:1081px)').matches) return;
  var x=0,y=0,cx=0,cy=0,raf=null;
  function loop(){cx+=(x-cx)*.18;cy+=(y-cy)*.18;fl.style.transform='translate('+(cx+28)+'px,'+(cy-110)+'px)';raf=Math.abs(x-cx)+Math.abs(y-cy)>.5?requestAnimationFrame(loop):null;}
  items.forEach(function(li){
    li.addEventListener('mouseenter',function(){fl.src=li.dataset.preview;fl.classList.toggle('contain',/part-/.test(li.dataset.preview));fl.classList.add('show');});
    li.addEventListener('mouseleave',function(){fl.classList.remove('show');});
    li.addEventListener('mousemove',function(e){x=e.clientX;y=e.clientY;if(!raf)raf=requestAnimationFrame(loop);});
  });
});
