/**
 * World Creator
 * World Generator
 *
 * 世界生成処理
 */


import worldData from "../data/worldData.js";
import World from "./World.js";


class Generator {


    constructor() {

        this.history = [];

    }



    /**
     * 世界生成
     */

    generate(type = "normal") {


        if (!worldData[type]) {

            throw new Error(
                "Invalid world type: " + type
            );

        }


        const world =
            new World();


        world.create(type);


        this.history.push({

            type,

            time:
                Date.now()

        });


        return world;

    }



    /**
     * ランダム生成
     */

    random() {


        const types =
            Object.keys(worldData);


        const index =
            Math.floor(
                Math.random() *
                types.length
            );


        return this.generate(
            types[index]
        );

    }



    /**
     * 生成可能な世界一覧
     */

    getAvailableWorlds() {

        return Object.keys(
            worldData
        );

    }



    /**
     * 生成履歴取得
     */

    getHistory() {

        return this.history;

    }


}


const generator =
    new Generator();


export default generator;