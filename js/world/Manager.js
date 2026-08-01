/**
 * World Creator
 * Resource Manager
 *
 * Resource Production System
 */


import Resource from "./Resource.js";

import eventBus from "../core/eventBus.js";

import WorldManager from "../world/Manager.js";



class ResourceManager {


    constructor(){


        this.resources={};


        this.initialized=false;


        this.researchMultiplier=1;


    }



    init(){


        this.initialized=true;


    }



    setResearchMultiplier(value){


        this.researchMultiplier=

        Number(value)

        ||1;


    }



    create(

        id,

        name,

        production

    ){


        this.resources[id]=

        new Resource(

            id,

            name

        );



        this.resources[id]

        .setProduction(

            production

        );


    }



    get(id){


        return this.resources[id];


    }



    getAll(){


        return this.resources;


    }



    syncWorldResources(){


        const world=

        WorldManager.getCurrent();



        if(

            !world

            ||

            !world.resources

        ){

            return;

        }



        for(

            const id in world.resources

        ){


            const data=

            world.resources[id];



            if(

                !this.resources[id]

            ){


                this.create(

                    id,

                    id,

                    data.base ?? 0

                );


            }

            else{


                this.resources[id]

                .setProduction(

                    data.base ?? 0

                );


            }


        }


    }



    getWorldMultiplier(){


        const world=

        WorldManager.getCurrent();



        if(!world){

            return 1;

        }



        const levelBonus=

        Math.pow(

            1.05,

            world.level-1

        );



        const rarityBonus=

        world.rarityMultiplier

        ??

        1;



        const rebirthBonus=

        world.rebirthMultiplier

        ??

        1;



        const effectBonus=

        this.getEffectMultiplier(

            world.effects

        );



        return (

            levelBonus

            *

            rarityBonus

            *

            rebirthBonus

            *

            effectBonus

            *

            this.researchMultiplier

        );


    }



    getEffectMultiplier(effects){


        let value=1;



        if(!effects){

            return value;

        }



        effects.forEach(

            effect=>{


                switch(effect){


                    case "豊かな森":

                        value*=1.2;

                        break;


                   