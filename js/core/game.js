/**
 * World Creator
 * Game Core
 *
 * ゲーム進行管理
 */


import eventBus from "./eventBus.js";
import save from "./save.js";
import time from "./time.js";

import ResourceManager from "../resource/Manager.js";
import Converter from "../resource/Converter.js";

import WorldManager from "../world/Manager.js";

import UpgradeManager from "../upgrade/Manager.js";
import ResearchManager from "../research/Manager.js";



class Game {


    constructor() {


        this.initialized = false;

        this.running = false;


    }



    /**
     * 初期化
     */

    init() {


        if (
            this.initialized
        ) {

            return;

        }



        ResourceManager.init();


        WorldManager.init();


        UpgradeManager.init();


        ResearchManager.init();



        this.bind();



        this.initialized = true;



        eventBus.emit(
            "game:initialized"
        );


    }



    /**
     * イベント接続
     */

    bind() {


        eventBus.on(

            "time:tick",

            () => {


                this.update();


            }

        );


    }



    /**
     * 開始
     */

    start() {


        if (
            !this.initialized
        ) {

            this.init();

        }



        if (
            this.running
        ) {

            return;

        }



        this.running = true;


        time.start();



        eventBus.emit(
            "game:start"
        );


    }



    /**
     * 停止
     */

    stop() {


        this.running = false;


        time.stop();


        this.saveGame();


    }



    /**
     * Tick更新
     */

    update() {


        if (
            !this.running
        ) {

            return;

        }



        /*
            資源生産
        */


        ResourceManager.add(

            "wood",

            1

        );



        ResourceManager.add(

            "stone",

            1

        );



        /*
            変換処理
        */


        Converter.tick();



        /*
            世界更新
        */


        WorldManager.update();



        eventBus.emit(

            "game:update"

        );


    }



    /**
     * 保存
     */

    saveGame() {


        save.save({

            resources:

                ResourceManager.toJSON(),


            worlds:

                WorldManager.toJSON(),


            upgrades:

                UpgradeManager.toJSON(),


            research:

                ResearchManager.toJSON(),


            time:

                time.toJSON()


        });


    }



    /**
     * 読込
     */

    load() {


        const data =
            save.load();



        if (!data) {

            return;

        }



        ResourceManager.load(
            data.resources
        );


        WorldManager.load(
            data.worlds
        );


        time.load(
            data.time
        );


    }


}



const game =

    new Game();



export default game;