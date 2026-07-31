/**
 * World Creator
 * World Manager
 *
 * 世界管理システム
 */


import eventBus from "../core/eventBus.js";
import BigNumber from "../number/BigNumber.js";


class WorldManager {


    constructor() {


        this.worlds = [];

        this.activeWorld = null;

        this.initialized = false;

    }



    /**
     * 初期化
     */

    init() {


        if (this.initialized) {

            return;

        }


        this.initialized = true;


    }



    /**
     * 世界生成
     */

    createWorld() {


        const world = {


            id:

                Date.now()
                .toString(),


            level:

                1,


            age:

                BigNumber.from(0),


            population:

                0,


            created:

                Date.now()


        };



        this.worlds.push(
            world
        );


        this.activeWorld =
            world;



        eventBus.emit(

            "world:created",

            world

        );


        return world;

    }



    /**
     * 更新
     */

    update() {


        if (
            !this.activeWorld
        ) {

            return;

        }


        this.activeWorld.age.add(
            1
       