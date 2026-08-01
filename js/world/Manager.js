/**
 * World Creator
 * World Manager
 *
 * World Generation / Level / Rebirth System
 */


import eventBus from "../core/eventBus.js";



class WorldManager {


    constructor(){


        this.world=null;


    }



    createWorld(){


        this.world={


            id:

            Date.now(),



            level:1,



            exp:0,



            rebirthCount:0,



            rebirthMultiplier:1,



            rarity:"normal",



            rarityMultiplier:1,



            effects:[



                "豊かな森"



            ],



            resources:{


                wood:{


                    base:1


                },


                stone:{


                    base:1


                },


                food:{


                    base:1


                }


            }



        };



        eventBus.emit(

            "world:create",

            this.world

        );


    }



    getCurrent(){


        return this.world;


    }



    addExp(value){


        if(!this.world){


            return;

        }



        this.world.exp +=

        value;



        const need=

        this.world.level

        *

        10;



        if(

            this.world.exp >= need

        ){


            this.world.exp -= need;



            this.world.level++;



            eventBus.emit(

                "world:update"

            );


        }


    }



    getRebirthIncrease(){


        if(!this.world){


            return 1;

        }



        return (

            Math.pow(

                this.world.level,

                2

            )

            /

            100

        );


    }



    rebirth(){


        if(!this.world){


            return false;

        }



        const increase=

        this.getRebirthIncrease();



        this.world.rebirthMultiplier*=

        increase;



        this.world.rebirthCount++;



        this.world.level=1;



        this.world.exp=0;



        eventBus.emit(

            "world:rebirth",

            this.world

        );



        return true;


    }



    setRarity(

        name,

        multiplier

    ){


        if(!this.world){

            return;

        }



        this.world.rarity=

        name;



        this.world.rarityMultiplier=

        multiplier;


    }



    addEffect(effect){


        if(!this.world){

            return;

        }



        if(

            !this.world.effects.includes(

                effect

            )

        ){


            this.world.effects.push(

                effect

            );


        }


    }



    toJSON(){


        return this.world;


    }



    load(data){


        if(data){


            this.world=data;


        }


    }



}



export default new WorldManager();