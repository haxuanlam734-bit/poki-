const KEY="asc_pro_v7";
const DEFAULT={coins:1250,selected:"void",best:0,daily:""};
const VALID=["void","frost","flame","solar","aqua"];
export function load(){
  try{
    const raw=JSON.parse(localStorage.getItem(KEY)||"{}");
    const s={...DEFAULT,...raw};
    if(s.selected==="kai") s.selected="void";
    if(!VALID.includes(s.selected)) s.selected="void";
    if(!Number.isFinite(s.coins)) s.coins=DEFAULT.coins;
    if(!Number.isFinite(s.best)) s.best=0;
    if(typeof s.daily!=="string") s.daily="";
    return s;
  }catch{
    return {...DEFAULT};
  }
}
export function save(s){try{localStorage.setItem(KEY,JSON.stringify(s))}catch{}}
export function daily(s){
  const d=new Date().toISOString().slice(0,10);
  if(s.daily===d)return false;
  s.daily=d;s.coins+=250;save(s);return true;
}