/**
 * World Creator
 * Game Loop
 *
 * Production / EXP System
 */


import time from "./time.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import eventBus from "./eventBus.js";



class Game {


    constructor(){


        this.running = false;


        this.interval = null;


    }



    start(){


        if(this.running){

            return;

        }



        this.running = true;



        time.start();



        this.interval = setInterval(

            ()=>{


                this.tick();


            },

            1000

        );


    }



    tick(){



        // 世界経験値取得

        WorldManager.addExp(

            1

        );



        // 資源生産

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



        this.running = false;



    }



}



export default new Game();