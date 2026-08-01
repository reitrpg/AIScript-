/**
 * World Creator
 * Game Core
 *
 * Integrated Version
 */


import eventBus from "./eventBus.js";

import time from "./time.js";

import save from "./save.js";


import ResourceManager from "../resource/Manager.js";

import Converter from "../resource/Converter.js";

import WorldManager from "../world/Manager.js";

import ResearchManager from "../research/Manager.js";



class Game {


    constructor(){


        this.running = false;


    }



    init(){


        ResourceManager.init();


        WorldManager.init();


        ResearchManager.init();



        eventBus.on(

            "time:tick",

            () => {


                this.update();


            }

        );



        eventBus.on(

            "game:save",

            () => {


                this.save();


            }

        );


    }



    start(){


        if(this.running){


            return;


        }



        this.running = true;


        time.start();


    }



    stop(){


        this.running = false;


        time.stop();


        this.save();


    }



    update(){


        if(!this.running){


            return;


        }



        /*
            資源生産
        */


        ResourceManager.update();



        /*
            資源変換
        */


        Converter.tick();



        /*
            研究ポイント
        */


        ResearchManager.addPoint(

            1

        );



        /*
            世界更新
        */


        WorldManager.update();



        /*
            UI更新通知
        */


        eventBus.emit(

            "resource:update"

        );


        eventBus.emit(

            "research:update"

        );


        eventBus.emit(

            "world:update"

        );


        eventBus.emit(

            "game:update"

        );


    }



    save(){


        save.save({


            resource:

                ResourceManager.toJSON(),



            world:

                WorldManager.toJSON(),



            research:

                ResearchManager.toJSON(),



            time:

                time.toJSON()



        });


    }



    load(){


        const data =

            save.load();



        if(!data){


            return;


        }



        ResourceManager.load(

            data.resource

        );



        WorldManager.load(

            data.world

        );



        ResearchManager.load(

            data.research

        );



        time.load(

            data.time

        );


    }


}



const game =

    new Game();



export default game;