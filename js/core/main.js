/**
 * World Creator
 * Main Entry
 *
 * Game Initialize
 */


import Game from "./game.js";

import SaveManager from "./save.js";

import UI from "../ui/UI.js";

import ResearchUI from "../ui/ResearchUI.js";



class Main {


    constructor(){


        this.initialized=false;


    }



    init(){


        if(this.initialized){


            return;


        }



        this.initialized=true;



        SaveManager.load();



        UI.init(

            "game"

        );



        ResearchUI.init(

            "research"

        );



        Game.start();


    }



}



export default new Main();