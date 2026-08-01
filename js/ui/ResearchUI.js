/**
 * World Creator
 * Research UI
 *
 * Divine Revelation Display
 */


import ResearchManager from "../research/Manager.js";

import EPManager from "../ep/Manager.js";

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



        eventBus.on(

            "research:update",

            ()=>{


                this.update();


            }

        );



        eventBus.on(

            "ep:update",

            ()=>{


                this.update();


            }

        );


    }



    update(){


        if(!this.area){


            return;


        }



        const researches=

        ResearchManager.getAll();



        let html=`

        <h2>

        神託研究

        </h2>

        `;



        for(

            const id in researches

        ){


            const data=

            ResearchManager.getStatus(

                id

            );



            const cost=

            data.cost.ep;



            const can=

            data.canResearch;



            html+=`



            <div class="research-card">



            <h3>

            ${data.name}

            </h3>



            <p>

            ${data.description}

            </p>



            Lv:

            ${data.level}



            <br>



            必要EP:

            ${cost}



            <br>



            <button

            class="research-button"

            data-id="${id}"

            style="

            background:

            ${can ? "#55aa55" : "#777"};

            "

            >



            ${

                can

                ?

                "啓示を受ける"

                :

                "EP不足"

            }



            </button>



            </div>



            `;


        }



        this.area.innerHTML=

        html;



        this.bind();


    }



    bind(){


        const buttons=

        this.area.querySelectorAll(

            ".research-button"

        );



        buttons.forEach(

            button=>{


                button.onclick=()=>{


                    ResearchManager.researchUp(

                        button.dataset.id

                    );


                };


            }

        );


    }



}



export default new ResearchUI();