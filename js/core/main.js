/**
 * World Creator
 * Main Entry
 *
 * アプリ起動処理
 */


import game from "./game.js";
import ui from "../ui/UI.js";
import router from "../ui/Router.js";
import tabs from "../ui/Tabs.js";

import eventBus from "./eventBus.js";

import WorldManager from "../world/Manager.js";
import ResourceManager from "../resource/Manager.js";



/**
 * アプリ初期化
 */

function initialize() {


    ui.init(
        "app"
    );


    setupRouter();


    setupTabs();


    ResourceManager.init();


    WorldManager.init();


    game.init();


    game.start();



    eventBus.emit(
        "app:ready"
    );


}



/**
 * ルーター設定
 */

function setupRouter() {


    router.register(

        "/",

        () => {

            eventBus.emit(
                "page:home"
            );

        }

    );


    router.register(

        "/world",

        () => {

            eventBus.emit(
                "page:world"
            );

        }

    );


    router.register(

        "/research",

        () => {

            eventBus.emit(
                "page:research"
            );

        }

    );


    router.init(
        "/"
    );

}



/**
 * タブ設定
 */

function setupTabs() {


    const elements =

        document.querySelectorAll(
            "[data-tab]"
        );



   