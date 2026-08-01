import Resource from "./Resource.js";


class ResourceManager{


constructor(){

this.resources={};

this.initialized=false;


}



init(){

if(this.initialized){

return;

}


this.create(
"wood",
"Wood"
);


this.create(
"stone",
"Stone"
);


this.create(
"food",
"Food"
);


this.create(
"mana",
"Mana"
);



this.resources.wood
.setProduction(1);


this.resources.stone
.setProduction(1);



this.initialized=true;


}



create(id,name){

this.resources[id]=

new Resource(
id,
name
);

}



add(id,value){

if(this.resources[id]){

this.resources[id]
.add(value);

}

}



get(id){

return this.resources[id];

}



getAll(){

return this.resources;

}



update(){

Object.values(
this.resources
)
.forEach(

resource=>
resource.update()

);


}



toJSON(){

const data={};


for(
const id in this.resources
){

data[id]=

this.resources[id]
.toJSON();

}


return data;

}



load(data){

if(!data){

return;

}


for(
const id in data
){

if(this.resources[id]){

this.resources[id]
.load(
data[id]
);

}

}


}



}



const manager=

new ResourceManager();


export default manager;