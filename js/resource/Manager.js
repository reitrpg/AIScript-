/**
 * World Creator
 * Resource Manager
 *
 * 資源管理システム
 */


import Resource from "./Resource.js";
import resourceData from "../data/resourceData.js";
import eventBus from "../core/eventBus.js";


class ResourceManager {


    constructor() {

        this.resources = new Map();

    }


    /**
     * 初期化
     */

    init() {


        for (const id in resourceData) {


            const data =
                resourceData[id];


            const resource =
                new Resource(

                    data.id,

                    data.name,

                    data.baseValue

                );


            this.resources.set(
                id,
                resource
            );

        }


        eventBus.emit(
            "resource:initialized",
            this.resources
        );

    }



    /**
     * 資源取得
     */

    get(id) {

        return this.resources.get(id);

    }



    /**
     * 増加
     */

    add(id, amount) {


        const resource =
            this.get(id);


        if (!resource) {

            return false;

        }


        resource.add(amount);


        eventBus.emit(
            "resource:changed",
            id,
            resource.amount
        );


        return true;

    }



    /**
     * 減少
     */

    subtract(id, amount) {


        const resource =
            this.get(id);


        if (!resource) {

            return false;

        }


        resource.subtract(amount);


        eventBus.emit(
            "resource:changed",
            id,
            resource.amount
        );


        return true;

    }



    /**
     * 全取得
     */

    getAll() {

        return this.resources;

    }



    /**
     * 保存用
     */

    toJSON() {


        const data = {};


        for (
            const [id, resource]
            of this.resources
        ) {

            data[id] =
                resource.toJSON();

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


        for (const id in data) {


            const resource =
                this.resources.get(id);


            if (resource) {

                resource.load(
                    data[id]
                );

            }

        }

    }


}


const manager =
    new ResourceManager();


export default manager;