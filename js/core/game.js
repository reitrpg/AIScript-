/**
 * World Creator
 * Game Core
 *
 * ゲーム全体管理
 */


import eventBus from "./eventBus.js";
import Save from "./save.js";
import Time from "./time.js";


class Game {


    constructor() {

        this.initialized = false;

        this.running = false;

        this.state = {};

    }


    /**
     * 初期化
     */

    init() {

        if (this.initialized) {

            return;

        }


        const saveData =
            Save.load();


        if (saveData) {

            this.state = saveData;

        }
        else {

            this.createNewGame();

        }


        this.initialized = true;


        eventBus.emit(
            "game:initialized",
            this.state
        );

    }


    /**
     * 新規ゲーム作成
     */

    createNewGame() {

        this.state = {

            version: 1,

            resources: {},

            world: {},

            upgrades: {},

            research: {},

            timestamp: Date.now()

        };

    }


    /**
     * ゲーム開始
     */

    start() {

        if (!this.initialized) {

            this.init();

        }


        if (this.running) {

            return;

        }


        this.running = true;


        Time.start();


        eventBus.emit(
            "game:start"
        );

    }


    /**
     * ゲーム停止
     */

    stop() {

        if (!this.running) {

            return;

        }


        this.running = false;


        Time.stop();


        this.save();


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


        eventBus.emit(
            "game:update",
            this.state
        );

    }


    /**
     * 保存
     */

    save() {

        Save.save(
            this.state
        );


        eventBus.emit(
            "game:saved"
        );

    }


    /**
     * 状態取得
     */

    getState() {

        return this.state;

    }


    /**
     * 状態変更
     */

    setState(key, value) {

        this.state[key] = value;


        eventBus.emit(
            "game:stateChanged",
            key,
            value
        );

    }

}


const game = new Game();


export default game;