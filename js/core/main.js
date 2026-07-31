/**
 * World Creator
 * Main Entry
 *
 * Debug Version
 */


import game from "./game.js";

import ui from "../ui/UI.js";

import router from "../ui/Router.js";

import tabs from "../ui/Tabs.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";



function initialize() {


    console.log(

        "[World Creator] Starting..."

    );



    ResourceManager.init();


    console.log(

        "[Resource] Initialized"

    );



    WorldManager.init();


    console.log(

        "[World] Initialized"

    );



    ui.init(

        "app"

    );


    console.log(

        "[UI] Initialized"

    );



    router.init(

        "/"

    );



    tabs.init();



    console.log(

        "[Navigation] Initialized"

    );



    game.init();


    console.log(

        "[Game] Initialized"

    );



    game.start();


    console.log(

        "[Game] Started"

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