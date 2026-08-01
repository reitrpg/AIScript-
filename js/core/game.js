/**
 * World Creator
 * Game Loop
 *
 * Offline Progress + EP Integration
 */


import time from "./time.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import EPManager from "../ep/Manager.js";

import eventBus from "./eventBus.js";



class Game {


    constructor(){


        this.running = false;


        this.interval = null;



        this.epPerTick = 1;


    }



    start(){


        if(this.running){


            return;

        }



        this.running = true;



        this.applyOfflineProgress();



        this.interval = setInterval(


            ()=>{


                this.tick();


            },


            1000


        );


    }



    applyOfflineProgress(){


        const seconds =

        time.getOfflineSeconds();



        if(

            seconds <= 0

        ){


            return;

        }



        for(

            let i = 0;

            i < seconds;

            i++

        ){


            this.productionTick();


        }



        eventBus.emit(

            "offline:complete",

            seconds

        );


    }



    tick(){


        this.productionTick();


    }



    getEPGain(){


        return this.epPerTick;


    }



    productionTick(){



        WorldManager.addExp(

            1

        );



        ResourceManager.update();



        EPManager.add(

            this.getEPGain()

        );



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



        this.running=false;


    }



}



export default new Game();