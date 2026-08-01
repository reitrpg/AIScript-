import eventBus from "../core/eventBus.js";


class WorldManager{


constructor(){

this.current=null;

}



init(){

}



createWorld(){


this.current={


id:
Date.now(),


level:1,


age:0


};



eventBus.emit(

"world:created"

);


}



update(){


if(!this.current){

return;

}


this.current.age++;


}



getCurrent(){

return this.current;

}



toJSON(){

return this.current;

}



load(data){

this.current=data;


}



}



const worldManager=

new WorldManager();


eventBus.on(

"world:create",

()=>{

worldManager.createWorld();

}

);



export default worldManager;