/**
 * World Creator
 * Resource Manager
 *
 * Resource Production Management
 */


import Resource from "./Resource.js";

import eventBus from "../core/eventBus.js";



class ResourceManager {


    constructor(){


        this.resources={};


        this.productionMultiplier=1;



        this.initialize();


    }



    initialize(){


        this.create(

            "food",

            "食料"

        );


        this.create(

            "wood",

            "木材"

        );


        this.create(

            "ore",

            "鉱石"

        );


        this.create(

            "mana",

            "魔力"

        );


        this.create(

            "crystal",

            "結晶"

        );


        this.create(

            "worldCore",

            "世界核"

        );


    }



    create(id,name){


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



    add(id,value){


        const resource=

        this.get(id);



        if(!resource){


            return false;

        }



        resource.add(

            value

        );



        eventBus.emit(

            "resource:update"

        );



        return true;


    }



    consume(id,value){


        const resource=

        this.get(id);



        if(!resource){


            return false;

        }



        return resource.consume(

            value

        );


    }



    setProduction(id,value){


        const resource=

        this.get(id);



        if(!resource){


            return false;

        }



        resource.setProduction(

            value

        );



        return true;


    }



    update(){


        for(

            const id in this.resources

        ){


            const resource=

            this.resources[id];



            const gain=

            resource.getProduction()

            *

            this.productionMultiplier;



            if(

                gain > 0

            ){


                resource.add(

                    gain

                );


            }


        }



        eventBus.emit(

            "resource:update"

        );


    }



    setProductionMultiplier(value){


        this.productionMultiplier=

        Number(value)

        ||

        1;


    }



    getProductionMultiplier(){


        return this.productionMultiplier;


    }



    toJSON(){


        const data={};



        for(

            const id in this.resources

        ){


            data[id]=

            this.resources[id].toJSON();


        }



        return {


            productionMultiplier:

            this.productionMultiplier,


            resources:

            data


        };


    }



    load(data){


        if(!data){


            return;

        }



        this.productionMultiplier=

        Number(

            data.productionMultiplier

        )

        ||

        1;



        const resources=

        data.resources

        ??

        data;



        for(

            const id in resources

        ){


            if(

                this.resources[id]

            ){


                this.resources[id].load(

                    resources[id]

                );


            }


        }



        eventBus.emit(