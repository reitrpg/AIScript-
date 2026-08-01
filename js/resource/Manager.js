/**
 * World Creator
 * Resource Manager
 *
 * Integrated Version
 */


import Resource from "./Resource.js";

import eventBus from "../core/eventBus.js";



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


        const resource =

            this.resources[id];



        if(!resource){


            return;


        }



        resource.add(

            value

        );


    }



    remove(

        id,

        value

    ){


        const resource =

            this.resources[id];



        if(!resource){


            return false;


        }



        return resource.remove(

            value

        );


    }



    get(

        id

    ){


        return this.resources[id];


    }



    getAll(){


        return this.resources;


    }



    update(){


        Object.values(

            this.resources

        )

        .forEach(

            resource => {


                resource.update();


            }

        );



        eventBus.emit(

            "resource:update",

            this.resources

        );


    }



    toJSON(){


        const data = {};



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