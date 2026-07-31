/**
 * World Creator
 * Resource Object
 *
 * 個別資源データ管理
 */


import BigNumber from "../number/BigNumber.js";



class Resource {


    constructor(
        id,
        name,
        value = 0
    ) {


        this.id = id;


        this.name = name;


        this.amount =

            BigNumber.from(
                value
            );


    }



    /**
     * 追加
     */

    add(value) {


        this.amount.add(
            value
        );


    }



    /**
     * 消費
     */

    remove(value) {


        this.amount.subtract(
            value
        );


    }



    /**
     * 所持量取得
     */

    getValue() {


        return this.amount;


    }



    /**
     * 表示
     */

    display() {


        return this.amount.toString();


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

            BigNumber.from(

                data.amount

            )

        );


    }


}



export default Resource;