import {Game} from "./game.js";
import {Poki} from "./poki.js";
const boot=document.getElementById("boot"),hud=document.getElementById("hud"),start=document.getElementById("startBtn");
const game=new Game(document.getElementById("game"));
start.onclick=async()=>{await Poki.init();boot.classList.add("hidden");hud.classList.remove("hidden");game.start()};
