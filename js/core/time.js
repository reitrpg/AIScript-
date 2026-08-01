/**
 * World Creator
 * Time System
 *
 * Tick / Offline Time Management
 */


class TimeManager {


    constructor(){


        this.tickSpeed = 1000;


        this.timeScale = 1;



        this.lastTime =

        Date.now();


    }



    getTickSpeed(){


        return this.tickSpeed;


    }



    setTickSpeed(value){


        const speed=

        Number(value);



        if(

            speed > 0

        ){


            this.tickSpeed=speed;


        }


    }



    getTimeScale(){


        return this.timeScale;


    }



    setTimeScale(value){


        const scale=

        Number(value);



        if(

            scale > 0

        ){


            this.timeScale=scale;


        }


    }



    getDeltaTime(){


        const now=

        Date.now();



        const delta=

        (

            now -

            this.lastTime

        )

        /

        1000;



        this.lastTime=

        now;



        return delta

        *

        this.timeScale;


    }



    getOfflineSeconds(){


        const now=

        Date.now();



        const elapsed=

        (

            now -

            this.lastTime

        )

        /

        1000;



        this.lastTime=

        now;



        return Math.floor(

            elapsed

            *

            this.timeScale

        );


    }



    getCurrentTime(){


        return Date.now();


    }



}



export default new TimeManager();