/**
 * World Creator
 * Main Entry
 *
 * Research Connect Version
 */


import game from "./game.js";

import ui from "../ui/UI.js";

import researchUI from "../ui/Research.js";

import router from "../ui/Router.js";

import tabs from "../ui/Tabs.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import ResearchManager from "../research/Manager.js";



function initialize() {


    console.log(

        "[World Creator] Starting..."

    );



    ResourceManager.init();


    WorldManager.init();


    ResearchManager.init();



    ui.init(

        "app"

    );



    researchUI.init(

        "app"

    );



    router.init(

        "/"

    );



    tabs.init();



    game.init();


    game.start();



}



if (

    document.readyState ===

    "loading"

) {


    document.addEventListener(

        "DOMContentLoaded",

        initialize

    );


}

else {


    initialize();


}