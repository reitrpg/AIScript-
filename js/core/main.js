/**
 * World Creator
 * Main Entry
 *
 * System Initialize
 */


import Game from "./game.js";

import SaveManager from "./save.js";

import TimeManager from "./time.js";

import UI from "../ui/UI.js";

import ResearchUI from "../ui/ResearchUI.js";



class Main {


    constructor(){


        this.initialized=false;


    }



    init(){


        if(

            this.initialized

        ){


            return;


        }



        this.initialized=true;



        this.loadData();



        this.initializeSystem();



        this.startGame();


    }



    loadData(){


        SaveManager.load();


    }



    initializeSystem(){


        TimeManager.getTickSpeed();



        UI.init(

            "game"

        );



        ResearchUI.init(

            "research"

        );


    }



    startGame(){


        Game.start();


    }



}



export default new Main();