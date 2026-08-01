/**
 * World Creator
 * Game Loop
 *
 * Offline Progress Integration
 */


import time from "./time.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import eventBus from "./eventBus.js";



class Game {


    constructor(){


        this.running=false;


        this.interval=null;


        this.offlineLimit=3600;


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

            1000

        );


    }



    applyOfflineProgress(){


        const seconds=

        time.getOfflineSeconds();



        if(

            seconds<=0

        ){

            return;

        }



        const executeSeconds=

        Math.min(

            seconds,

            this.offlineLimit

        );



        for(

            let i=0;

            i<executeSeconds;

            i++

        ){


            this.productionTick();


        }



        eventBus.emit(

            "offline:complete",

            executeSeconds

        );


    }



    tick(){


        this.productionTick();


    }



    productionTick(){


        WorldManager.addExp(

            1

        );



        ResourceManager.update();



        eventBus.emit(

            "game:tick"

        );


    }



    stop(){


        if(this.interval){


            clearInterval(

                this.interval

            );


        }



        this.interval=null;


        this.running=false;


    }



}



export default new Game();