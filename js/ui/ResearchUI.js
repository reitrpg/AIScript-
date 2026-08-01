/**
 * World Creator
 * Research UI
 *
 * Research Display System
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



        this.bindEvents();



        this.update();


    }



    bindEvents(){


        eventBus.on(

            "resource:update",

            ()=>{


                this.update();


            }

        );


        eventBus.on(

            "research:update",

            ()=>{


                this.update();


            }

        );


    }



    update(){


        if(!this.area){


            return;

        }



        const list=

        ResearchManager.getAll();



        let html="";



        html+=`

        <h3>

        研究

        </h3>

        `;



        for(

            const id in list

        ){


            const research=

            list[id];



            html+=`


            <div class="research-item">


            <h4>

            ${research.name}

            </h4>



            Lv:

            ${research.level}

            /

            ${research.max}



            <br>



            効果:

            ×${

                research.getMultiplier()

                .toFixed(2)

            }



            <br>



            種類:

            ${research.type}



            <br>



            必要素材:

            `;



            for(

                const cost in research.cost

            ){


                html+=`

                ${cost}

                :

                ${research.cost[cost]}

                `;


            }



            html+=`


            <br><br>



            <button

            data-research="${id}">


            研究する


            </button>



            </div>


            <hr>


            `;


        }



        this.area.innerHTML=

        html;



        this.bindButtons();


    }



    bindButtons(){


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


                        eventBus.emit(

                            "research:update"

                        );


                    }


                };


            }

        );


    }



}



export default new ResearchUI();