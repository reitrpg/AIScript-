/**
 * World Creator
 * Resource
 *
 * 個別資源管理
 */


import BigNumber from "../number/BigNumber.js";



class Resource {


    constructor(
        id,
        name,
        value = 0
    ) {


        this.id =
            id;


        this.name =
            name;


        this.amount =
            BigNumber.from(
                value
            );


    }



    /**
     * 追加
     */

    add(
        value
    ) {


        this.amount.add(
            value
        );


    }



    /**
     * 消費
     */

    remove(
        value
    ) {


        this.amount.subtract(
            value
        );


    }



    /**
     * 取得
     */

    getValue() {


        return this.amount;

    }



    /**
     * 数値表示
     */

    display() {


        return (

            this.amount.value

            +

            "e"

            +

            this.amount.exponent

        );


    }



    /**
     * 保存
     */

    toJSON() {


        return {


            id:
                this.id,


            name:
                this.name,


            amount:
                this.amount.toJSON()


        };


    }



    /**
     * 復元
     */

    static fromJSON(data) {


        return new Resource(

            data.id,

            data.name,

            BigNumber