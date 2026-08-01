import eventBus from "./eventBus.js";

import time from "./time.js";

import save from "./save.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import ResearchManager from "../research/Manager.js";



class Game{


constructor(){

this.running=false;

}



init(){

ResourceManager.init();

WorldManager.init();

ResearchManager.init();


eventBus.on(

"time:tick",

()=>{

this.update();

}

);



eventBus.on(

"game:save",

()=>{

this.save();

}

);


}



start(){

if(this.running){

return;

}


this.running=true;

time.start();


}



update(){


ResourceManager.update();


ResearchManager.addPoint(1);


WorldManager.update();


eventBus.emit(

"game:update"

);


}



save(){


save.save({

resource:

ResourceManager.toJSON(),


world:

WorldManager.toJSON(),


research:

ResearchManager.toJSON(),


time:

time.toJSON()

});


}



load(){

const data=

save.load();


if(!data){

return;

}


ResourceManager.load(

data.resource

);


WorldManager.load(

data.world

);


ResearchManager.load(

data.research

);


time.load(

data.time

);


}



}



const game=new Game();


export default game;