/* 시안 01: 첫 장면 안착·제목 줄 올림(CSS), 교차 이미지 열림, 부품 목록 이전·다음 */
document.addEventListener('DOMContentLoaded',function(){
  HY.progress('.feature');
  var list=document.querySelector('.strip'),wrap=document.querySelector('.strip-wrap'),prev=document.querySelector('.pbtn.prev'),next=document.querySelector('.pbtn.next'),pos=document.getElementById('ppos');
  if(!list) return; var items=[].slice.call(list.children);
  function step(){var a=items[0],b=items[1];return b?b.getBoundingClientRect().left-a.getBoundingClientRect().left:list.clientWidth;}
  function upd(){var st=step(),first=Math.round(list.scrollLeft/st),vis=Math.max(1,Math.floor((list.clientWidth+12)/st));
    var last=Math.min(items.length,first+vis);pos.textContent=(first+1)+(last>first+1?'–'+last:'');
    prev.disabled=list.scrollLeft<4;var end=list.scrollLeft+list.clientWidth>=list.scrollWidth-4;next.disabled=end;wrap.classList.toggle('end',end);}
  function go(d){list.scrollBy({left:d*step(),behavior:HY.reduced?'auto':'smooth'});}
  prev.addEventListener('click',function(){go(-1);});next.addEventListener('click',function(){go(1);});
  list.addEventListener('keydown',function(e){if(e.key==='ArrowRight'){e.preventDefault();go(1);}if(e.key==='ArrowLeft'){e.preventDefault();go(-1);}});
  list.addEventListener('scroll',function(){requestAnimationFrame(upd);},{passive:true});addEventListener('resize',upd);upd();
});
