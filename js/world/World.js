/**
 * World Creator
 * World
 *
 * 世界データ管理
 */


import BigNumber from "../number/BigNumber.js";
import worldData from "../data/worldData.js";
import eventBus from "../core/eventBus.js";


class World {


    constructor() {

        this.id = null;

        this.name = "";

        this.type = "normal";

        this.size =
            BigNumber.zero();

        this.population =
            BigNumber.zero();

        this.civilization =
            BigNumber.zero();

        this.magic =
            BigNumber.zero();

        this.age = 0;

        this.initialized = false;

    }



    /**
     * 世界生成
     */

    create(type = "normal") {


        const data =
            worldData[type];


        if (!data) {

            throw new Error(
                "Unknown world type: " + type
            );

        }


        this.id =
            crypto.randomUUID
                ? crypto.randomUUID()
                : Date.now().toString();


        this.name =
            data.name;


        this.type =
            type;


        this.size =
            BigNumber.from(
                data.start.size
            );


        this.population =
            BigNumber.from(
                data.start.population
            );


        this.civilization =
            BigNumber.from(
                data.start.civilization
            );


        this.magic =
            BigNumber.from(
                data.start.magic
            );


        this.age = 0;


        this.initialized = true;



        eventBus.emit(
            "world:created",
            this
        );


        return this;

    }



    /**
     * 時間経過
     */

    tick() {

        if (!this.initialized) {

            return;

        }


        this.age++;


        eventBus.emit(
            "world:update",
            this
        );

    }



    /**
     * 世界拡張
     */

    expand(value) {

        this.size.add(value);


        eventBus.emit(
            "world:expanded",
            this.size
        );

    }



    /**
     * 人口増加
     */

    growPopulation(value) {

        this.population.add(value);


        eventBus.emit(
            "world:populationChanged",
            this.population
        );

    }



    /**
     * 保存形式
     */

    toJSON() {

        return {

            id:
                this.id,

            name:
                this.name,

            type:
                this.type,

            size:
                this.size,

            population:
                this.population,

            civilization:
                this.civilization,

            magic:
                this.magic,

            age:
                this.age

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.id =
            data.id;


        this.name =
            data.name;


        this.type =
            data.type;


        this.size =
            BigNumber.from(
                data.size
            );


        this.population =
            BigNumber.from(
                data.population
            );


        this.civilization =
            BigNumber.from(
                data.civilization
            );


        this.magic =
            BigNumber.from(
                data.magic
            );


        this.age =
            data.age ?? 0;


        this.initialized = true;

    }


}


export default World;