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

        document.getElementById(

            id

        );



        if(!this.area){

            return;

        }



        this.update();


    }



    update(){


        if(!this.area){

            return;

        }



        const data=

        ResearchManager.getAll();



        let html="";



        for(

            const id in data

        ){


            const research=

            data[id];



            html+=`

            <div class="research-item">


            <h3>

            ${research.name}

            </h3>



            Lv:

            ${research.level}

            /

            ${research.max}



            <br>



            効果:

            ×${

                Math.pow(

                    research.effect,

                    research.level

                )

                .toFixed(2)

            }



            <br>



            <button

            data-research="${id}">

            研究する

            </button>



            </div>


            `;


        }



        this.area.innerHTML=

        html;



        this.bind();


    }



    bind(){


        this.area

        .querySelectorAll(

            "[data-research]"

        )

        .forEach(

            button=>{


                button.onclick=

                ()=>{


                    const id=

                    button.dataset.research;



                    if(

                        ResearchManager.researchUp(

                            id

                        )

                    ){


                        this.update();


                        eventBus.emit(

                            "research:complete"

                        );


                    }


                };


            }

        );


    }



}



export default new ResearchUI();