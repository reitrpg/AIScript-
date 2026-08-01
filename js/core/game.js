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


        this.running = false;


        this.timer = null;


        this.tickCount = 0;


        this.speedMultiplier = 1;


    }



    start(){


        if(this.running){


            return;


        }



        this.running = true;


        this.loop();


    }



    stop(){


        this.running = false;



        if(this.timer){


            clearTimeout(this.timer);


            this.timer = null;


        }


    }



    loop(){


        if(!this.running){


            return;


        }



        this.executeTick();



        const interval =

            SettingsManager.getTickSpeed()

            /

            this.speedMultiplier;



        this.timer = setTimeout(

            ()=>this.loop(),

            interval

        );


    }



    executeTick(){


        this.processProduction();


        this.processResources();


        this.tickCount++;



        eventBus.emit(

            "game:tick"

        );


    }



    processProduction(){


        const researchMultiplier =

            ResearchManager.getMultiplier();



        const upgradeMultiplier =

            UpgradeManager.getTotalMultiplier();



        const gain =

            1

            *

            researchMultiplier

            *

            upgradeMultiplier;



        EPManager.add(gain);


    }



    processResources(){


        /*
         * 将来追加
         * Resource生成
         * Converter処理
         * 実績判定
         * クエスト判定
         */
    }



    debugTick(count = 1){


        const amount =

            Math.max(

                0,

                Number(count) || 0

            );



        for(

            let i = 0;

            i < amount;

            i++

        ){


            this.executeTick();


        }


    }



    getTickCount(){


        return this.tickCount;


    }



    setSpeedMultiplier(value){


        const speed =

            Number(value);



        if(speed > 0){


            this.speedMultiplier = speed;


        }


    }



    getSpeedMultiplier(){


        return this.speedMultiplier;


    }


}



export default new Game();