/**
 * World Creator
 * Upgrade Manager
 *
 * 強化管理システム
 */


import Upgrade from "./Upgrade.js";
import upgradeData from "../data/upgradeData.js";
import eventBus from "../core/eventBus.js";


class UpgradeManager {


    constructor() {

        this.upgrades = new Map();

    }



    /**
     * 初期化
     */

    init() {


        for (const id in upgradeData) {


            const upgrade =
                new Upgrade(
                    upgradeData[id]
                );


            this.upgrades.set(
                id,
                upgrade
            );

        }


        eventBus.emit(
            "upgrade:initialized",
            this.upgrades
        );

    }



    /**
     * 取得
     */

    get(id) {

        return this.upgrades.get(id);

    }



    /**
     * 強化実行
     */

    upgrade(id) {


        const upgrade =
            this.get(id);


        if (!upgrade) {

            return false;

        }


        const result =
            upgrade.upgrade();



        if (result) {

            eventBus.emit(
                "upgrade:changed",
                upgrade
            );

        }


        return result;

    }



    /**
     * 全取得
     */

    getAll() {

        return this.upgrades;

    }



    /**
     * 保存
     */

    toJSON() {


        const data = {};


        for (
            const [id, upgrade]
            of this.upgrades
        ) {

            data[id] =
                upgrade.toJSON();

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


            const upgrade =
                this.upgrades.get(id);


            if (upgrade) {

                upgrade.load(
                    data[id]
                );

            }

        }

    }


}


const manager =
    new UpgradeManager();


export default manager;