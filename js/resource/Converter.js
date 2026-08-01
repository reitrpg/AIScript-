import ResourceManager from "./Manager.js";


class Converter{


constructor(){

this.recipes={};


this.register();

}



register(){

this.recipes={


food:{

input:"wood",

cost:2,

output:1

},


mana:{

input:"stone",

cost:5,

output:1

}


};


}



tick(){

for(
const id in this.recipes
){

const recipe=

this.recipes[id];



const input=

ResourceManager.get(
recipe.input
);



if(
input.amount>=recipe.cost
){

input.remove(
recipe.cost
);


ResourceManager.add(
id,
recipe.output
);


}

}


}



}



const converter=

new Converter();


export default converter;