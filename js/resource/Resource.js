/**
 * World Creator
 * Resource
 *
 * 資源オブジェクト管理
 */


import BigNumber from "../number/BigNumber.js";


class Resource {


    constructor(id, name, amount = 0) {

        this.id = id;

        this.name = name;

        this.amount =
            BigNumber.from(amount);

    }


    /**
     * 増加
     */

    add(value) {

        this.amount.add(value);

        return this.amount;

    }


    /**
     * 減少
     */

    subtract(value) {

        this.amount.subtract(value);

        if (
            this.amount.value < 0
        ) {

            this.amount =
                BigNumber.zero();

        }


        return this.amount;

    }


    /**
     * 設定
     */

    set(value) {

        this.amount =
            BigNumber.from(value);

    }


    /**
     * 取得
     */

    get() {

        return this.amount;

    }


    /**
     * 使用可能確認
     */

    canAfford(value) {

        return (
            this.amount.compare
        );

    }


    /**
     * 保存用データ
     */

    toJSON() {

        return {

            id: this.id,

            name: this.name,

            amount: {

                value:
                    this.amount.value,

                exponent:
                    this.amount.exponent

            }

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


        this.amount =
            new BigNumber(

                data.amount.value,

                data.amount.exponent

            );

    }


}


export default Resource;