/**
 * World Creator
 * Time System
 *
 * Stable Tick Version
 */


import eventBus from "./eventBus.js";



class TimeManager {


    constructor() {


        this.interval = null;


        this.tickRate = 1000;


        this.tick = 0;


        this.lastTime = Date.now();


        this.running = false;


    }



    start() {


        if (

            this.running

        ) {


            return;


        }



        this.running = true;


        this.lastTime = Date.now();



        this.interval = setInterval(

            () => {


                this.update();


            },

            this.tickRate

        );



        console.log(

            "[Time] Started"

        );


    }



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



    update() {


        if (

            !this.running

        ) {


            return;


        }



        this.tick++;


        this.lastTime = Date.now();



        eventBus.emit(

            "time:tick",

            {

                tick:

                    this.tick

            }

        );


    }



    toJSON() {


        return {


            tick:

                this.tick,


            lastTime:

                this.lastTime


        };


    }



    load(data) {


        if (

            !data

        ) {


            return;


        }



        this.tick =

            data.tick ??

            0;



        this.lastTime =

            data.lastTime ??

            Date.now();


    }



}



const time =

    new TimeManager();



export default time;