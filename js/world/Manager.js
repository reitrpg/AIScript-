/**
 * World Creator
 * World Effect System
 */


import eventBus from "../core/eventBus.js";



class WorldManager {


constructor(){


this.current=null;


}



init(){



}



createWorld(){



const rarityTable=[


{

name:"Normal",

multiplier:1,

effects:1,

pool:[

"豊かな森",

"肥沃な大地"

]

},



{

name:"Rare",

multiplier:1.5,

effects:1,

pool:[

"豊かな森",

"鉱脈の大地",

"肥沃な大地"

]

},



{

name:"Epic",

multiplier:2.5,

effects:2,

pool:[

"鉱脈の大地",

"魔力循環",

"古代遺跡"

]

},



{

name:"Legend",

multiplier:5,

effects:2,

pool:[

"魔力循環",

"神代遺構",

"星の祝福"

]

},



{

name:"Mythic",

multiplier:10,

effects:3,

pool:[

"世界樹の核",

"創世の力",

"星海の加護"

]

}



];



const rarity=

rarityTable[

Math.floor(

Math.random()

*

rarityTable.length

)

];



this.current={


name:

this.createName(),


rarity:

rarity.name,


rarityMultiplier:

rarity.multiplier,


level:1,


exp:0,


rebirthCount:0,


rebirthMultiplier:1,


resources:

this.createResources(),


effects:

this.createEffects(

rarity.pool,

rarity.effects

)


};



eventBus.emit(

"world:created",

this.current

);



}



createName(){


const names=[


"アステリア",

"エルドラ",

"ネヴァリス",

"オルビス",

"ミストラ",

"アルカディア"


];


return names[

Math.floor(

Math.random()

*

names.length

)

];


}



createResources(){


const list=[


"wood",

"stone",

"food",

"mana",

"ore",

"crystal"

];



const result={};



const count=

2+

Math.floor(

Math.random()*3

);



while(

Object.keys(result).length

<count

){


const id=

list[

Math.floor(

Math.random()

*

list.length

)

];



result[id]={


base:

1+

Math.floor(

Math.random()*10

)


};



}



return result;


}



createEffects(pool,count){


const result=[];



while(

result.length<count

){


const effect=

pool[

Math.floor(

Math.random()

*

pool.length

)

];



if(

!result.includes(effect)

){


result.push(effect);


}


}



return result;


}



getCurrent(){


return this.current;


}



}



export default new World