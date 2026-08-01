/**
 * World Creator
 * Resource Manager
 *
 * Resource Production System
 */


import Resource from "./Resource.js";

import WorldManager from "../world/Manager.js";

import ResearchManager from "../research/Manager.js";

import eventBus from "../core/eventBus.js";



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

        production=0

    ){


        if(

            this.resources[id]

        ){

            return;

        }



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



    getProductionMultiplier(){


        const world=

        WorldManager.getCurrent();



        if(!world){


            return 1;


        }



        const rarity=

        world.rarityMultiplier

        ??

        1;



        const level=

        Math.pow(

            world.level,

            2

        )

        /

        100;



        const rebirth=

        world.rebirthMultiplier

        ??

        1;



        const effect=

        this.getEffectMultiplier(

            world.effects

        );



        const research=

        ResearchManager

        .getProductionMultiplier();



        return (

            rarity

            *

            level

            *

            effect

            *

            rebirth

            *

            research

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

        this.getProductionMultiplier();



        Object.values(

            this.resources

        )

        .forEach(

            resource=>{


                resource.add(

                    resource.production

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

                !this.resources[id]

            ){


                this.create(

                    id,

                    id,

                    data[id].production

                );


            }



            this.resources[id]

            .load(

                data[id]

            );


        }


    }



}



export default new ResourceManager();