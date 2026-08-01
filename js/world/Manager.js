/**
 * World Creator
 * World Manager
 *
 * World Control System
 */


import eventBus from "../core/eventBus.js";



class WorldManager {


    constructor(){


        this.world=null;


    }



    createWorld(){


        this.world={


            level:1,


            exp:0,


            rarity:"Normal",


            rarityMultiplier:1,


            effects:[],


            rebirthCount:0,


            rebirthMultiplier:1,


            resources:{


                food:{


                    base:1


                },


                wood:{


                    base:1


                },


                ore:{


                    base:0.5


                },


                mana:{


                    base:0


                },


                crystal:{


                    base:0


                },


                worldCore:{


                    base:0


                }


            }


        };



        eventBus.emit(

            "world:update"

        );


        return this.world;


    }



    getCurrent(){


        return this.world;


    }



    addExp(value){


        if(!this.world){


            return;

        }



        this.world.exp +=

        Number(value)

        ||

        0;



        this.checkLevel();



    }



    checkLevel(){


        const need=

        this.world.level *

        100;



        if(

            this.world.exp >= need

        ){


            this.world.exp-=

            need;



            this.world.level++;



            eventBus.emit(

                "world:update"

            );


        }


    }



    rebirth(){


        if(!this.world){


            return false;

        }



        const bonus=

        1+

        (

            this.world.level

            *

            0.01

        );



        this.world.rebirthMultiplier*=

        bonus;



        this.world.rebirthCount++;



        this.world.level=1;


        this.world.exp=0;



        eventBus.emit(

            "world:rebirth"

        );



        return true;


    }



    toJSON(){


        return this.world;


    }



    load(data){


        if(!data){


            return;

        }



        this.world=data;


    }



}



export default new WorldManager();