/**
 * World Creator
 * Converter UI
 *
 * Resource Conversion Display
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



        this.update();



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



        let html=

        `

        <h3>

        変換

        </h3>

        `;



        for(

            const id in recipes

        ){


            const recipe=

            recipes[id];



            html+=`

            <div class="converter-item">


            <b>

            ${recipe.name}

            </b>



            <br>



            ${recipe.input}

            x${recipe.inputAmount}



            →

            

            ${recipe.output}

            x${recipe.outputAmount}



            <br><br>



            <button

            data-convert="${id}">


            変換


            </button>



            </div>


            `;


        }



        this.area.innerHTML=

        html;



        this.bindButtons();


    }



    bindButtons(){


        this.area

        .querySelectorAll(

            "[data-convert]"

        )

        .forEach(

            button=>{


                button.onclick=

                ()=>{


                    Converter.convert(

                        button.dataset.convert

                    );


                };


            }

        );


    }



}



export default new ConverterUI();