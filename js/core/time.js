/**
 * World Creator
 * Time Manager
 *
 * Integrated Version
 */


import eventBus from "./eventBus.js";



class TimeManager {


    constructor(){


        this.interval = null;


        this.tick = 0;


        this.running = false;


    }



    start(){


        if(this.running){


            return;


        }



        this.running = true;



        this.interval = setInterval(

            ()=>{


                this.tick++;



                eventBus.emit(

                    "time:tick",

                    this.tick

                );


            },

            1000

        );


    }



    stop(){


        if(this.interval){


            clearInterval(

                this.interval

            );


            this.interval = null;


        }



        this.running = false;


    }



    getTick(){


        return this.tick;


    }



    toJSON(){


        return {


            tick:

                this.tick


        };


    }



    load(data){


        if(!data){


            return;


        }



        this.tick =

            data.tick ?? 0;


    }


}



const time =

    new TimeManager();



export default time;