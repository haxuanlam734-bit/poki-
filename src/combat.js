import {dist,angle} from './math.js';
export class Combat{
 constructor(g){this.g=g}
 hitCircle(x,y,r,dmg,color,label){const g=this.g;let hit=0;for(const e of g.enemies){if(e.dead)continue;if(Math.hypot(e.x-x,e.y-y)<r+e.r){e.damage(dmg,g);hit++;g.vfx.spark(e.x,e.y,color,20,240);g.vfx.label(e.x,e.y-35,`-${dmg}`,color)}}return hit}
 cast(k){
  const g=this.g,h=g.hero;if(g.cool[k]>0||h.mana<g.skills[k].cost)return;
  h.mana-=g.skills[k].cost;g.cool[k]=g.skills[k].cd;
  if(k==='Q'){const a=h.rot;g.vfx.slash(h.x,h.y,a,'#58efff',1.2);g.vfx.slash(h.x,h.y,a+.25,'#b46cff',.9);g.vfx.spark(h.x,h.y,'#61f5ff',35,360);g.shake=.18;this.hitCircle(h.x+Math.cos(a)*150,h.y+Math.sin(a)*150,100,14,'#66eeff','STAR')}
  if(k==='E'){h.vx=Math.cos(h.rot)*950;h.vy=Math.sin(h.rot)*950;g.vfx.beam(h.x,h.y,h.rot,'#ff4cbb',380);g.vfx.ring(h.x,h.y,'#ff68d2',130);g.shake=.25;setTimeout(()=>this.hitCircle(h.x,h.y,135,22,'#ff68d2','RUSH'),90)}
  if(k==='R'){g.vfx.ring(h.x,h.y,'#8b6cff',430);g.vfx.ring(h.x,h.y,'#3ceeff',280);g.vfx.spark(h.x,h.y,'#9b6cff',100,520);g.shake=.55;this.hitCircle(h.x,h.y,430,34,'#a46cff','VOID NOVA')}
  if(k==='F'){for(let i=0;i<12;i++)setTimeout(()=>{let a=i*Math.PI*2/12;g.vfx.beam(h.x,h.y,a,'#ffd75e',500);this.hitCircle(h.x+Math.cos(a)*210,h.y+Math.sin(a)*210,90,18,'#ffd75e','CELESTIAL')},i*35);g.vfx.ring(h.x,h.y,'#fff08a',500);g.shake=.8}
  if(k==='T'){for(let i=0;i<28;i++){let a=i*Math.PI*2/28,r=80+i*9;g.vfx.spark(h.x+Math.cos(a)*r,h.y+Math.sin(a)*r,i%2?'#ff4da6':'#5beaff',8,180)}g.vfx.ring(h.x,h.y,'#ff4da6',330);this.hitCircle(h.x,h.y,330,27,'#ff4da6','CHROMA');g.shake=.45}
 }
}