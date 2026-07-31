/**
 * World Creator
 * Game Core
 *
 * ゲーム全体管理
 */


import eventBus from "./eventBus.js";
import Save from "./save.js";
import Time from "./time.js";

import ResourceManager from "../resource/Manager.js";
import WorldManager from "../world/Manager.js";
import UpgradeManager from "../upgrade/Manager.js";
import ResearchManager from "../research/Manager.js";


class Game {


    constructor() {


        this.initialized = false;

        this.running = false;


        this.save =
            Save;


        this.time =
            Time;


    }



    /**
     * 初期化
     */

    init() {


        if (this.initialized) {

            return;

        }


        ResourceManager.init();

        UpgradeManager.init();


        this.load();


        this.bindEvents();


        this.initialized = true;



        eventBus.emit(
            "game:initialized"
        );

    }



    /**
     * イベント接続
     */

    bindEvents() {


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


        if (!this.initialized) {

            this.init();

        }


        if (this.running) {

            return;

        }


        this.running = true;


        this.time.start();


        eventBus.emit(
            "game:start"
        );

    }



    /**
     * 停止
     */

    stop() {


        this.running = false;


        this.time.stop();


        this.saveGame();


        eventBus.emit(
            "game:stop"
        );

    }



    /**
     * 更新
     */

    update() {


        if (!this.running) {

            return;

        }


        WorldManager.update();


        eventBus.emit(
            "game:update"
        );

    }



    /**
     * 保存
     */

    saveGame() {


        const data = {


            resources:
                ResourceManager.toJSON(),


            worlds:
                WorldManager.toJSON(),


            upgrades:
                UpgradeManager.toJSON(),


            research:
                ResearchManager.toJSON(),


            time:
                this.time.toJSON()


        };


        this.save.save(
            data
        );

    }



    /**
     * 読込
     */

    load() {


        const data =
            this.save.load();


        if (!data) {

            return;

        }



        ResourceManager.load(
            data.resources
        );


        WorldManager.load(
            data.worlds
        );


        UpgradeManager.load(
            data.upgrades
        );


        ResearchManager.load(
            data.research
        );


        this.time.load(
            data.time
        );

    }



    /**
     * 状態取得
     */

    getState() {


        return {

            initialized:
                this.initialized,

            running:
                this.running

        };

    }


}



const game =
    new Game();


export default game;