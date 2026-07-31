/**
 * World Creator
 * Gacha Item
 *
 * ガチャアイテム管理
 */


import BigNumber from "../number/BigNumber.js";


class Item {


    constructor(data = {}) {


        this.id =
            data.id ?? "unknown";


        this.name =
            data.name ?? "Item";


        this.type =
            data.type ?? "normal";


        this.rarity =
            data.rarity ?? 1;


        this.description =
            data.description ?? "";



        this.effect =
            data.effect ?? null;



        this.count =
            BigNumber.from(
                data.count ?? 1
            );

    }



    /**
     * 効果取得
     */

    getEffect() {

        return this.effect;

    }



    /**
     * 所持数追加
     */

    addCount(value) {


        this.count.add(
            value
        );


    }



    /**
     * 所持数減少
     */

    removeCount(value) {


        this.count.subtract(
            value
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

            type:
                this.type,

            rarity:
                this.rarity,

            description:
                this.description,

            effect:
                this.effect,

            count: {

                value:
                    this.count.value,

                exponent:
                    this.count.exponent

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


        this.type =
            data.type;


        this.rarity =
            data.rarity;


        this.description =
            data.description;


        this.effect =
            data.effect;


        this.count =
            BigNumber.from(
                data.count
            );

    }


}


export default Item;