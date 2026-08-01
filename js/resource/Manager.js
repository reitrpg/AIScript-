/**
 * World Creator
 * Resource Manager
 *
 * Resource Storage Controller
 */


import eventBus from "../core/eventBus.js";



class ResourceManager {


    constructor(){


        this.resources={



            wood:{


                name:

                "木材",


                amount:0


            },



            stone:{


                name:

                "石材",


                amount:0


            },



            ore:{


                name:

                "鉱石",


                amount:0


            }


        };


    }



    get(id){


        return this.resources[id];


    }



    getAll(){


        return this.resources;


    }



    create(id,name){


        if(

            this.resources[id]

        ){


            return false;


        }



        this.resources[id]={


            name:name,


            amount:0


        };



        return true;


    }



    add(id,amount){


        const resource=

        this.resources[id];



        if(!resource){


            return false;


        }



        resource.amount+=

        Number(amount)

        ||

        0;



        eventBus.emit(

            "resource:update"

        );



        return true;


    }



    consume(id,amount){


        const resource=

        this.resources[id];



        if(!resource){


            return false;


        }



        if(

            resource.amount

            <

            amount

        ){


            return false;


        }



        resource.amount-=

        Number(amount);



        eventBus.emit(

            "resource:update"

        );



        return true;


    }



    getAmount(id){


        const resource=

        this.resources[id];



        if(!resource){


            return 0;


        }



        return resource.amount;


    }



    has(id,amount){


        return (

            this.getAmount(id)

            >=

            amount

        );


    }



    clear(){


        for(

            const id in this.resources

        ){


            this.resources[id].amount=0;


        }



        eventBus.emit(

            "resource:update"

        );


    }



    toJSON(){


        return this.resources;


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


                this.resources[id].amount=

                data[id].amount

                ??

                0;


            }

            else{


                this.resources[id]=data[id];


            }


        }


    }



}



export default new ResourceManager();