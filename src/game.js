import {CONFIG} from "./config.js";
import {rand,clamp,dist} from "./math.js";
import {VFX} from "./vfx.js";
import {Player} from "./entities.js";
import {Enemy} from "./entities.js";
import {Combat} from "./combat.js";
import {Poki} from "./poki.js";

export class Game{
 constructor(canvas){
  this.c=canvas;this.ctx=canvas.getContext("2d");this.vfx=new VFX();this.player=new Player();this.enemies=[];
  this.combat=new Combat(this);this.input={};this.wave=1;this.spawn=0;this.combo=0;this.comboT=0;this.damage=[];this.shake=0;this.paused=false;this.time=0;
  this.cool={Q:0,E:0,R:0};this.bind();this.resize();addEventListener("resize",()=>this.resize())
 }
 bind(){
  addEventListener("keydown",e=>{this.input[e.key.toLowerCase()]=true;if(["q","e","r"," "].includes(e.key.toLowerCase()))e.preventDefault();if(e.key.toLowerCase()==="q")this.skill("Q");if(e.key.toLowerCase()==="e")this.skill("E");if(e.key.toLowerCase()==="r")this.skill("R");if(e.key===" ")this.combat.basic();});
  addEventListener("keyup",e=>this.input[e.key.toLowerCase()]=false);
  document.querySelectorAll("[data-skill]").forEach(b=>b.onclick=()=>this.skill(b.dataset.skill));
  document.getElementById("pauseBtn").onclick=()=>this.paused=!this.paused;
 }
 resize(){this.c.width=innerWidth*devicePixelRatio;this.c.height=innerHeight*devicePixelRatio;this.ctx.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);this.w=innerWidth;this.h=innerHeight}
 start(){this.running=true;this.last=performance.now();Poki.gameplayStart();requestAnimationFrame(t=>this.loop(t))}
 loop(t){if(!this.running)return;const dt=Math.min(.033,(t-this.last)/1000);this.last=t;if(!this.paused)this.update(dt);this.draw();requestAnimationFrame(x=>this.loop(x))}
 update(dt){
  this.time+=dt;this.cool.Q=Math.max(0,this.cool.Q-dt);this.cool.E=Math.max(0,this.cool.E-dt);this.cool.R=Math.max(0,this.cool.R-dt);
  this.player.update(dt,this.input);this.player.x=clamp(this.player.x,60,this.w-60);this.player.y=clamp(this.player.y,150,this.h-150);
  this.spawn-=dt;if(this.spawn<=0&&this.enemies.length<Math.min(3+this.wave,12)){this.spawn=CONFIG.arena.enemySpawn;this.spawnEnemy()}
  for(const e of this.enemies)e.update(dt,this.player);
  this.enemies=this.enemies.filter(e=>!e.dead);
  this.vfx.update(dt);this.comboT-=dt;if(this.comboT<=0)this.combo=0;this.damage=this.damage.filter(d=>(d.life-=dt)>0);this.shake=Math.max(0,this.shake-dt*45);
  if(this.enemies.length===0&&this.spawn>0&&this.wave<99){this.wave++;this.player.energy=Math.min(100,this.player.energy+20);this.spawn=.8;flash("WAVE "+this.wave)}
  document.getElementById("hpBar").style.width=(this.player.hp/120*100)+"%";document.getElementById("enBar").style.width=(this.player.energy/100*100)+"%";document.getElementById("wave").textContent=this.wave;document.getElementById("combo").textContent=this.combo;
  for(const k of ["Q","E","R"]){document.getElementById(k.toLowerCase()+"Cd").style.width=(this.cool[k]/CONFIG.skills[k].cooldown*100)+"%"}
 }
 spawnEnemy(){const side=Math.random()<.5?-1:1;this.enemies.push(new Enemy(side<0?-50:this.w+50,rand(220,this.h-190),Math.random()<.18?1:0))}
 skill(k){if(!this.running||this.paused)return;const s=CONFIG.skills[k];if(this.cool[k]>0||this.player.energy<s.cost)return;this.player.energy-=s.cost;this.cool[k]=s.cooldown;if(k==="Q")this.combat.Q();if(k==="E")this.combat.E();if(k==="R")this.combat.R();Poki.happyTime()}
 addDamage(x,y,d){this.damage.push({x,y,d,life:.7})}
 draw(){
  const ctx=this.ctx,w=this.w,h=this.h;ctx.clearRect(0,0,w,h);ctx.save();
  const sx=rand(-this.shake,this.shake),sy=rand(-this.shake,this.shake);ctx.translate(sx,sy);
  this.background(ctx,w,h);
  for(const e of this.enemies)this.drawEnemyHp(ctx,e);
  this.player.draw(ctx);for(const e of this.enemies)e.draw(ctx);this.vfx.draw(ctx);
  for(const d of this.damage){ctx.globalAlpha=d.life/.7;ctx.fillStyle="#fff";ctx.font="900 18px Arial";ctx.textAlign="center";ctx.fillText(d.d,d.x,d.y-(.7-d.life)*55)}
  ctx.restore()
 }
 background(ctx,w,h){
  const g=ctx.createRadialGradient(w*.5,h*.42,0,w*.5,h*.42,Math.max(w,h)*.7);g.addColorStop(0,"#14102d");g.addColorStop(.5,"#09091c");g.addColorStop(1,"#03040d");ctx.fillStyle=g;ctx.fillRect(0,0,w,h);
  // Three large concept-style colored circles
  const circles=[[.16,.43,180,"#29154d"],[.36,.43,170,"#111d47"],[.54,.43,175,"#32142e"],[.71,.43,185,"#36251d"],[.89,.43,200,"#10224a"]];
  for(const [x,y,r,c] of circles){ctx.globalAlpha=.58;ctx.fillStyle=c;ctx.beginPath();ctx.arc(w*x,h*y,r,0,Math.PI*2);ctx.fill()}ctx.globalAlpha=1;
  const horizon=h*.75;ctx.strokeStyle="#15213e";ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(0,horizon);ctx.lineTo(w,horizon);ctx.stroke();
  for(let x=-w;x<w*2;x+=CONFIG.arena.grid){ctx.beginPath();ctx.moveTo(w/2,horizon);ctx.lineTo(x,h);ctx.stroke()}
  for(let y=horizon;y<h;y+=30){ctx.globalAlpha=.55;ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(w,y);ctx.stroke()}ctx.globalAlpha=1;
 }
 drawEnemyHp(ctx,e){ctx.fillStyle="#ff5577";ctx.fillRect(e.x-25,e.y-70,50,4);ctx.fillStyle="#45f5c5";ctx.fillRect(e.x-25,e.y-70,50*Math.max(0,e.hp/e.maxHp),4)}
}
function flash(text){const m=document.getElementById("message");m.textContent=text;m.classList.remove("msg-show");void m.offsetWidth;m.classList.add("msg-show")}
