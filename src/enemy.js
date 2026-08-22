export class Enemy{
 constructor(x,elite,wave){this.x=x;this.y=493;this.vx=0;this.face=-1;this.elite=elite;this.max=elite?190+wave*9:62+wave*8;this.hp=this.max;this.atk=40+Math.random()*50;this.anim=Math.random()*20}
 update(player,vfx){this.anim++;this.atk--;let d=player.x-this.x;if(Math.abs(d)>78)this.vx+=(d>0?.13:-.13);else if(this.atk<=0){this.atk=65+Math.random()*35;player.hit(this.elite?14:7)}this.face=d>=0?1:-1;this.x+=this.vx;this.vx*=.9}
 damage(n){this.hp-=n}
}
