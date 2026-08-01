/**
 * World Creator
 * Main Entry
 *
 * Research Final Connect
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

        "[World Creator] Boot"

    );



    /*
        Data Initialize
    */


    ResourceManager.init();


    WorldManager.init();


    ResearchManager.init();



    /*
        UI Initialize
    */


    ui.init(

        "app"

    );



    researchUI.init();



    router.init(

        "/"

    );



    tabs.init();



    /*
        Game Initialize
    */


    game.init();


    game.start();



    console.log(

        "[World Creator] Running"

    );


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