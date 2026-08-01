import game from "./game.js";

import ui from "../ui/UI.js";

import researchUI from "../ui/Research.js";

import tabs from "../ui/Tabs.js";

import router from "../ui/Router.js";



function start(){


ui.init(

"app"

);



researchUI.init();



tabs.init();


router.init();



game.init();


game.start();



}



if(

document.readyState==="loading"

){


document.addEventListener(

"DOMContentLoaded",

start

);


}else{


start();


}