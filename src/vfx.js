import {rand,unit} from './math.js';
export class VFX{
 constructor(){this.p=[];this.slashes=[];this.rings=[];this.beams=[];this.text=[];this.trails=[]}
 spark(x,y,color,n=24,power=260){for(let i=0;i<n;i++){let a=rand(0,Math.PI*2),s=rand(power*.2,power),life=rand(.25,.75);this.p.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,life,max:life,color,size:rand(1,4)})}}
 slash(x,y,a,color='#67efff',scale=1){this.slashes.push({x,y,a,color,t:0,scale})}
 ring(x,y,color='#62efff',max=160){this.rings.push({x,y,color,r:8,max,t:0})}
 beam(x,y,a,color='#ff4ca0',len=420){this.beams.push({x,y,a,color,len,t:0})}
 label(x,y,s,color='#fff'){this.text.push({x,y,s,color,t:0})}
 update(dt){for(const q of [this.p,this.slashes,this.rings,this.beams,this.text])for(let i=q.length-1;i>=0;i--){q[i].t+=dt;if(q[i].t>(q[i].life||.55))q.splice(i,1)}
  for(const q of this.p){q.x+=q.vx*dt;q.y+=q.vy*dt;q.vx*=.97;q.vy*=.97}
 }
 draw(c){
  c.save();c.globalCompositeOperation='lighter';
  for(const q of this.p){let a=1-q.life?0:0;c.globalAlpha=Math.max(0,1-q.t/q.max);c.fillStyle=q.color;c.shadowBlur=16;c.shadowColor=q.color;c.beginPath();c.arc(q.x,q.y,q.size,0,7);c.fill()}
  for(const q of this.rings){let p=q.t/.55;c.globalAlpha=1-p;c.strokeStyle=q.color;c.shadowBlur=30;c.shadowColor=q.color;c.lineWidth=7;c.beginPath();c.arc(q.x,q.y,q.r+(q.max-q.r)*p,0,7);c.stroke()}
  for(const q of this.slashes){let p=Math.min(1,q.t/.35),len=260*q.scale;c.save();c.translate(q.x,q.y);c.rotate(q.a);c.globalAlpha=1-p;c.strokeStyle=q.color;c.shadowColor=q.color;c.shadowBlur=30;c.lineWidth=18*(1-p)+3;c.beginPath();c.moveTo(-len*.55,-len*.08);c.quadraticCurveTo(0,-len*.25,len*.55,len*.08);c.stroke();c.restore()}
  for(const q of this.beams){let p=Math.min(1,q.t/.5);c.save();c.translate(q.x,q.y);c.rotate(q.a);c.globalAlpha=1-p;c.shadowColor=q.color;c.shadowBlur=45;c.strokeStyle=q.color;c.lineWidth=40*(1-p)+5;c.beginPath();c.moveTo(0,0);c.lineTo(q.len*(1-p*.25),0);c.stroke();c.restore()}
  c.globalCompositeOperation='source-over';
  for(const q of this.text){c.globalAlpha=1-q.t/.55;c.fillStyle=q.color;c.font='900 20px system-ui';c.textAlign='center';c.fillText(q.s,q.x,q.y-q.t*55)}
  c.restore();
 }
}