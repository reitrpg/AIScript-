/**
 * World Creator
 * Event Bus
 *
 * モジュール間通信管理
 */


class EventBus {


    constructor() {

        this.events = new Map();

    }


    /**
     * イベント登録
     */

    on(event, callback) {

        if (!this.events.has(event)) {

            this.events.set(event, []);

        }


        this.events
            .get(event)
            .push(callback);

    }


    /**
     * 一度だけ実行
     */

    once(event, callback) {

        const wrapper = (...args) => {

            callback(...args);

            this.off(event, wrapper);

        };


        this.on(event, wrapper);

    }


    /**
     * イベント削除
     */

    off(event, callback) {

        if (!this.events.has(event)) {

            return;

        }


        const listeners =
            this.events.get(event);


        const index =
            listeners.indexOf(callback);


        if (index !== -1) {

            listeners.splice(index, 1);

        }


    }


    /**
     * イベント発行
     */

    emit(event, ...args) {

        if (!this.events.has(event)) {

            return;

        }


        const listeners =
            this.events.get(event);


        for (const callback of listeners) {

            callback(...args);

        }

    }


    /**
     * 全削除
     */

    clear() {

        this.events.clear();

    }

}


const eventBus = new EventBus();


export default eventBus;