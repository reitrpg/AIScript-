/**
 * World Creator
 * Research UI
 *
 * Divine Revelation Display
 */


import ResearchManager from "../research/Manager.js";

import ResourceManager from "../resource/Manager.js";

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



    canResearch(data){


        for(

            const id in data.cost

        ){


            const resource=

            ResourceManager.get(

                id

            );



            if(

                !resource

                ||

                resource.getAmount()

                <

                data.cost[id]

            ){


                return false;


            }


        }



        return true;


    }



    getCostText(cost){


        let text="";



        for(

            const id in cost

        ){


            const resource=

            ResourceManager.get(

                id

            );



            const amount=

            resource

            ?

            resource.getAmount()

            :

            0;



            const need=

            cost[id];



            const shortage=

            Math.max(

                need-amount,

                0

            );



            text+=`

            ${id}

            :

            ${amount}

            /

            ${need}



            `;



            if(shortage>0){


                text+=`

                <span>

                不足 ${shortage}

                </span>


                `;


            }


            text+="<br>";


        }



        return text;


    }



    update(){


        if(!this.area){


            return;

        }



        const research=

        ResearchManager.getAll();



        let html=

        `

        <h2>

        神託

        </h2>

        `;



        for(

            const id in research

        ){


            const data=

            research[id];



            const available=

            this.canResearch(

                data

            );



            html+=`

            <div class="research-item">


            <h3>

            ${data.name}

            </h3>



            <p>

            ${data.description ?? ""}

            </p>



            Lv:

            ${data.level}

            /

            ${data.max}



            <br><br>



            必要:



            <br>



            ${

                this.getCostText(

                    data.cost

                )

            }



            <button

            data-research="${id}"

            ${

                data.level>=data.max

                ?

                "disabled"

                :

                ""

            }

            class="${

                available

                ?

                "available"

                :

                "unavailable"

            }"


            >

            ${

                data.level>=data.max

                ?

                "到達済み"

                :

                "天啓を受ける"

            }


            </button>


            </div>

            <hr>


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


                    ResearchManager.researchUp(

                        button.dataset.research

                    );


                };


            }

        );


    }



}



export default new ResearchUI();