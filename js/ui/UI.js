/**
 * World Creator
 * UI System
 *
 * メイン画面生成
 */


import eventBus from "../core/eventBus.js";
import ResourceManager from "../resource/Manager.js";


class UI {


    constructor() {

        this.root = null;

    }



    /**
     * 初期化
     */

    init(id) {


        this.root =
            document.getElementById(
                id
            );


        if (!this.root) {

            console.error(
                "UI root not found"
            );

            return;

        }


        this.render();


        eventBus.on(

            "game:update",

            () => {

                this.update();

            }

        );


    }



    /**
     * 画面生成
     */

    render() {


        this.root.innerHTML = `

        <div class="header">

            <h1>
                World Creator
            </h1>

        </div>


        <div class="panel">

            <h2>
                Resources
            </h2>

            <div id="resource-list">

            </div>

        </div>



        <div class="panel">

            <h2>
                World
            </h2>

            <p id="world-status">

                世界を創造中...

            </p>

        </div>



        <div class="panel">

            <h2>
                Actions
            </h2>


            <button id="create-world">

                Create World

            </button>


        </div>

        `;



        this.bind();

    }



    /**
     * ボタン接続
     */

    bind() {


        const button =
            document.getElementById(
                "create-world"
            );


        if (button) {


            button.onclick = () => {


                eventBus.emit(
                    "world:create"
                );


            };

        }

    }



    /**
     * 更新
     */

    update() {


        const area =
            document.getElementById(
                "resource-list"
            );


        if (!area) {

            return;

        }



        const resources =
            ResourceManager
                .getAll();



        area.innerHTML = "";



        for (
            const key in resources
        ) {


            const item =
                document.createElement(
                    "div"
                );


            item.className =
                "value";


            item.textContent =

                key
                +
                ": "
                +
                resources[key];



            area.appendChild(
                item
            );


        }


    }



}



const ui =
    new UI();


export default ui;