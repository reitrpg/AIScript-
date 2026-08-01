/**
 * World Creator
 * World Growth System
 *
 * Level Event Integration
 */


import eventBus from "../core/eventBus.js";



class WorldManager {


    constructor(){


        this.current=null;


        this.unlocks={

            extraResource1:false,

            extraResource2:false,

            rareResource:false

        };


    }



    levelUp(){


        if(!this.current){

            return;

        }



        this.current.level++;



        this.checkUnlock();



        eventBus.emit(

            "world:levelup",

            this.current

        );



        eventBus.emit(

            "world:update",

            this.current

        );


    }



    checkUnlock(){


        const lv=

        this.current.level;



        if(

            lv>=10

            &&

            !this.unlocks.extraResource1

        ){


            this.unlocks.extraResource1=true;



            eventBus.emit(

                "world:unlock",

                "resource_slot"

            );


        }



        if(

            lv>=50

            &&

            !this.unlocks.extraResource2

        ){


            this.unlocks.extraResource2=true;



            eventBus.emit(

                "world:unlock",

                "advanced_resource"

            );


        }



        if(

            lv>=100

            &&

            !this.unlocks.rareResource

        ){


            this.unlocks.rareResource=true;



            eventBus.emit(

                "world:unlock",

                "rare_material"

            );


        }


    }



    getUnlocks(){


        return this.unlocks;


    }



}



export default new WorldManager();