/**
 * World Creator
 * Resource Manager
 *
 * Resource Control System
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


            return this.resources[id];


        }



        const resource=

        new Resource(

            id,

            name

        );



        resource.setProduction(

            production

        );



        this.resources[id]=

        resource;



        return resource;


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



            this.create(

                id,

                id,

                data.base

            );



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



        const researchBonus=

        ResearchManager

        .getProductionMultiplier();



        return (

            levelBonus

            *

            rarityBonus

            *

            rebirthBonus

            *

            researchBonus

        );


    }



    update(){


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


            const resource=

            this.create(

                id,

                data[id].name

            );



            resource.load(

                data[id]

            );


        }


    }



}



export default new ResourceManager();