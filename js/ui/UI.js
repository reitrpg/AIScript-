/**
 * World Creator
 * UI System
 *
 * ゲーム画面UI
 */


import eventBus from "../core/eventBus.js";

import ResourceManager from "../resource/Manager.js";
import WorldManager from "../world/Manager.js";



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

            return;

        }



        this.render();


        this.bind();


        this.update();


    }



    /**
     * 描画
     */

    render() {


        this.root.innerHTML = `


        <div class="header">

            <h1>
                World Creator
            </h1>

            <p>
                Create your world
            </p>

        </div>



        <div class="panel">


            <h2>
                Resources
            </h2>


            <div
                id="resource-list"
            ></div>


        </div>




        <div class="panel">


            <h2>
                World Status
            </h2>


            <div
                id="world-info"
            >

            </div>


        </div>




        <div class="panel">


            <h2>
                Actions
            </h2>


            <button
                id="create-world"
            >

                Create World

            </button>


            <button
                id="save-game"
            >

                Save

            </button>


        </div>



        `;


    }



    /**
     * イベント設定
     */

    bind() {


        document

        .getElementById(
            "create-world"
        )

        .onclick = () => {


            eventBus.emit(
                "world:create"
            );


        };



        document

        .getElementById(
            "save-game"
        )

        .onclick = () => {


            eventBus.emit(
                "game:save"
            );


        };



        eventBus.on(

            "game:update",

            () => {


                this.update();


            }

        );



        eventBus.on(

            "world:created",

            () => {


                this.update();


            }

        );


    }



    /**
     * 更新
     */

    update() {


        this.updateResources();


        this.updateWorld();


    }



    /**
     * 資源表示
     */

    updateResources() {


        const area =

            document.getElementById(
                "resource-list"
            );



        if (!area) {

            return;

        }



        const data =

            ResourceManager.getAll();



        area.innerHTML = "";



        for (
            const key in data
        ) {


            const div =

                document.createElement(
                    "div"
                );


            div.className =
                "value";


            div.textContent =

                key
                +
                " : "
                +
                data[key];



            area.appendChild(
                div
            );


        }


    }



    /**
     * 世界表示
     */

    updateWorld() {


        const area =

            document.getElementById(
                "world-info"
            );



        if (!area) {

            return;

        }



        const world =

            WorldManager.getCurrent();



        if (!world) {


            area.textContent =

                "No World";


            return;


        }



        area.innerHTML = `


            Level:
            ${world.level}

            <br>


            Age:
            ${world.age.value}e${world.age.exponent}


            <br>


            Population:
            ${world.population}


        `;


    }


}



const ui =

    new UI();



export default ui;