/**
 * World Creator
 * Time System
 *
 * Offline Progress
 */


class Time {


    constructor(){


        this.lastTime = null;


        this.running = false;


        this.maxOfflineTime =

            86400;


    }



    start(){


        const now =

        Date.now();



        const saved =

        localStorage.getItem(

            "world_creator_last_time"

        );



        if(saved){


            this.lastTime =

            Number(saved);



        }else{


            this.lastTime = now;


        }



        localStorage.setItem(

            "world_creator_last_time",

            now

        );



        this.running = true;



    }



    getOfflineSeconds(){


        const now =

        Date.now();



        if(!this.lastTime){


            return 0;


        }



        let seconds =

        Math.floor(

            (

                now -

                this.lastTime

            )

            /

            1000

        );



        if(

            seconds >

            this.maxOfflineTime

        ){


            seconds =

            this.maxOfflineTime;


        }



        this.lastTime = now;



        localStorage.setItem(

            "world_creator_last_time",

            now

        );



        return seconds;


    }



    update(){


        this.lastTime =

        Date.now();



    }



}



export default new Time();