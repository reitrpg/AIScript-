/**
 * World Creator
 * Game Core
 *
 * Operation Check Version
 */


import eventBus from "./eventBus.js";

import time from "./time.js";

import save from "./save.js";


import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import Converter from "../resource/Converter.js";



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



        this.bind();


        this.initialized = true;



        console.log(

            "[Game] Ready"

        );


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



        console.log(

            "[Game] Running"

        );


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
         基本生産
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



            time:

                time.toJSON()



        });



        console.log(

            "[Game] Saved"

        );


    }


}



const game =

    new Game();



export default game;