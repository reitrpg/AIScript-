/**
 * World Creator
 * UI Rebirth Integration
 */


import eventBus from "../core/eventBus.js";

import WorldManager from "../world/Manager.js";



class UI {


constructor(){

this.root=null;

}



init(id){


this.root=document.getElementById(id);


if(!this.root){

return;

}


this.render();

this.bind();

this.update();


}



render(){


this.root.innerHTML=`

<h1>
World Creator
</h1>


<section id="world-info">

</section>


<section id="rebirth-info">

</section>


<button id="create-world">
Create World
</button>


<button id="rebirth-world">
Rebirth
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

"rebirth-world"

)

.onclick=()=>{


const world=

WorldManager.getCurrent();



if(!world){

return;

}



if(

confirm(

"この世界を転生しますか？\n現在Lv："+

world.level

)

){


WorldManager.rebirth();



this.update();


}



};



eventBus.on(

"world:update",

()=>{


this.update();


}

);



eventBus.on(

"world:created",

()=>{


this.update();


}

);



eventBus.on(

"world:rebirth",

()=>{


this.update();


}

);



}



update(){


this.updateWorld();


this.updateRebirth();


}



updateWorld(){


const area=

document.getElementById(

"world-info"

);



if(!area){

return;

}



const world=

WorldManager.getCurrent();



if(!world){


area.textContent=

"No World";


return;


}



area.innerHTML=`

<h2>
World
</h2>


名前：
${world.name}

<br>


レアリティ：
${world.rarity}

<br>


Lv：
${world.level}

<br>


EXP：
${world.exp}

/

${WorldManager.getNeedExp()}


<br>


転生回数：
${world.rebirthCount}

回


<br>


転生倍率：
${world.rebirthMultiplier.toFixed(2)}
倍


<br><br>


素材産出種類


<br>


${this.renderResource(world)}


<br>


固有効果


<br>


${

world.effects.length

?

world.effects.join("<br>")

:

"なし"

}

`;



}



renderResource(world){


let text="";


for(

const id in world.resources

){


text +=

id

+

" : "

+

world.resources[id].base

+

"<br>";


}



return text;


}



updateRebirth(){


const area=

document.getElementById(

"rebirth-info"

);



if(!area){

return;

}



const world=

WorldManager.getCurrent();



if(!world){

area.textContent="";

return;

}



const next=

(

Math.pow(

world.level,

2

)

/

100

);



area.innerHTML=`

転生後倍率増加：

×

${next.toFixed(2)}

<br>

現在倍率：

×

${world.rebirthMultiplier.toFixed(2)}

<br>

転生後倍率：

×

${

(

world.rebirthMultiplier

*

next

)

.toFixed(2)

}

`;



}



}



export default new UI();