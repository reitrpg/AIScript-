/**
 * World Creator
 * Game Core
 *
 * Main Game Loop Controller
 */


import TimeManager from "./time.js";

import SaveManager from "./save.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import EPManager from "../ep/Manager.js";

import eventBus from "./eventBus.js";



class Game {


    constructor(){


        this.running=false;


        this.tickTimer=null;


        this.saveTimer=null;



        this.baseEPGain=1;


        this.speedMultiplier=1;



        this.autoSaveTime=300000;


    }



    start(){


        if(this.running){


            return;


        }



        this.running=true;



        this.applyOfflineProgress();



        this.startTick();



        this.startAutoSave();


    }



    startTick(){


        this.stopTick();



        this.tickTimer=setInterval(


            ()=>{


                this.tick();


            },


            this.getTickSpeed()


        );


    }



    stopTick(){


        if(this.tickTimer){


            clearInterval(

                this.tickTimer

            );


        }



        this.tickTimer=null;


    }



    restartTick(){


        if(!this.running){


            return;


        }



        this.startTick();


    }



    getTickSpeed(){


        return (

            TimeManager.getTickSpeed()

            /

            this.speedMultiplier

        );


    }



    setSpeedMultiplier(value){


        const speed=

        Number(value);



        if(

            speed>0

        ){


            this.speedMultiplier=speed;



            this.restartTick();


        }


    }



    getSpeedMultiplier(){


        return this.speedMultiplier;


    }



    startAutoSave(){


        this.stopAutoSave();



        this.saveTimer=setInterval(


            ()=>{


                this.save();


            },


            this.autoSaveTime


        );


    }



    stopAutoSave(){


        if(this.saveTimer){


            clearInterval(

                this.saveTimer

            );


        }



        this.saveTimer=null;


    }



    setAutoSaveTime(value){


        const time=

        Number(value);



        if(

            time>0

        ){


            this.autoSaveTime=time;



            if(this.running){


                this.startAutoSave();


            }


        }


    }



    save(){


        SaveManager.save();



        eventBus.emit(

            "save:complete"

        );


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


            this.tick();


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


        let value=

        this.baseEPGain;



        // Upgrade補正接続予定



        return value;


    }



    setEPGain(value){


        this.baseEPGain=

        Number(value)

        ||

        0;


    }



    debugTick(amount){


        this.tick();



        if(

            amount

        ){


            for(

                let i=1;

                i<amount;

                i++

            ){


                this.tick();


            }


        }


    }



    stop(){


        this.stopTick();


        this.stopAutoSave();



        this.running=false;


    }



}



export default new Game();