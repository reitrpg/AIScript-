import eventBus from "../core/eventBus.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";



class UI{


constructor(){

this.root=null;

}



init(id){


this.root=

document.getElementById(id);



this.render();


this.bind();


this.update();


}



render(){


this.root.innerHTML=`

<h1>
World Creator
</h1>


<div class="tabs">


<button id="world-tab">

World

</button>


<button id="resource-tab">

Resource

</button>


<button id="research-tab">

Research

</button>


</div>



<section class="panel">

<h2>
World
</h2>


<div id="world-info">

</div>


<button id="create-world">

Create World

</button>


</section>



<section class="panel">

<h2>
Resource
</h2>


<div id="resource-list">

</div>


</section>



<section class="panel">

<h2>
Research
</h2>


<div id="research-point">

</div>


<div id="research-list">

</div>


</section>



<button id="save-game">

Save

</button>


`;



}



bind(){


document

.getElementById(

"create-world"

)

.onclick=()=>{


eventBus.emit(

"world:create"

);


};



document

.getElementById(

"save-game"

)

.onclick=()=>{


eventBus.emit(

"game:save"

);


};



eventBus.on(

"game:update",

()=>{

this.update();

}

);



}



update(){


this.updateWorld();


this.updateResources();


}



updateWorld(){


const area=

document.getElementById(

"world-info"

);



const world=

WorldManager.getCurrent();



if(!world){

area.textContent=

"No World";

return;

}



area.innerHTML=

`

Level:${world.level}

<br>

Age:${world.age}

`;



}



updateResources(){


const area=

document.getElementById(

"resource-list"

);



area.innerHTML="";


const resources=

ResourceManager.getAll();



for(

const id in resources

){


const row=

document.create