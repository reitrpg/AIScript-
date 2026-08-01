/**
 * World Creator
 * Converter System
 *
 * Resource Conversion Management
 */


import ResourceManager from "../resource/Manager.js";

import eventBus from "../core/eventBus.js";



class Converter {


    constructor(){


        this.researchMultiplier=1;



        this.recipes={


            woodToPlank:{


                name:"木材加工",


                input:"wood",


                inputAmount:10,


                output:"plank",


                outputAmount:1


            },



            oreToMetal:{


                name:"鉱石精錬",


                input:"ore",


                inputAmount:10,


                output:"metal",


                outputAmount:1


            },



            crystalToMana:{


                name:"結晶変換",


                input:"crystal",


                inputAmount:1,


                output:"mana",


                outputAmount:10


            }


        };


    }



    setResearchMultiplier(value){


        this.researchMultiplier=

        Number(value)

        ||

        1;


    }



    getMultiplier(){


        return this.researchMultiplier;


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



        const output=

        ResourceManager.get(

            recipe.output

        );



        if(!output){


            ResourceManager.create(

                recipe.output,

                recipe.output,

                0

            );

        }



        ResourceManager.get(

            recipe.output

        )

        .add(

            recipe.outputAmount

            *

            this.researchMultiplier

        );



        eventBus.emit(

            "resource:update"

        );



        return true;


    }



    toJSON(){


        return {


            researchMultiplier:

            this.researchMultiplier


        };


    }



    load(data){


        if(!data){


            return;

        }



        this.researchMultiplier=

        data.researchMultiplier

        ??

        1;


    }



}



export default new Converter();