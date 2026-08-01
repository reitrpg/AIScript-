/**
 * World Creator
 * Resource Manager
 *
 * World Production Integration
 */


import Resource from "./Resource.js";

import eventBus from "../core/eventBus.js";

import WorldManager from "../world/Manager.js";



class ResourceManager {


    constructor(){


        this.resources = {};

        this.initialized = false;


    }



    init(){


        if(this.initialized){

            return;

        }



        this.create(

            "wood",

            "Wood",

            1

        );



        this.create(

            "stone",

            "Stone",

            1

        );



        this.create(

            "food",

            "Food",

            0

        );



        this.create(

            "mana",

            "Mana",

            0

        );



        this.initialized = true;


    }



    create(

        id,

        name,

        production

    ){


        this.resources[id] =

        new Resource(

            id,

            name

        );


        this.resources[id]

        .setProduction(

            production

        );


    }



    add(

        id,

        value

    ){


        if(this.resources[id]){


            this.resources[id]

            .add(value);


        }


    }



    get(id){


        return this.resources[id];


    }



    getAll(){


        return this.resources;


    }



    getWorldMultiplier(){


        const world =

        WorldManager.getCurrent();



        if(!world){


            return 1;


        }



        const levelBonus =


        Math.pow(

            1.05,

            world.level - 1

        );



        const rarityBonus =

        world.rarityMultiplier ?? 1;



        const rebirthBonus =

        world.rebirthMultiplier ?? 1;



        const effectBonus =

        this.getEffectMultiplier(

            world

        );



        return (

            levelBonus

            *

            rarityBonus

            *

            effectBonus

            *

            rebirthBonus

        );


    }



    getEffectMultiplier(world){


        if(

            !world.effects ||

            world.effects.length===0

        ){


            return 1;


        }



        let multiplier = 1;



        world.effects.forEach(

            effect=>{


                if(

                    effect==="豊かな森"

                ){


                    multiplier *= 1.2;


                }



                if(

                    effect==="神代遺構"

                ){


                    multiplier *= 1.4;


                }



                if(

                    effect==="世界樹の核"

                ){


                    multiplier *= 2;


                }


            }

        );



        return multiplier;


    }



    update(){


        const multiplier =

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


            data[id] =

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


            if(this.resources[id]){


                this.resources[id]

                .load(

                    data[id]

                );


            }


        }


    }


}



const resourceManager =

new ResourceManager();



export default resourceManager;