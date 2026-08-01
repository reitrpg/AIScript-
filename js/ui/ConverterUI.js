/**
 * World Creator
 * Converter UI
 *
 * Resource Processing Display
 */


import Converter from "../converter/Converter.js";

import eventBus from "../core/eventBus.js";



class ConverterUI {


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


    }



    update(){


        if(!this.area){

            return;

        }



        const recipes=

        Converter.getAll();



        let html="";



        html+=`

        <h3>

        資源変換

        </h3>


        変換倍率:

        ×${

            Converter.getMultiplier()

            .toFixed(2)

        }


        <br><br>

        `;



        for(

            const id in recipes

        ){


            const recipe=

            recipes[id];



            html+=`

            <div class="converter-item">


            <h4>

            ${recipe.name}

            </h4>



            必要:


            ${recipe.input}

            ×

            ${recipe.inputAmount}



            <br>



            ↓



            <br>



            獲得:


            ${recipe.output}

            ×

            ${recipe.outputAmount}



            <br><br>



            <button

            data-converter="${id}">


            変換


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

            "[data-converter]"

        )

        .forEach(

            button=>{


                button.onclick=

                ()=>{


                    Converter.convert(

                        button.dataset.converter

                    );


                };


            }

        );


    }



}



export default new ConverterUI();