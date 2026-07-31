/**
 * World Creator
 * Sacrifice System
 *
 * アイテム・資源奉納処理
 */


import BigNumber from "../number/BigNumber.js";
import eventBus from "../core/eventBus.js";


class Sacrifice {


    constructor() {

        this.history = [];

    }



    /**
     * 奉納可能確認
     */

    canSacrifice(item, amount = 1) {


        if (!item) {

            return false;

        }


        return (
            BigNumber
                .from(item.count)
                .value >= amount
        );

    }



    /**
     * 奉納実行
     */

    execute(item, amount = 1) {


        if (
            !this.canSacrifice(
                item,
                amount
            )
        ) {

            return null;

        }



        item.removeCount(
            amount
        );



        const result =
            this.calculateReward(
                item,
                amount
            );


        const record = {

            item:
                item.id,

            amount,

            reward:
                result,

            time:
                Date.now()

        };


        this.history.push(
            record
        );


        eventBus.emit(
            "sacrifice:complete",
            record
        );


        return result;

    }



    /**
     * 報酬計算
     */

    calculateReward(item, amount) {


        const multiplier =
            item.rarity *
            amount;



        return {

            soul:
                new BigNumber(
                    multiplier
                ),

            energy:
                new BigNumber(
                    multiplier * 10
                )

        };

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


const sacrifice =
    new Sacrifice();


export default sacrifice;