/**
 * World Creator
 * Main Entry
 *
 * アプリケーション起動処理
 */


import Settings from "./settings.js";
import eventBus from "./eventBus.js";
import game from "./game.js";


/**
 * 初期化
 */

function initialize() {

    console.log(
        `${Settings.appName} v${Settings.version}`
    );


    registerEvents();


    game.init();


    game.start();

}


/**
 * Event登録
 */

function registerEvents() {


    eventBus.on(
        "game:initialized",
        (state) => {

            console.log(
                "Game initialized",
                state
            );

        }
    );


    eventBus.on(
        "game:start",
        () => {

            console.log(
                "Game started"
            );

        }
    );


    eventBus.on(
        "game:saved",
        () => {

            console.log(
                "Game saved"
            );

        }
    );


}


/**
 * メインループ
 */

function loop() {

    game.update();


    requestAnimationFrame(
        loop
    );

}


/**
 * 起動
 */

window.addEventListener(
    "DOMContentLoaded",
    () => {

        initialize();

        loop();

    }
);