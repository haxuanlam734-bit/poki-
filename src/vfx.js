export class VFX{
 constructor(ctx){this.ctx=ctx;this.p=[];this.fx=[]}
 burst(x,y,color="#67e8ff",n=20,power=8){for(let i=0;i<n;i++){let a=Math.random()*Math.PI*2,s=Math.random()*power+2;this.p.push({x,y,vx:Math.cos(a)*s,vy:Math.sin(a)*s,l:20+Math.random()*35,max:55,size:2+Math.random()*5,color})}}
 ring(x,y,color="#67e8ff",r=20){this.fx.push({type:"ring",x,y,r,color,l:24})}
 slash(x,y,face=1,color="#67e8ff",big=false){this.fx.push({type:big?"mega":"slash",x,y,face,color,l:22})}
 trail(x,y,color="#8b5cf6"){this.fx.push({type:"trail",x,y,color,l:16})}
 update(){for(const p of this.p){p.x+=p.vx;p.y+=p.vy;p.vy+=.16;p.vx*=.97;p.l--}this.p=this.p.filter(p=>p.l>0);for(const f of this.fx)f.l--;this.fx=this.fx.filter(f=>f.l>0)}
 draw(){let c=this.ctx;c.save();for(const p of this.p){c.globalAlpha=Math.max(0,p.l/p.max);c.fillStyle=p.color;c.shadowBlur=10;c.shadowColor=p.color;c.fillRect(p.x,p.y,p.size,p.size)}for(const f of this.fx){let a=Math.max(0,f.l/22);c.globalAlpha=a;c.strokeStyle=f.color;c.shadowBlur=22;c.shadowColor=f.color;c.lineCap="round";if(f.type==="ring"){c.lineWidth=7;c.beginPath();c.arc(f.x,f.y,f.r+(24-f.l)*5,0,Math.PI*2);c.stroke()}else if(f.type==="slash"){c.lineWidth=9;c.beginPath();c.arc(f.x,f.y,58,-1.1,.75);c.stroke()}else if(f.type==="mega"){c.lineWidth=16;c.beginPath();c.arc(f.x,f.y,125,-1.2,1);c.stroke();c.lineWidth=4;c.beginPath();c.arc(f.x,f.y,155,0,Math.PI*2);c.stroke()}else{c.lineWidth=10;c.beginPath();c.moveTo(f.x,f.y);c.lineTo(f.x-f.l*6,f.y+20);c.stroke()}}c.restore()}
}
