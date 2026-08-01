/**
 * World Creator
 * Game Loop
 *
 * Tick Control System
 */


import TimeManager from "./time.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import EPManager from "../ep/Manager.js";

import eventBus from "./eventBus.js";



class Game {


    constructor(){


        this.running=false;


        this.interval=null;



        this.epPerTick=1;



    }



    start(){


        if(this.running){


            return;


        }



        this.running=true;



        this.applyOfflineProgress();



        this.createLoop();


    }



    createLoop(){


        if(this.interval){


            clearInterval(

                this.interval

            );


        }



        this.interval=setInterval(


            ()=>{


                this.tick();


            },


            TimeManager.getTickSpeed()


        );


    }



    restartLoop(){


        if(

            !this.running

        ){


            return;


        }



        this.createLoop();


    }



    applyOfflineProgress(){


        const seconds=

        TimeManager.getOfflineSeconds();



        if(

            seconds<=0

        ){


            return;


        }



        for(

            let i=0;

            i<seconds;

            i++

        ){


            this.productionTick();


        }



    }



    tick(){


        this.productionTick();


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



    getEPGain(){


        return this.epPerTick;


    }



    setEPGain(value){


        this.epPerTick=

        Number(value)

        ||

        0;


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