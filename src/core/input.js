export class Input{
constructor(){
 this.k={left:0,right:0,jump:0,attack:0,dash:0,q:0,e:0,r:0};
 addEventListener("keydown",e=>{if(["Space","ArrowUp","ArrowLeft","ArrowRight"].includes(e.code))e.preventDefault();this.down(e.code)});
 addEventListener("keyup",e=>this.up(e.code));
 document.querySelectorAll("[data-k]").forEach(b=>{let k=b.dataset.k;b.onpointerdown=e=>{e.preventDefault();this.k[k]=1};b.onpointerup=()=>this.k[k]=0;b.onpointercancel=()=>this.k[k]=0});
}
down(c){const m={KeyA:"left",ArrowLeft:"left",KeyD:"right",ArrowRight:"right",KeyW:"jump",ArrowUp:"jump",Space:"attack",ShiftLeft:"dash",ShiftRight:"dash",KeyQ:"q",KeyE:"e",KeyR:"r"};if(m[c])this.k[m[c]]=1}
up(c){const m={KeyA:"left",ArrowLeft:"left",KeyD:"right",ArrowRight:"right",KeyW:"jump",ArrowUp:"jump",Space:"attack",ShiftLeft:"dash",ShiftRight:"dash",KeyQ:"q",KeyE:"e",KeyR:"r"};if(m[c])this.k[m[c]]=0}
consume(k){const x=this.k[k];this.k[k]=0;return x}
}