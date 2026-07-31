/**
 * World Creator
 * Main Entry
 */


import game from "./game.js";

import ui from "../ui/UI.js";

import router from "../ui/Router.js";

import tabs from "../ui/Tabs.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";



function initialize() {


    ResourceManager.init();


    WorldManager.init();



    ui.init(

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