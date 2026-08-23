export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const lerp=(a,b,t)=>a+(b-a)*t;
export const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
export const rand=(a,b)=>a+Math.random()*(b-a);
export const pick=a=>a[(Math.random()*a.length)|0];
export function norm(x,y){const d=Math.hypot(x,y)||1;return{x:x/d,y:y/d}}
export function angle(a,b){return Math.atan2(b.y-a.y,b.x-a.x)}
export function easeOutCubic(t){return 1-Math.pow(1-t,3)}
export function easeInOut(t){return t<.5?2*t*t:1-Math.pow(-2*t+2,2)/2}
