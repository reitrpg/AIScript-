/**
 * World Creator
 * Time System
 *
 * Offline Progress Support
 */


class Time {


    constructor(){


        this.key=

        "world_creator_last_time";


    }



    getCurrentTime(){


        return Date.now();


    }



    save(){


        localStorage.setItem(

            this.key,

            String(

                this.getCurrentTime()

            )

        );


    }



    getLastTime(){


        const value=

        localStorage.getItem(

            this.key

        );



        if(!value){


            this.save();



            return this.getCurrentTime();


        }



        return Number(

            value

        );


    }



    getOfflineSeconds(){


        const now=

        this.getCurrentTime();



        const last=

        this.getLastTime();



        this.save();



        let seconds=

        Math.floor(

            (

                now-last

            )

            /

            1000

        );



        if(

            seconds<0

        ){


            seconds=0;


        }



        /*
         * 最大24時間分のみ処理
         */


        if(

            seconds>86400

        ){


            seconds=86400;


        }



        return seconds;


    }



}



export default new Time();