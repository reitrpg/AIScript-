/**
 * World Creator
 * Research UI
 */


import ResearchManager from "../research/Manager.js";

import eventBus from "../core/eventBus.js";



class ResearchUI {


    constructor(){


        this.area=null;


    }



    init(id){


        this.area=

        document.getElementById(id);



        if(!this.area){

            return;

        }



        this.render();


    }



    render(){


        const data=

        ResearchManager.getAll();



        let html="";



        for(

            const id in data

        ){


            const research=

            data[id];



            html += `


            <div class="research">


            <h3>

            ${research.name}

            </h3>


            Lv:

            ${research.level}

            /

            ${research.max}


            <br>


            効果:

            ${research.effect}


            <br>


            必要素材:


            <br>


            ${

                this.costText(

                    research.cost

                )

            }



            <br>


            <button

            data-id="${id}"

            class="research-button">


            強化


            </button>


            </div>


            `;


        }



        this.area.innerHTML=

        html;



        this.bind();


    }



    costText(cost){


        let text="";



        for(

            const id in cost

        ){


            text +=

            id

            +

            " : "

            +

            cost[id]

            +

            "<br>";


        }



        return text;


    }



    bind(){


        document

        .querySelectorAll(

            ".research-button"

        )

        .forEach(

            button=>{


                button.onclick=()=>{


                    ResearchManager.researchUp(

                        button.dataset.id

                    );



                    eventBus.emit(

                        "resource:update"

                    );



                    this.render();


                };


            }

        );


    }



}



export default new ResearchUI();