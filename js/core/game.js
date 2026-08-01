/**
 * World Creator
 * Game Loop
 *
 * Production / Offline Progress System
 */


import time from "./time.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import SaveManager from "./save.js";

import eventBus from "./eventBus.js";



class Game {


    constructor(){


        this.running=false;


        this.interval=null;


        this.tickTime=1000;


    }



    start(){


        if(this.running){


            return;

        }



        this.running=true;



        this.applyOfflineProgress();



        this.interval=

        setInterval(

            ()=>{


                this.tick();


            },


            this.tickTime

        );


    }



    tick(){


        this.productionTick();


    }



    productionTick(){


        if(

            !WorldManager.getCurrent()

        ){


            return;

        }



        WorldManager.addExp(

            1

        );



        ResourceManager.update();



        eventBus.emit(

            "game:tick"

        );


        SaveManager.save();


    }



    applyOfflineProgress(){


        const seconds=

        time.getOfflineSeconds();



        if(

            seconds<=0

        ){


            return;

        }



        const limit=

        Math.min(

            seconds,

            86400

        );



        for(

            let i=0;

            i<limit;

            i++

        ){


            this.productionTick();


        }



        eventBus.emit(

            "offline:complete",

            limit

        );


    }



    stop(){


        if(

            this.interval

        ){


            clearInterval(

                this.interval

            );


            this.interval=null;


        }



        this.running=false;


    }



}



export default new Game();