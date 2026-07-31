/**
 * World Creator
 * Tabs System
 *
 * タブ切替管理
 */


import eventBus from "../core/eventBus.js";



class Tabs {


    constructor() {


        this.tabs = {};

        this.active = null;


    }



    /**
     * 初期化
     */

    init() {


        const elements =

            document.querySelectorAll(

                "[data-tab]"

            );



        elements.forEach(

            element => {


                this.register(

                    element.dataset.tab,

                    element

                );


            }

        );


    }



    /**
     * 登録
     */

    register(
        id,
        element
    ) {


        this.tabs[id] =

            element;



        element.onclick = () => {


            this.open(

                id

            );


        };


    }



    /**
     * 表示切替
     */

    open(id) {


        this.active =

            id;



        for (
            const key in this.tabs
        ) {


            const element =

                this.tabs[key];



            if (
                key === id
            ) {


                element.classList.add(

                    "active"

                );


            }

            else {


                element.classList.remove(

                    "active"

                );


            }


        }



        eventBus.emit(

            "tab:change",

            id

        );


    }



    /**
     * 現在タブ取得
     */

    getCurrent() {


        return this.active;


    }


}



const tabs =

    new Tabs();



export default tabs;