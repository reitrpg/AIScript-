class ResearchManager{


constructor(){

this.points=0;


this.data={

agriculture:{

name:"Agriculture",

cost:100,

unlocked:false

},


mining:{

name:"Mining",

cost:150,

unlocked:false

},


magic:{

name:"Magic",

cost:300,

unlocked:false

}

};


}



init(){

}



addPoint(value){

this.points+=value;


}



unlock(id){


const research=

this.data[id];


if(!research){

return false;

}


if(
this.points<
research.cost
){

return false;

}



this.points-=research.cost;


research.unlocked=true;


return true;


}



getAll(){

return this.data;

}



toJSON(){

return {

points:this.points,

data:this.data

};

}



load(data){

if(!data){

return;

}


this.points=data.points ?? 0;

this.data=data.data ?? this.data;


}



}



const research=

new ResearchManager();


export default research;