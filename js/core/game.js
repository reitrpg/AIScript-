/**
 * World Creator
 * Game Core
 *
 * Research Connect Version
 */


import eventBus from "./eventBus.js";

import time from "./time.js";

import save from "./save.js";


import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import Converter from "../resource/Converter.js";

import ResearchManager from "../research/Manager.js";



class Game {


    constructor() {


        this.running = false;


        this.initialized = false;


    }



    init() {


        if (

            this.initialized

        ) {


            return;


        }



        ResourceManager.init();


        WorldManager.init();


        ResearchManager.init();



        this.bind();



        this.initialized = true;


    }



    bind() {


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



    start() {


        if (

            this.running

        ) {


            return;


        }



        this.running = true;


        time.start();


    }



    stop() {


        this.running = false;


        time.stop();


        this.save();


    }



    update() {


        if (

            !this.running

        ) {


            return;


        }



        /*
            資源生産
        */


        ResourceManager.add(

            "wood",

            1

        );


        ResourceManager.add(

            "stone",

            1

        );



        Converter.tick();



        /*
            研究ポイント
        */


        ResearchManager.addPoint(

            1

        );



        WorldManager.update();



        eventBus.emit(

            "game:update"

        );


    }



    save() {


        save.save({


            resources:

                ResourceManager.toJSON(),



            world:

                WorldManager.toJSON(),



            research:

                ResearchManager.toJSON(),



            time:

                time.toJSON()



        });


    }



    load() {


        const data =

            save.load();



        if (!data) {


            return;


        }



        ResourceManager.load(

            data.resources

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