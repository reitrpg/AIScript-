import ResearchManager from "../research/Manager.js";



class ResearchUI{


init(){


this.update();


}



update(){


const point=

document.getElementById(

"research-point"

);



if(point){

point.textContent=

"Research Point : "

+

ResearchManager.points;

}



const list=

document.getElementById(

"research-list"

);



if(!list){

return;

}



list.innerHTML="";



const data=

ResearchManager.getAll();



for(

const id in data

){


const item=data[id];



const button=

document.createElement(

"button"

);



button.textContent=

item.name

+

" "

+

(

item.unlocked

?

"Unlocked"

:

"Cost "

+

item.cost

);



button.onclick=()=>{


ResearchManager.unlock(id);


this.update();


};



list.appendChild(button);


}



}


}



const researchUI=

new ResearchUI();


export default researchUI;