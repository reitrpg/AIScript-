/**
 * World Creator
 * Tabs System
 *
 * SPAタブ管理
 */


import eventBus from "../core/eventBus.js";


class Tabs {


    constructor() {

        this.tabs = new Map();

        this.active = null;

    }



    /**
     * タブ登録
     */

    register(
        id,
        element
    ) {


        this.tabs.set(
            id,
            element
        );


    }



    /**
     * タブ切替
     */

    open(id) {


        const target =
            this.tabs.get(id);


        if (!target) {

            return false;

        }



        for (
            const [
                tabId,
                element
            ]
            of this.tabs
        ) {


            if (
                tabId === id
            ) {

                element.style.display =
                    "";

            }
            else {

                element.style.display =
                    "none";

            }

        }



        this.active =
            id;



        eventBus.emit(
            "tabs:changed",
            id
        );


        return true;

    }



    /**
     * 現在タブ取得
     */

    current() {

        return this.active;

    }



    /**
     * 全取得
     */

    getAll() {

        return this.tabs;

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            active:
                this.active

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        if (data.active) {

            this.open(
                data.active
            );

        }

    }


}



const tabs =
    new Tabs();


export default tabs;