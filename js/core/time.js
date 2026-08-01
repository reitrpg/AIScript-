/**
 * World Creator
 * Time System
 *
 * Offline Time Management
 */


class TimeManager {


    constructor(){


        this.key=

        "world_creator_last_time";


    }



    getNow(){


        return Date.now();


    }



    update(){


        localStorage.setItem(

            this.key,

            this.getNow()

        );


    }



    getOfflineSeconds(){


        const last=

        Number(

            localStorage.getItem(

                this.key

            )

        );



        const now=

        this.getNow();



        if(

            !last

        ){


            this.update();


            return 0;


        }



        let seconds=

        Math.floor(

            (

                now-last

            )

            /

            1000

        );



        this.update();



        if(

            seconds<0

        ){


            seconds=0;


        }



        return seconds;


    }



}



export default new TimeManager();