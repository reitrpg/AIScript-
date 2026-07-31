/**
 * World Creator
 * Time System
 *
 * ゲーム時間管理
 */


import settings from "./settings.js";
import eventBus from "./eventBus.js";


class Time {


    constructor() {

        this.interval = null;

        this.lastTime =
            Date.now();

        this.running = false;

        this.tick =
            0;

    }



    /**
     * 開始
     */

    start() {


        if (this.running) {

            return;

        }


        this.running = true;


        this.lastTime =
            Date.now();



        this.interval =
            setInterval(

                () => {

                    this.update();

                },

                settings.time.tickRate

            );

    }



    /**
     * 停止
     */

    stop() {


        if (!this.running) {

            return;

        }


        clearInterval(
            this.interval
        );


        this.interval = null;

        this.running = false;

    }



    /**
     * 更新
     */

    update() {


        const now =
            Date.now();


        const delta =
            now -
            this.lastTime;


        this.lastTime =
            now;


        this.tick++;


        eventBus.emit(

            "time:tick",

            {

                tick:
                    this.tick,

                delta

            }

        );

    }



    /**
     * 現在tick取得
     */

    getTick() {

        return this.tick;

    }



    /**
     * 経過時間取得
     */

    getDelta() {

        return (
            Date.now()
            -
            this.lastTime
        );

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            tick:
                this.tick,

            lastTime:
                this.lastTime

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.tick =
            data.tick ?? 0;


        this.lastTime =
            data.lastTime ??
            Date.now();

    }


}



const time =
    new Time();


export default time;