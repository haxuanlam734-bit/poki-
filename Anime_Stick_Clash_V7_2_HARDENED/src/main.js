import{FIGHTERS,SKILLS}from"./data/config.js";
import{load,save,daily}from"./core/save.js";
import{Poki}from"./core/poki.js";
import{Input}from"./core/input.js";
import{Camera}from"./systems/camera.js";
import{VFX}from"./systems/vfx.js";
import{Combat}from"./systems/combat.js";
import{World}from"./systems/world.js";
import{Player}from"./entities/player.js";
import{Renderer}from"./systems/renderer.js";
import{UI}from"./ui/ui.js";

const $=s=>document.querySelector(s);
const canvas=$("#game"),ctx=canvas.getContext("2d");
const data=load(),input=new Input(),cam=new Camera(),vfx=new VFX(),combat=new Combat(vfx,cam),renderer=new Renderer(),ui=new UI();
let mode="boot",player=null,world=null,selected=FIGHTERS[data.selected]?data.selected:"void",last=performance.now();

function resize(){
  const dpr=Math.min(devicePixelRatio||1,2);
  canvas.width=1280*dpr;canvas.height=720*dpr;
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
addEventListener("resize",resize);resize();

function renderFighters(){
  const box=$("#fighters");box.innerHTML="";
  for(const [id,f] of Object.entries(FIGHTERS)){
    const d=document.createElement("div");d.className="fighterItem";d.dataset.id=id;
    d.innerHTML=`<div class="avatar">${f.icon}</div><div><b>${f.name}</b><br><small>PRO FIGHTER</small></div>`;
    d.onclick=()=>{selected=id;data.selected=id;save(data);ui.fighter(id,f)};
    box.appendChild(d);
  }
  ui.fighter(selected,FIGHTERS[selected]);
}
function renderSkills(){
  let old=$("#skillbar");if(old)old.remove();
  const box=document.createElement("div");box.className="skillbar";box.id="skillbar";
  box.innerHTML=SKILLS.map(s=>`<button class="skill" data-id="${s.id}">
    <b>${s.icon}</b><small>${s.key}</small><span class="cool"></span></button>`).join("");
  $("#hud").appendChild(box);
  box.querySelectorAll(".skill").forEach(b=>b.onclick=()=>skill(b.dataset.id));
}
function skill(id){
  if(mode!=="game"||!player||!world)return;
  if(id==="m1")player.m1(world.enemies);
  else if(id==="dash")player.dash();
  else if(id==="crescent")player.crescent(world.enemies);
  else if(id==="nova")player.nova(world.enemies);
  else if(id==="breaker")player.breaker(world.enemies);
}
async function start(){
  await Poki.stop();
  $("#ad").classList.remove("hidden");await Poki.ad();$("#ad").classList.add("hidden");
  selected=FIGHTERS[selected]?selected:"void";
  player=new Player(vfx,combat,FIGHTERS[selected]);
  world=new World(vfx,combat);
  mode="game";$("#lobby").classList.add("hidden");$("#result").classList.add("hidden");$("#pausePanel").classList.add("hidden");$("#hud").classList.remove("hidden");
  Poki.start();ui.toast("FIGHT!");
}
async function revive(){
  if(mode!=="result")return;
  await Poki.stop();$("#ad").classList.remove("hidden");const ok=await Poki.reward();$("#ad").classList.add("hidden");
  if(ok){player.hp=100;player.energy=100;player.inv=90;mode="game";$("#result").classList.add("hidden");$("#hud").classList.remove("hidden");Poki.start();ui.toast("REVIVED");}
}
function lose(){
  mode="result";Poki.stop();$("#hud").classList.add("hidden");$("#result").classList.remove("hidden");
  $("#resultText").textContent=`Wave ${world.wave} • Score ${world.score}`;
  data.best=Math.max(data.best,world.wave);data.coins+=Math.floor(world.score/100);save(data);ui.coins(data.coins);
}
function pause(){
  if(mode==="game"){mode="pause";Poki.stop();$("#pausePanel").classList.remove("hidden")}
  else if(mode==="pause"){mode="game";$("#pausePanel").classList.add("hidden");Poki.start()}
}
function lobby(){
  mode="lobby";Poki.stop();$("#pausePanel").classList.add("hidden");$("#result").classList.add("hidden");$("#hud").classList.add("hidden");$("#lobby").classList.remove("hidden");
}
function update(){
  if(mode!=="game"||!player||!world)return;
  if(combat.tick())return;
  player.update(input,world.enemies);
  if(input.consume("attack"))skill("m1");
  if(input.consume("dash"))skill("dash");
  if(input.consume("q"))skill("crescent");
  if(input.consume("e"))skill("nova");
  if(input.consume("r"))skill("breaker");
  if(world.update(player)){data.coins+=30;save(data);ui.coins(data.coins);ui.toast("WAVE "+world.wave)}
  if(player.hp<=0)lose();
  ui.hud(player,world);
}
function draw(t){
  ctx.clearRect(0,0,1280,720);renderer.bg(ctx,t);
  if(player&&world){cam.follow(player);cam.begin(ctx);renderer.draw(ctx,player,world.enemies,FIGHTERS[selected]);vfx.draw(ctx);cam.end(ctx)}
  vfx.update();
}
function loop(t){update();draw(t);last=t;requestAnimationFrame(loop)}

$("#play").onclick=start;
$("#daily").onclick=()=>daily(data)?(ui.coins(data.coins),ui.toast("+250 DAILY")):ui.toast("DAILY CLAIMED");
$("#pause").onclick=pause;$("#resume").onclick=pause;$("#toLobby").onclick=lobby;$("#revive").onclick=revive;$("#retry").onclick=start;$("#resultLobby").onclick=lobby;

(async()=>{
  try{
    for(let i=0;i<=100;i+=5){$("#loader").style.width=i+"%";await new Promise(r=>setTimeout(r,8))}
    await Poki.init();Poki.load();renderFighters();renderSkills();ui.coins(data.coins);
    $("#boot").classList.add("hidden");$("#lobby").classList.remove("hidden");mode="lobby";
  }catch(err){
    console.error("Boot error:",err);
    $("#boot small").textContent="BOOT ERROR — CHECK CONSOLE";
  }
  requestAnimationFrame(loop);
})();