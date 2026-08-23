import { Game } from './game.js';
const canvas=document.getElementById('game');
const game=new Game(canvas);
document.getElementById('play').onclick=()=>{document.getElementById('menu').style.display='none';game.start()};
document.getElementById('pause').onclick=()=>game.togglePause();
document.querySelectorAll('#skills button').forEach(b=>b.onclick=()=>game.cast(b.dataset.skill));
addEventListener('keydown',e=>{
  const k=e.key.toUpperCase();
  if(['Q','E','R','F','T'].includes(k)) game.cast(k);
  if(e.code==='Space') game.dash();
  if(['W','A','S','D','ARROWUP','ARROWDOWN','ARROWLEFT','ARROWRIGHT'].includes(k)) game.input(k,true);
});
addEventListener('keyup',e=>{
  const k=e.key.toUpperCase();
  if(['W','A','S','D','ARROWUP','ARROWDOWN','ARROWLEFT','ARROWRIGHT'].includes(k)) game.input(k,false);
});
