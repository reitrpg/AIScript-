/**
 * World Creator
 * Resource Converter
 *
 * 資源変換処理
 */


import BigNumber from "../number/BigNumber.js";
import ResourceManager from "./Manager.js";
import eventBus from "../core/eventBus.js";


class Converter {


    constructor() {

        this.recipes = new Map();

    }



    /**
     * 変換レシピ登録
     */

    register(id, recipe) {

        this.recipes.set(
            id,
            recipe
        );

    }



    /**
     * 変換可能確認
     */

    canConvert(id) {


        const recipe =
            this.recipes.get(id);


        if (!recipe) {

            return false;

        }


        for (const cost in recipe.cost) {


            const resource =
                ResourceManager.get(cost);


            if (!resource) {

                return false;

            }


            if (
                resource.amount.value <
                BigNumber.from(
                    recipe.cost[cost]
                ).value
            ) {

                return false;

            }

        }


        return true;

    }



    /**
     * 変換実行
     */

    convert(id) {


        const recipe =
            this.recipes.get(id);


        if (!recipe) {

            return false;

        }


        if (!this.canConvert(id)) {

            return false;

        }



        /*
            消費
        */

        for (const cost in recipe.cost) {

            ResourceManager.subtract(

                cost,

                recipe.cost[cost]

            );

        }



        /*
            生成
        */

        for (const output in recipe.output) {

            ResourceManager.add(

                output,

                recipe.output[output]

            );

        }



        eventBus.emit(

            "resource:converted",

            id

        );


        return true;

    }



    /**
     * レシピ取得
     */

    get(id) {

        return this.recipes.get(id);

    }


}



const converter =
    new Converter();


export default converter;