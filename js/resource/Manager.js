/**
 * World Creator
 * Resource Manager
 *
 * 資源管理システム
 */


import BigNumber from "../number/BigNumber.js";
import eventBus from "../core/eventBus.js";


class ResourceManager {


    constructor() {


        this.resources = {};

        this.initialized = false;

    }



    /**
     * 初期化
     */

    init() {


        if (this.initialized) {

            return;

        }


        this.create(
            "wood",
            0
        );


        this.create(
            "stone",
            0
        );


        this.create(
            "food",
            0
        );


        this.create(
            "mana",
            0
        );



        this.initialized = true;


    }



    /**
     * 資源作成
     */

    create(
        id,
        value = 0
    ) {


        this.resources[id] =
            BigNumber.from(
                value
            );


    }



    /**
     * 取得
     */

    get(
        id
    ) {


        if (
            !this.resources[id]
        ) {

            this.create(
                id
            );

        }


        return this.resources[id];

    }



    /**
     * 追加
     */

    add(
        id,
        amount
    ) {


        this.get(
            id
        )
        .add(
            amount
        );


        eventBus.emit(
            "resource:update",
            {
                id,
                value:
                    this.get(id)
            }
        );

    }



    /**
     * 消費
     */

    remove(
        id,
        amount
    ) {


        this.get(
            id
        )
        .subtract(
            amount
        );


    }



    /**
     * 全取得
     */

    getAll() {


        const result = {};



        for (
            const key in this.resources
        ) {


            result[key] =
                this.resources[key]
                    .toString
                    ?

                    this.resources[key]
                        .toString()

                    :

                    this.resources[key];

        }



        return result;

    }



    /**
     * 保存用
     */

    toJSON() {


        const data = {};



        for (
            const key in this.resources
        ) {


            data[key] =
                this.resources[key]
                    .toJSON();

        }



        return data;

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }



        for (
            const key in data
        ) {


            this.resources[key] =
                BigNumber.from(
                    data[key]
                );

        }


    }



}



const resourceManager =
    new ResourceManager();


export default resourceManager;