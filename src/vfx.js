import {rand, easeOutCubic} from "./math.js";

export class VFX{
  constructor(){this.items=[]}
  add(o){this.items.push({life:o.life||.5,max:o.life||.5,...o});return o}
  particle(x,y,c,size=4,life=.5,vx=0,vy=0){return this.add({type:"p",x,y,c,size,life,vx,vy,drag:.92})}
  burst(x,y,c,n=25,power=300){for(let i=0;i<n;i++){const a=Math.random()*Math.PI*2,s=rand(power*.25,power);this.particle(x,y,c,rand(1,5),rand(.25,.8),Math.cos(a)*s,Math.sin(a)*s)}}
  ring(x,y,c,r=40,life=.35,w=5){this.add({type:"ring",x,y,c,r,life,w})}
  slash(x,y,a,c,len=180,life=.28){this.add({type:"slash",x,y,a,c,len,life})}
  beam(x,y,a,c,len=600,life=.25){this.add({type:"beam",x,y,a,c,len,life})}
  shock(x,y,c,r=180,life=.4){this.add({type:"shock",x,y,c,r,life})}
  update(dt){
    for(const q of this.items){q.life-=dt;if(q.type==="p"){q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=Math.pow(q.drag,dt*60);q.vy*=Math.pow(q.drag,dt*60)}}
    this.items=this.items.filter(x=>x.life>0)
  }
  draw(ctx){
    ctx.save();ctx.globalCompositeOperation="lighter";
    for(const q of this.items){
      const t=Math.max(0,q.life/q.max),a=t*t;
      ctx.globalAlpha=a;
      if(q.type==="p"){ctx.fillStyle=q.c;ctx.shadowColor=q.c;ctx.shadowBlur=18;ctx.beginPath();ctx.arc(q.x,q.y,q.size*(.5+.5*t),0,Math.PI*2);ctx.fill()}
      if(q.type==="ring"){const p=1-t;ctx.strokeStyle=q.c;ctx.lineWidth=q.w*(t+.3);ctx.shadowColor=q.c;ctx.shadowBlur=30;ctx.beginPath();ctx.arc(q.x,q.y,q.r*(.5+.9*p),0,Math.PI*2);ctx.stroke()}
      if(q.type==="shock"){const p=easeOutCubic(1-t);ctx.strokeStyle=q.c;ctx.lineWidth=10*t;ctx.shadowColor=q.c;ctx.shadowBlur=40;ctx.beginPath();ctx.arc(q.x,q.y,q.r*p,0,Math.PI*2);ctx.stroke()}
      if(q.type==="slash"){const p=easeOutCubic(1-t),L=q.len*p;ctx.translate(q.x,q.y);ctx.rotate(q.a);ctx.strokeStyle=q.c;ctx.lineWidth=22*t;ctx.shadowColor=q.c;ctx.shadowBlur=40;ctx.beginPath();ctx.moveTo(-L*.55,0);ctx.quadraticCurveTo(0,-L*.25,L*.55,0);ctx.stroke();ctx.strokeStyle="#fff";ctx.lineWidth=4*t;ctx.beginPath();ctx.moveTo(-L*.5,-2);ctx.quadraticCurveTo(0,-L*.22,L*.5,0);ctx.stroke();ctx.setTransform(1,0,0,1,0,0)}
      if(q.type==="beam"){const L=q.len, w=26*t;ctx.translate(q.x,q.y);ctx.rotate(q.a);ctx.fillStyle=q.c;ctx.shadowColor=q.c;ctx.shadowBlur=55;ctx.fillRect(0,-w/2,L,w);ctx.fillStyle="#fff";ctx.fillRect(0,-w*.12,L,w*.24);ctx.restore();ctx.save();ctx.globalCompositeOperation="lighter";ctx.globalAlpha=a}
    }
    ctx.restore()
  }
}
