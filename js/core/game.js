/**
 * World Creator
 * Game Loop
 *
 * Main Processing System
 */


import time from "./time.js";

import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import ResearchManager from "../research/Manager.js";

import SaveManager from "./save.js";

import eventBus from "./eventBus.js";



class Game {


    constructor(){


        this.running=false;


        this.interval=null;


        this.tickRate=1000;


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

            this.tickRate

        );


    }



    tick(){


        this.productionTick();


    }



    productionTick(){


        const world=

        WorldManager.getCurrent();



        if(!world){


            return;

        }



        /*
         * 世界経験値
         */


        WorldManager.addExp(

            1

        );



        /*
         * 資源生産
         */


        ResourceManager.update();



        /*
         * 研究進行
         */


        this.updateResearch();



        /*
         * 保存
         */


        SaveManager.save();



        eventBus.emit(

            "game:tick"

        );


    }



    updateResearch(){


        const research=

        ResearchManager.getAll();



        Object.values(

            research

        )

        .forEach(

            item=>{


                if(

                    item.level < item.max

                ){


                    item.addProgress(

                        1

                    );


                }


            }

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


        if(this.interval){


            clearInterval(

                this.interval

            );



            this.interval=null;


        }



        this.running=false;


    }



}



export default new Game();