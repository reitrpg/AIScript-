/**
 * World Creator
 * Resource Manager
 *
 * 資源全体管理
 */


import Resource from "./Resource.js";

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


        if (
            this.initialized
        ) {

            return;

        }



        this.register(

            "wood",

            "Wood",

            0

        );


        this.register(

            "stone",

            "Stone",

            0

        );


        this.register(

            "food",

            "Food",

            0

        );


        this.register(

            "mana",

            "Mana",

            0

        );



        this.initialized = true;


    }



    /**
     * 資源登録
     */

    register(
        id,
        name,
        value = 0
    ) {


        this.resources[id] =

            new Resource(

                id,

                name,

                value

            );


    }



    /**
     * 取得
     */

    get(id) {


        if (
            !this.resources[id]
        ) {


            this.register(

                id,

                id,

                0

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


        const resource =

            this.get(id);



        resource.add(
            amount
        );



        eventBus.emit(

            "resource:update",

            {

                id,

                value:

                    resource.getValue()


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


        const resource =

            this.get(id);



        resource.remove(
            amount
        );


    }



    /**
     * 全取得
     */

    getAll() {


        const result = {};



        for (
            const id in this.resources
        ) {


            result[id] =

                this.resources[id]
                    .display();


        }



        return result;


    }



    /**
     * 保存
     */

    toJSON() {


        const data = {};



        for (
            const id in this.resources
        ) {


            data[id] =

                this.resources[id]
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



        this.resources = {};



        for (
            const id in data
        ) {


            this.resources[id] =

                Resource
                    .fromJSON(

                        data[id]

                    );


        }


    }


}



const resourceManager =

    new ResourceManager();



export default resourceManager;