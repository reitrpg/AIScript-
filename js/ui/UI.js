/**
 * World Creator
 * UI System
 *
 * ユーザーインターフェース管理
 */


import eventBus from "../core/eventBus.js";


class UI {


    constructor() {

        this.elements = new Map();

        this.container = null;

    }



    /**
     * 初期化
     */

    init(containerId = "app") {


        this.container =
            document.getElementById(
                containerId
            );


        if (!this.container) {

            this.container =
                document.body;

        }


        eventBus.emit(
            "ui:initialized"
        );

    }



    /**
     * 要素登録
     */

    register(id, element) {


        this.elements.set(
            id,
            element
        );


    }



    /**
     * 要素取得
     */

    get(id) {

        return this.elements.get(id);

    }



    /**
     * 表示
     */

    show(id) {


        const element =
            this.get(id);


        if (!element) {

            return false;

        }


        element.style.display =
            "";


        return true;

    }



    /**
     * 非表示
     */

    hide(id) {


        const element =
            this.get(id);


        if (!element) {

            return false;

        }


        element.style.display =
            "none";


        return true;

    }



    /**
     * HTML生成
     */

    create(tag, options = {}) {


        const element =
            document.createElement(
                tag
            );


        if (options.id) {

            element.id =
                options.id;

        }


        if (options.class) {

            element.className =
                options.class;

        }


        if (options.text) {

            element.textContent =
                options.text;

        }


        return element;

    }



    /**
     * 追加
     */

    append(element) {


        if (!this.container) {

            return;

        }


        this.container.appendChild(
            element
        );

    }



    /**
     * 更新通知
     */

    refresh() {


        eventBus.emit(
            "ui:update"
        );

    }


}



const ui =
    new UI();


export default ui;