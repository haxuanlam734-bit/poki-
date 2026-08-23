import {dist,norm,angle} from "./math.js";
export class Combat{
  constructor(game){this.g=game}
  hitEnemies(x,y,r,dmg,kb=260){
    for(const e of this.g.enemies){const dx=e.x-x,dy=e.y-y,dd=Math.hypot(dx,dy);if(dd<r+e.r){const n=norm(dx,dy);e.hurt(dmg,n.x*kb,n.y*kb);this.g.vfx.burst(e.x,e.y,"#fff",12,220);this.g.vfx.ring(e.x,e.y,"#ff4cff",25,.25,3);this.g.addDamage(e.x,e.y,-dmg);this.g.combo++}}
  }
  basic(){
    const p=this.g.player,a=p.facing>0?0:Math.PI;
    this.g.vfx.slash(p.x+p.facing*45,p.y-8,a,"#67eaff",145,.18);
    this.hitEnemies(p.x+p.facing*75,p.y,85,14,180)
  }
  Q(){
    const p=this.g.player,a=p.facing>0?0:Math.PI;
    this.g.vfx.slash(p.x+p.facing*100,p.y-15,a,"#d94cff",250,.32);
    this.g.vfx.beam(p.x+p.facing*10,p.y-10,a,"#c74cff",430,.18);
    this.g.vfx.shock(p.x+p.facing*260,p.y,"#d94cff",160,.35);
    this.g.vfx.burst(p.x+p.facing*360,p.y,"#f8a0ff",55,500);
    this.hitEnemies(p.x+p.facing*300,p.y,310,35,620)
  }
  E(){
    const p=this.g.player,a=p.facing>0?0:Math.PI;
    const ox=p.x,oy=p.y;p.inv=.45;
    for(let i=0;i<8;i++)p.after.push({x:ox+p.facing*i*35,y:oy,life:.32-i*.025});
    p.x+=p.facing*260;
    this.g.vfx.beam(ox,oy,a,"#38a9ff",280,.18);
    this.g.vfx.slash(p.x,p.y,a,"#4cc9ff",180,.25);
    this.g.vfx.shock(p.x,p.y,"#38a9ff",145,.3);
    this.g.vfx.burst(p.x,p.y,"#9cecff",65,450);
    this.hitEnemies((ox+p.x)/2,p.y,260,30,500)
  }
  R(){
    const p=this.g.player;
    this.g.shake=24;
    this.g.vfx.ring(p.x,p.y,"#ffbf32",180,.8,12);
    this.g.vfx.ring(p.x,p.y,"#ffd85a",270,1.0,7);
    this.g.vfx.shock(p.x,p.y,"#ffb51b",420,.9);
    this.g.vfx.burst(p.x,p.y,"#ffd35b",180,650);
    for(let i=0;i<18;i++){const a=i*Math.PI*2/18;this.g.vfx.beam(p.x+Math.cos(a)*80,p.y+Math.sin(a)*80,a,"#ffbf32",360,.45)}
    this.hitEnemies(p.x,p.y,480,48,850)
  }
}
