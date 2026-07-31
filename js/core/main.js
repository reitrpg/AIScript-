/**
 * World Creator
 * Main Entry
 *
 * アプリ起動管理
 */


import game from "./game.js";

import ui from "../ui/UI.js";

import router from "../ui/Router.js";

import tabs from "../ui/Tabs.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import eventBus from "./eventBus.js";



function initialize() {


    ui.init(
        "app"
    );


    ResourceManager.init();


    WorldManager.init();


    router.init(
        "/"
    );


    tabs.init();


    game.init();


    game.start();



    eventBus.emit(

        "app:ready"

    );


}



/**
 * DOM読込後起動
 */

if (

    document.readyState === "loading"

) {


    document.addEventListener(

        "DOMContentLoaded",

        initialize

    );


}
else {


    initialize();


}