/**
 * World Creator
 * Gacha System
 *
 * ガチャ管理
 */


import eventBus from "../core/eventBus.js";


class Gacha {


    constructor() {

        this.tables = new Map();

        this.history = [];

    }



    /**
     * ガチャ設定登録
     */

    register(id, data) {


        this.tables.set(
            id,
            {

                id,

                name:
                    data.name,

                cost:
                    data.cost,

                items:
                    data.items

            }
        );

    }



    /**
     * ガチャ実行
     */

    draw(id) {


        const table =
            this.tables.get(id);


        if (!table) {

            return null;

        }


        const item =
            this.randomItem(
                table.items
            );


        const result = {

            gacha:
                id,

            item,

            time:
                Date.now()

        };


        this.history.push(
            result
        );


        eventBus.emit(
            "gacha:draw",
            result
        );


        return item;

    }



    /**
     * 抽選
     */

    randomItem(items) {


        const total =
            items.reduce(

                (sum, item) =>
                    sum + item.rate,

                0

            );


        let random =
            Math.random() *
            total;



        for (const item of items) {


            random -= item.rate;


            if (random <= 0) {

                return item;

            }

        }


        return items[
            items.length - 1
        ];

    }



    /**
     * ガチャ取得
     */

    get(id) {

        return this.tables.get(id);

    }



    /**
     * 履歴取得
     */

    getHistory() {

        return this.history;

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            history:
                this.history

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.history =
            data.history ?? [];

    }


}


const gacha =
    new Gacha();


export default gacha;