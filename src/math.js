export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const angle=(a,b)=>Math.atan2(b.y-a.y,b.x-a.x);
export const rand=(a,b)=>a+Math.random()*(b-a);
export function unit(a){return{x:Math.cos(a),y:Math.sin(a)}}