const KEY=

"world_creator_save";



class SaveManager{


save(data){


localStorage.setItem(

KEY,

JSON.stringify(data)

);


}



load(){


const data=

localStorage.getItem(KEY);



if(!data){

return null;

}



return JSON.parse(data);



}



}



const save=new SaveManager();


export default save;