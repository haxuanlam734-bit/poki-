import {rand,clamp} from './math.js';
export class Fighter{
 constructor(x,y,enemy=false){this.x=x;this.y=y;this.enemy=enemy;this.r=enemy?25:22;this.hp=enemy?42:100;this.maxHp=this.hp;this.vx=0;this.vy=0;this.hit=0;this.flash=0;this.rot=0;this.dead=false;this.ai=rand(0,10)}
 update(dt,g){
  this.hit=Math.max(0,this.hit-dt);this.flash=Math.max(0,this.flash-dt);
  if(this.enemy){
   const dx=g.hero.x-this.x,dy=g.hero.y-this.y,d=Math.hypot(dx,dy)||1;
   if(d>105){this.vx+=dx/d*260*dt;this.vy+=dy/d*260*dt}
   this.vx*=Math.pow(.02,dt);this.vy*=Math.pow(.02,dt);this.x+=this.vx*dt;this.y+=this.vy*dt;
   this.rot=Math.atan2(dy,dx);
   if(d<70&&Math.random()<dt*.8)g.damageHero(5);
  }else{
   this.x+=this.vx*dt;this.y+=this.vy*dt;this.vx*=Math.pow(.0005,dt);this.vy*=Math.pow(.0005,dt);
   this.x=clamp(this.x,40,g.w-40);this.y=clamp(this.y,120,g.h-90);
  }
 }
 damage(n,g){if(this.dead)return;this.hp-=n;this.flash=.12;this.hit=.18;if(this.hp<=0){this.hp=0;this.dead=true;g.kill(this)}}
 draw(c){
  c.save();c.translate(this.x,this.y);c.rotate(this.rot);
  const glow=this.enemy?'#ff4f8b':'#5beaff';
  c.shadowBlur=this.flash?35:22;c.shadowColor=glow;c.strokeStyle=glow;c.fillStyle=this.enemy?'#ff789e':'#8ef3ff';c.lineWidth=7;c.lineCap='round';
  c.beginPath();c.arc(0,-25,14,0,Math.PI*2);c.stroke();
  c.beginPath();c.moveTo(0,-10);c.lineTo(0,24);c.moveTo(0,0);c.lineTo(-25,12);c.moveTo(0,0);c.lineTo(25,12);c.moveTo(0,24);c.lineTo(-17,49);c.moveTo(0,24);c.lineTo(17,49);c.stroke();
  c.globalAlpha=.25;c.fillStyle=glow;c.beginPath();c.arc(0,8,38,0,Math.PI*2);c.fill();
  c.restore();
 }
}