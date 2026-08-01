/**
 * World Creator
 * Resource Converter
 *
 * Research Integration
 */


import ResourceManager from "../resource/Manager.js";

import eventBus from "../core/eventBus.js";



class Converter {


    constructor(){


        this.recipes={


            wood_food:{


                name:"木材加工食料化",


                input:"wood",


                inputAmount:10,


                output:"food",


                outputAmount:5


            },



            stone_ore:{


                name:"石材精錬",


                input:"stone",


                inputAmount:20,


                output:"ore",


                outputAmount:5


            },



            mana_crystal:{


                name:"魔力結晶生成",


                input:"mana",


                inputAmount:50,


                output:"crystal",


                outputAmount:1


            }


        };



        this.researchMultiplier=1;


    }



    setResearchMultiplier(value){


        this.researchMultiplier=

        Number(value)

        ||

        1;


    }



    getAll(){


        return this.recipes;


    }



    convert(id){


        const recipe=

        this.recipes[id];



        if(!recipe){


            return false;

        }



        const input=

        ResourceManager.get(

            recipe.input

        );



        if(!input){


            return false;

        }



        if(

            !input.consume(

                recipe.inputAmount

            )

        ){


            return false;

        }



        let output=

        ResourceManager.get(

            recipe.output

        );



        if(!output){


            ResourceManager.create(

                recipe.output,

                recipe.output,

                0

            );



            output=

            ResourceManager.get(

                recipe.output

            );


        }



        const amount=

        recipe.outputAmount

        *

        this.researchMultiplier;



        output.add(

            amount

        );



        eventBus.emit(

            "resource:update"

        );



        return true;


    }



}



export default new Converter();