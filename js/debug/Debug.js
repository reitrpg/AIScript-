/**
 * World Creator
 * Debug System
 *
 * デバッグ管理
 */


import eventBus from "../core/eventBus.js";


class Debug {


    constructor() {

        this.enabled = false;

        this.logs = [];

    }



    /**
     * 有効化
     */

    enable() {

        this.enabled = true;

        this.log(
            "Debug enabled"
        );

    }



    /**
     * 無効化
     */

    disable() {

        this.enabled = false;

    }



    /**
     * 状態確認
     */

    isEnabled() {

        return this.enabled;

    }



    /**
     * ログ記録
     */

    log(...args) {


        const entry = {

            time:
                Date.now(),

            data:
                args

        };


        this.logs.push(
            entry
        );


        if (this.enabled) {

            console.log(
                "[World Creator]",
                ...args
            );

        }


        eventBus.emit(
            "debug:log",
            entry
        );

    }



    /**
     * エラー記録
     */

    error(...args) {


        const entry = {

            time:
                Date.now(),

            type:
                "error",

            data:
                args

        };


        this.logs.push(
            entry
        );


        console.error(
            "[World Creator]",
            ...args
        );


    }



    /**
     * ログ取得
     */

    getLogs() {

        return this.logs;

    }



    /**
     * ログ削除
     */

    clear() {

        this.logs = [];

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            enabled:
                this.enabled,

            logs:
                this.logs

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.enabled =
            data.enabled ?? false;


        this.logs =
            data.logs ?? [];

    }


}



const debug =
    new Debug();


export default debug;