/**
 * World Creator
 * Time System
 *
 * ゲーム時間管理
 */


import eventBus from "./eventBus.js";



class TimeManager {


    constructor() {


        this.interval = null;


        this.tickRate = 1000;


        this.tick = 0;


        this.lastTime =

            Date.now();


        this.running = false;


    }



    /**
     * 開始
     */

    start() {


        if (
            this.running
        ) {

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

                this.tickRate

            );


    }



    /**
     * 停止
     */

    stop() {


        this.running = false;



        if (
            this.interval
        ) {


            clearInterval(

                this.interval

            );


            this.interval = null;


        }


    }



    /**
     * 時間更新
     */

    update() {


        this.tick++;


        this.lastTime =

            Date.now();



        eventBus.emit(

            "time:tick",

            {

                tick:

                    this.tick


            }

        );


    }



    /**
     * オフライン時間計算
     */

    getOfflineTime() {


        return (

            Date.now()

            -

            this.lastTime

        );


    }



    /**
     * 保存用
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

            data.tick

            ??

            0;



        this.lastTime =

            data.lastTime

            ??

            Date.now();


    }


}



const time =

    new TimeManager();



export default time;