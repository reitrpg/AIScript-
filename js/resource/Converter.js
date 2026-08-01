/**
 * World Creator
 * Resource Converter
 *
 * Integrated Version
 */


import ResourceManager from "./Manager.js";

import eventBus from "../core/eventBus.js";



class Converter {


    constructor(){


        this.recipes = {};


        this.init();


    }



    init(){


        this.recipes = {


            food:{


                input:"wood",


                cost:2,


                output:1



            },



            mana:{


                input:"stone",


                cost:5,


                output:1


            }


        };


    }



    tick(){


        for(

            const id in this.recipes

        ){


            const recipe =

                this.recipes[id];



            const source =

                ResourceManager.get(

                    recipe.input

                );



            if(!source){


                continue;


            }



            if(

                source.amount >=

                recipe.cost

            ){


                source.remove(

                    recipe.cost

                );



                ResourceManager.add(

                    id,

                    recipe.output

                );


            }


        }



        eventBus.emit(

            "resource:update"

        );


    }



    addRecipe(

        id,

        input,

        cost,

        output

    ){


        this.recipes[id] = {


            input:input,


            cost:cost,


            output:output


        };


    }



    getRecipes(){


        return this.recipes;


    }


}



const converter =

    new Converter();



export default converter;