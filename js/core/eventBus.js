/**
 * World Creator
 * Event Bus
 *
 * システム間通信管理
 */


class EventBus {


    constructor() {


        this.events = {};


    }



    /**
     * イベント登録
     */

    on(
        name,
        callback
    ) {


        if (
            !this.events[name]
        ) {


            this.events[name] = [];


        }



        this.events[name].push(

            callback

        );


    }



    /**
     * イベント発行
     */

    emit(
        name,
        data = null
    ) {


        if (
            !this.events[name]
        ) {

            return;

        }



        this.events[name].forEach(

            callback => {


                try {


                    callback(
                        data
                    );


                }

                catch(error) {


                    console.error(

                        "Event Error:",

                        name,

                        error

                    );


                }


            }

        );


    }



    /**
     * イベント削除
     */

    off(
        name,
        callback
    ) {


        if (
            !this.events[name]
        ) {

            return;

        }



        this.events[name] =

            this.events[name]

            .filter(

                event =>

                    event !== callback

            );


    }



    /**
     * 全削除
     */

    clear() {


        this.events = {};


    }


}



const eventBus =

    new EventBus();



export default eventBus