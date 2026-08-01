/**
 * World Creator
 * Resource Manager
 *
 * Research Integration
 */


import Resource from "./Resource.js";

import eventBus from "../core/eventBus.js";

import WorldManager from "../world/Manager.js";

import ResearchManager from "../research/Manager.js";



class ResourceManager {


    constructor(){


        this.resources={};


        this.initialized=false;


    }



    init(){


        this.initialized=true;


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


            if(

                !this.resources[id]

            ){


                this.create(

                    id,

                    id,

                    world.resources[id].base

                );


            }



            else{


                this.resources[id]

                .setProduction(

                    world.resources[id].base

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

        world.rarityMultiplier ?? 1;



        const rebirthBonus=

        world.rebirthMultiplier ?? 1;



        const effectBonus=

        this.getEffectMultiplier(

            world.effects

        );



        const researchBonus=

        ResearchManager

        .getMultiplier();



        return (

            levelBonus

            *

            rarityBonus

            *

            rebirthBonus

            *

            effectBonus

            *

            researchBonus

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



                    case "鉱脈の大地":

                        value*=1.3;

                        break;



                    case "魔力循環":

                        value*=1.5;

                        break;



                    case "神代遺構":

                        value*=1.4;

                        break;



                    case "世界樹の核":

                        value*=2;

                        break;



                }


            }

        );



        return value;


    }



    update(){


        this.syncWorldResources();



        const multiplier=

        this.getWorldMultiplier();



        Object.values(

            this.resources

        )

        .forEach(

            resource=>{


                resource.add(

                    resource.getProduction()

                    *

                    multiplier

                );


            }

        );



        eventBus.emit(

            "resource:update"

        );


    }



    toJSON(){


        const data={};



        for(

            const id in this.resources

        ){


            data[id]=

            this.resources[id]

            .toJSON();


        }



        return data;


    }



    load(data){


        if(!data){

            return;

        }



        for(

            const id in data

        ){


            if(

                this.resources[id]

            ){


                this.resources[id]

                .load(

                    data[id]

                );


            }


        }


    }



}



export default new ResourceManager();