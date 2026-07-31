/**
 * World Creator
 * UI System
 *
 * メイン画面表示管理
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
     * 画面生成
     */

    render() {


        this.root.innerHTML = `


        <div class="header">

            <h1>
                World Creator
            </h1>

            <p>
                Create and evolve your world
            </p>

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


            <div id="world-info">

            </div>


        </div>



        <div class="panel">


            <button id="create-world">

                Create World

            </button>



            <button id="save-game">

                Save Game

            </button>


        </div>


        `;


    }



    /**
     * イベント接続
     */

    bind() {


        const createButton =

            document.getElementById(

                "create-world"

            );



        if (createButton) {


            createButton.onclick = () => {


                eventBus.emit(

                    "world:create"

                );


            };


        }



        const saveButton =

            document.getElementById(

                "save-game"

            );



        if (saveButton) {


            saveButton.onclick = () => {


                eventBus.emit(

                    "game:save"

                );


            };


        }



        eventBus.on(

            "game:update",

            () => {


                this.update();


            }

        );



        eventBus.on(

            "resource:update",

            ()