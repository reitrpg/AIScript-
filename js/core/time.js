/**
 * World Creator
 * Time System
 *
 * ゲーム時間管理
 */


import Settings from "./settings.js";


class Time {


    constructor() {

        this.startTime = Date.now();

        this.lastUpdate = Date.now();

        this.elapsed = 0;

        this.delta = 0;

        this.tick = 0;

        this.running = false;

        this.timer = null;

    }


    /**
     * 開始
     */

    start() {

        if (this.running) {

            return;

        }


        this.running = true;

        this.lastUpdate = Date.now();


        this.timer = setInterval(
            () => {

                this.update();

            },
            Settings.tickRate
        );

    }


    /**
     * 停止
     */

    stop() {

        this.running = false;


        if (this.timer) {

            clearInterval(this.timer);

            this.timer = null;

        }

    }


    /**
     * 更新
     */

    update() {

        const now = Date.now();


        this.delta =
            now - this.lastUpdate;


        this.elapsed += this.delta;


        this.lastUpdate = now;


        this.tick++;

    }


    /**
     * 経過時間取得
     */

    getElapsed() {

        return this.elapsed;

    }


    /**
     * 秒単位取得
     */

    getSeconds() {

        return Math.floor(
            this.elapsed / 1000
        );

    }


    /**
     * 状態保存
     */

    getState() {

        return {

            elapsed: this.elapsed,

            tick: this.tick

        };

    }


    /**
     * 状態復元
     */

    loadState(data) {

        if (!data) {

            return;

        }


        this.elapsed =
            data.elapsed ?? 0;


        this.tick =
            data.tick ?? 0;


    }

}


const time = new Time();


export default time;