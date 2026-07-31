/**
 * World Creator
 * UI System
 *
 * メイン画面管理
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


        this.bindEvents();


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
                World
            </h2>


            <div
                id="world-info"
            >

                未生成

            </div>


        </div>



        <div class="panel">

            <button
                id="create-world"
            >

                Create World

            </button>


        </div>


        `;


    }



    /**
     * イベント接続
     */

    bindEvents() {


        const button =

            document.getElementById(
                "create-world"
           