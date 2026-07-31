/**
 * World Creator
 * Event Bus
 *
 * イベント通信システム
 */


class EventBus {


    constructor() {

        this.events = new Map();

    }



    /**
     * イベント登録
     */

    on(
        event,
        callback
    ) {


        if (
            !this.events.has(event)
        ) {

            this.events.set(
                event,
                []
            );

        }


        this.events
            .get(event)
            .push(
                callback
            );

    }



    /**
     * 一度だけ実行
     */

    once(
        event,
        callback
    ) {


        const wrapper =
            (...args) => {


                callback(
                    ...args
                );


                this.off(
                    event,
                    wrapper
                );


            };


        this.on(
            event,
            wrapper
        );

    }



    /**
     * イベント削除
     */

    off(
        event,
        callback
    ) {


        const listeners =
            this.events.get(
                event
            );


        if (!listeners) {

            return;

        }


        const index =
            listeners.indexOf(
                callback
            );


        if (
            index !== -1
        ) {

            listeners.splice(
                index,
                1
            );

        }

    }



    /**
     * 発火
     */

    emit(
        event,
        ...args
    ) {


        const listeners =
            this.events.get(
                event
            );


        if (!listeners) {

            return;

        }


        for (
            const callback
            of [
                ...listeners
            ]
        ) {


            try {

                callback(
                    ...args
                );

            }
            catch(error) {

                console.error(
                    "EventBus Error:",
                    error
                );

            }

        }

    }



    /**
     * 全削除
     */

    clear() {

        this.events.clear();

    }



    /**
     * イベント一覧
     */

    list() {

        return [
            ...this.events.keys()
        ];

    }


}



const eventBus =
    new EventBus();


export default eventBus;