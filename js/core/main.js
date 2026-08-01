/**
 * World Creator
 * Main Entry Point
 *
 * System Startup Controller
 */


import SaveManager from "./save.js";

import Game from "./game.js";

import TimeManager from "./time.js";

import UI from "../ui/UI.js";



class Main {


    constructor(){


        this.initialized=false;


        this.running=false;


    }



    init(){


        if(this.initialized){


            return;


        }



        try{


            this.load();



            this.initializeTime();



            this.initializeModes();



            this.initializeUI();



            this.startGame();



            this.initialized=true;


        }

        catch(error){


            console.error(

                "Initialization Error",

                error

            );


        }


    }



    load(){


        SaveManager.load();


    }



    initializeTime(){


        const settings=

        SaveManager.getSettings();



        if(

            settings.tickSpeed

        ){


            TimeManager.setTickSpeed(

                settings.tickSpeed

            );


        }


    }



    initializeModes(){


        const settings=

        SaveManager.getSettings();



        if(

            settings.speedRun

        ){


            this.startSpeedRunMode();


        }



        const debug=

        SaveManager.getDebug();



        if(

            debug.enabled

        ){


            this.startDebugMode();


        }


    }



    initializeUI(){


        UI.init(

            "game"

        );


    }



    startGame(){


        Game.start();


        this.running=true;


    }



    startDebugMode(){


        console.log(

            "Debug Mode Enabled"

        );


    }



    startSpeedRunMode(){


        Game.setSpeedMultiplier(

            2

        );


    }



    stop(){


        Game.stop();


        this.running=false;


    }



}



export default new Main();