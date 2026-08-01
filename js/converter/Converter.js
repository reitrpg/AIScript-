/**
 * World Creator
 * Resource Converter System
 *
 * Resource Processing
 * Research / World Effect Integration
 */


import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

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



        this.worldMultiplier=1;


    }



    setResearchMultiplier(value){


        this.researchMultiplier=

        Number(value)

        ||

        1;


    }



    updateWorldMultiplier(){


        const world=

        WorldManager.getCurrent();



        if(!world){


            this.worldMultiplier=1;


            return;

        }



        let multiplier=1;



        multiplier*=

        world.rarityMultiplier

        ??

        1;



        if(

            world.effects

        ){


            world.effects.forEach(

                effect=>{


                    switch(effect){


                        case "豊かな森":


                            if(

                                true

                            ){

                                multiplier*=1.1;

                            }

                            break;



                        case "鉱脈の大地":


                            multiplier*=1.15;

                            break;



                        case "魔力循環":


                            multiplier*=1.2;

                            break;



                        case "神代遺構":


                            multiplier*=1.25;

                            break;



                        case "世界樹の核":


                            multiplier*=1.5;

                            break;


                    }


                }

            );


        }



        this.worldMultiplier=

        multiplier;


    }



    getMultiplier(){


        this.updateWorldMultiplier();



        return (

            this.researchMultiplier

            *

            this.worldMultiplier

        );


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

        this.getMultiplier();



        output.add(

            amount

        );



        eventBus.emit(

           