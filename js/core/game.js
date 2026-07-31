/**
 * World Creator
 * Game Core
 *
 * ゲーム進行管理
 */


import eventBus from "./eventBus.js";

import time from "./time.js";

import save from "./save.js";


import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";

import Converter from "../resource/Converter.js";



class Game {


    constructor() {


        this.running = false;

        this.initialized = false;


    }



    /**
     * 初期化
     */

    init() {


        if (
            this.initialized
        ) {

            return;

        }



        ResourceManager.init();

        WorldManager.init();



        this.bind();



        this.initialized = true;


    }



    /**
     * イベント登録
     */

    bind() {


        eventBus.on(

            "time:tick",

            () => {


                this.update();


            }

        );



        eventBus.on(

            "game:save",

            () => {


                this.save();


            }

        );


    }



    /**
     * 開始
     */

    start() {


        if (
            !this.initialized
        ) {

            this.init();

        }



        if (
            this.running
        ) {

            return;

        }



        this.running = true;


        time.start();


    }



    /**
     * 停止
     */

    stop() {


        this.running = false;


        time.stop();


        this.save();


    }



    /**
     * 1Tick処理
     */

    update() {


        if (
            !this.running
        ) {

            return;

        }



        /*
         基本生産
        */


        ResourceManager.add(

            "wood",

            1

        );


        ResourceManager.add(

            "stone",

            1

        );



        Converter.tick();



        WorldManager.update();



        eventBus.emit(

            "game:update"

        );


    }



    /**
     * 保存
     */

    save() {


        save.save({

            resources:

                ResourceManager.toJSON(),


            world:

                WorldManager.toJSON(),


            time:

                time.toJSON()


        });


    }



    /**
     * 読込
     */

    load() {


        const data =

            save.load();



        if (!data) {

            return;

        }



        ResourceManager.load(

            data.resources

        );