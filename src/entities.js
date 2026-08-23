import {rand,dist,norm} from "./math.js";
export class Enemy{
  constructor(x,y,type=0){this.x=x;this.y=y;this.type=type;this.r=type?27:23;this.hp=type?85:55;this.maxHp=this.hp;this.dead=false;this.hit=0;this.vx=0;this.vy=0;this.tint=type?"#ff5b8e":"#ff314f"}
  update(dt,p){
    const d=dist(this,p),n=norm(p.x-this.x,p.y-this.y);
    if(d>100){this.vx+=n.x*90*dt;this.vy+=n.y*90*dt}
    this.vx*=Math.pow(.86,dt*60);this.vy*=Math.pow(.86,dt*60);this.x+=this.vx*dt;this.y+=this.vy*dt;this.hit=Math.max(0,this.hit-dt)
  }
  hurt(d,kx,ky){this.hp-=d;this.vx+=kx;this.vy+=ky;this.hit=.12;if(this.hp<=0)this.dead=true}
  draw(ctx){
    ctx.save();ctx.translate(this.x,this.y);ctx.shadowColor=this.tint;ctx.shadowBlur=this.hit?35:12;
    ctx.strokeStyle=this.hit?"#fff":this.tint;ctx.lineWidth=8;ctx.lineCap="round";
    ctx.beginPath();ctx.arc(0,-28,this.r*.55,0,Math.PI*2);ctx.stroke();
    ctx.beginPath();ctx.moveTo(0,-5);ctx.lineTo(0,34);ctx.moveTo(0,6);ctx.lineTo(-24,20);ctx.moveTo(0,6);ctx.lineTo(24,20);ctx.moveTo(0,34);ctx.lineTo(-20,58);ctx.moveTo(0,34);ctx.lineTo(20,58);ctx.stroke();
    ctx.restore()
  }
}
export class Player{
  constructor(){this.x=0;this.y=0;this.r=25;this.hp=120;this.energy=100;this.facing=1;this.inv=0;this.dash=0;this.after=[]}
  update(dt,input){
    let x=(input.d?1:0)-(input.a?1:0),y=(input.s?1:0)-(input.w?1:0);const n=norm(x,y);
    if(x||y){this.x+=n.x*280*dt;this.y+=n.y*280*dt;this.facing=n.x<0?-1:1}
    this.inv=Math.max(0,this.inv-dt);this.energy=Math.min(100,this.energy+10*dt);
    this.after=this.after.filter(a=>(a.life-=dt)>0)
  }
  draw(ctx){
    for(const a of this.after){ctx.save();ctx.globalAlpha=a.life*.45;this._drawBody(ctx,a.x,a.y,"#35a9ff");ctx.restore()}
    ctx.save();this._drawBody(ctx,this.x,this.y,"#67eaff");ctx.restore()
  }
  _drawBody(ctx,x,y,c){ctx.translate(x,y);ctx.shadowColor=c;ctx.shadowBlur=28;ctx.strokeStyle=c;ctx.lineWidth=9;ctx.lineCap="round";ctx.beginPath();ctx.arc(0,-31,15,0,Math.PI*2);ctx.stroke();ctx.beginPath();ctx.moveTo(0,-15);ctx.lineTo(0,30);ctx.moveTo(0,0);ctx.lineTo(-25,17);ctx.moveTo(0,0);ctx.lineTo(27,15);ctx.moveTo(0,30);ctx.lineTo(-20,58);ctx.moveTo(0,30);ctx.lineTo(20,58);ctx.stroke();ctx.fillStyle="#fff";ctx.beginPath();ctx.arc(-5,-34,2,0,Math.PI*2);ctx.arc(5,-34,2,0,Math.PI*2);ctx.fill()}
}
