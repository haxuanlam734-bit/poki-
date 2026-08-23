import {CFG} from './config.js';
import {Fighter} from './entities.js';
import {VFX} from './vfx.js';
import {Combat} from './combat.js';
import {rand,clamp,angle} from './math.js';
export class Game{
 constructor(c){this.c=c;this.x=c.getContext('2d');this.w=innerWidth;this.h=innerHeight;this.vfx=new VFX();this.skills=CFG.skills;this.cool={Q:0,E:0,R:0,F:0,T:0};this.keys={};this.enemies=[];this.running=false;this.paused=false;this.spawn=0;this.waveN=1;this.combo=0;this.comboT=0;this.shake=0;this.hero=new Fighter(this.w*.45,this.h*.58,false);this.hero.rot=0;this.combat=new Combat(this);this.resize();addEventListener('resize',()=>this.resize())}
 resize(){this.w=innerWidth;this.h=innerHeight;this.c.width=this.w*devicePixelRatio;this.c.height=this.h*devicePixelRatio;this.x.setTransform(devicePixelRatio,0,0,devicePixelRatio,0,0);this.w=innerWidth;this.h=innerHeight}
 start(){this.running=true;this.last=performance.now();requestAnimationFrame(t=>this.loop(t))}
 input(k,v){this.keys[k]=v}
 togglePause(){this.paused=!this.paused}
 dash(){if(this.hero.mana>=8){this.hero.mana-=8;this.hero.vx=Math.cos(this.hero.rot)*850;this.hero.vy=Math.sin(this.hero.rot)*850;this.vfx.spark(this.hero.x,this.hero.y,'#62efff',20,260)}}
 cast(k){if(this.running&&!this.paused)this.combat.cast(k)}
 spawnEnemy(){let side=Math.floor(rand(0,4)),x=side<2?rand(60,this.w-60):(side===2?30:this.w-30),y=side<2?(side?this.h-120:130):rand(150,this.h-120);this.enemies.push(new Fighter(x,y,true))}
 damageHero(n){this.hero.damage(n,this)}
 kill(e){this.combo++;this.comboT=2.5;this.vfx.spark(e.x,e.y,'#ff5b9f',45,390);this.vfx.ring(e.x,e.y,'#ff5b9f',120);this.hero.mana=clamp(this.hero.mana+5,0,100)}
 update(dt){
  if(this.paused)return;
  for(const k in this.cool)this.cool[k]=Math.max(0,this.cool[k]-dt);
  this.spawn-=dt;if(this.spawn<=0){this.spawn=Math.max(.35,CFG.spawnRate-this.waveN*.03);this.spawnEnemy()}
  this.hero.update(dt,this);for(const e of this.enemies)e.update(dt,this);
  this.enemies=this.enemies.filter(e=>!e.dead&&e.hp>0);
  this.hero.hp=clamp(this.hero.hp+dt*1.3,0,100);this.hero.mana=clamp(this.hero.mana+dt*5,0,100);
  this.comboT-=dt;if(this.comboT<=0)this.combo=0;
  if(this.enemies.length===0)this.waveN++;
  this.vfx.update(dt);this.shake=Math.max(0,this.shake-dt);
 }
 draw(){
  const c=this.x;c.clearRect(0,0,this.w,this.h);let sx=0,sy=0;if(this.shake){sx=rand(-1,1)*this.shake*22;sy=rand(-1,1)*this.shake*22}
  c.save();c.translate(sx,sy);this.background(c);for(const e of this.enemies)e.draw(c);this.hero.draw(c);this.vfx.draw(c);c.restore();
  document.getElementById('hp').style.width=this.hero.hp+'%';document.getElementById('mana').style.width=this.hero.mana+'%';document.getElementById('combo').textContent=this.combo+' HIT';document.getElementById('wave').textContent='WAVE '+this.waveN;
  for(const b of document.querySelectorAll('#skills button')){let q=this.cool[b.dataset.skill]||0;b.classList.toggle('cooldown',q>0)}
 }
 background(c){
  const g=c.createRadialGradient(this.w*.5,this.h*.48,30,this.w*.5,this.h*.48,this.w*.8);g.addColorStop(0,'#15173d');g.addColorStop(.5,'#090b20');g.addColorStop(1,'#02030b');c.fillStyle=g;c.fillRect(0,0,this.w,this.h);
  c.globalAlpha=.18;for(let i=0;i<18;i++){let x=(i/18)*this.w,y=this.h*.2+Math.sin(i)*80;c.fillStyle=i%2?'#5132a6':'#185ca8';c.beginPath();c.arc(x,y,120,0,7);c.fill()}c.globalAlpha=1;
  c.strokeStyle='rgba(73,125,220,.16)';c.lineWidth=1;for(let y=this.h*.72;y<this.h;y+=28){c.beginPath();c.moveTo(0,y);c.lineTo(this.w,y);c.stroke()}for(let x=-this.w;x<2*this.w;x+=70){c.beginPath();c.moveTo(this.w/2,this.h*.68);c.lineTo(x,this.h);c.stroke()}
 }
 loop(t){let dt=Math.min(.033,(t-this.last)/1000);this.last=t;if(this.running){this.update(dt);this.draw();requestAnimationFrame(x=>this.loop(x))}}
}