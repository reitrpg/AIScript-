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



/**
 * アプリ初期化
 */

function initialize() {


    ui.init(
        "app"
    );


    setupRouter();


    setupTabs();


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


    const tabElements =
        document.querySelectorAll(
            "[data-tab]"
        );



    tabElements.forEach(

        element => {


            const id =
                element.dataset.tab;


            tabs.register(
                id,
                element
            );


        }

    );


}



/**
 * DOM読み込み後起動
 */

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