/**
 * World Creator
 * Game Core
 *
 * Main Simulation Loop
 */


import EPManager from "../ep/Manager.js";

import ResearchManager from "../research/Manager.js";

import UpgradeManager from "../upgrades/Manager.js";

import SettingsManager from "../settings/Manager.js";

import eventBus from "./eventBus.js";



class Game {


    constructor(){


        this.running=false;


        this.timer=null;


        this.speedMultiplier=1;


        this.tickCount=0;


    }



    start(){


        if(this.running){


            return;


        }



        this.running=true;



        this.loop();


    }



    stop(){


        this.running=false;



        if(this.timer){


            clearTimeout(

                this.timer

            );


        }


    }



    loop(){


        if(!this.running){


            return;


        }



        this.tick();



        const speed=

        SettingsManager.getTickSpeed();



        this.timer=

        setTimeout(

            ()=>this.loop(),

            speed

            /

            this.speedMultiplier

        );


    }



    tick(){


        const research=

        ResearchManager.getMultiplier();



        const upgrade=

        UpgradeManager.getTotalMultiplier();



        const gain=

        research

        *

        upgrade;



        EPManager.add(

            gain

        );



        this.tickCount++;



        eventBus.emit(

            "game:tick"

        );


    }



    debugTick(count){


        if(

            count<=0

        ){


            return;


        }



        for(

            let i=0;

            i<count;

            i++

        ){


            this.tick();


        }


    }



    setSpeedMultiplier(value){


        this.speedMultiplier=

        Number(value)

        ||

        1;


    }



    getSpeedMultiplier(){


        return this.speedMultiplier;


    }



    getTickCount(){


        return this.tickCount;


    }



}



export default new Game();