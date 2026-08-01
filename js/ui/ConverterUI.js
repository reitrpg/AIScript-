/**
 * World Creator
 * Converter UI
 */


import Converter from "../resource/Converter.js";

import eventBus from "../core/eventBus.js";



class ConverterUI {


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


        const recipes=

        Converter.getRecipes();



        let html="";



        for(

            const id in recipes

        ){


            const recipe=

            recipes[id];



            html += `


            <div class="converter">


            <h3>

            ${id}

            </h3>


            必要素材

            <br>


            ${

                this.list(

                    recipe.input

                )

            }


            ↓


            <br>


            獲得素材

            <br>


            ${

                this.list(

                    recipe.output

                )

            }


            <br>


            <button

            class="convert-button"

            data-id="${id}">


            変換


            </button>


            </div>


            `;


        }



        this.area.innerHTML=

        html;



        this.bind();


    }



    list(data){


        let text="";



        for(

            const id in data

        ){


            text +=

            id

            +

            " : "

            +

            data[id]

            +

            "<br>";


        }



        return text;


    }



    bind(){


        document

        .querySelectorAll(

            ".convert-button"

        )

        .forEach(

            button=>{


                button.onclick=()=>{


                    Converter.convert(

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



export default new ConverterUI();