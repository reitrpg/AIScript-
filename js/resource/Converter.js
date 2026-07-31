/**
 * World Creator
 * Resource Converter
 *
 * 資源変換・生産処理
 */


import ResourceManager from "./Manager.js";
import eventBus from "../core/eventBus.js";



class Converter {


    constructor() {


        this.recipes = {};


    }



    /**
     * レシピ登録
     */

    register(
        id,
        input,
        output
    ) {


        this.recipes[id] = {


            input,

            output


        };


    }



    /**
     * 変換実行
     */

    convert(
        id
    ) {


        const recipe =

            this.recipes[id];



        if (!recipe) {

            return false;

        }



        /*
            消費確認
        */

        for (
            const key in recipe.input
        ) {


            const resource =

                ResourceManager.get(
                    key
                );



            if (

                resource.compare

                &&

                resource.compare(
                    recipe.input[key]
                ) < 0

            ) {


                return false;

            }


        }



        /*
            消費
        */

        for (
            const key in recipe.input
        ) {


            ResourceManager.remove(

                key,

                recipe.input[key]

            );


        }



        /*
            生成
        */

        for (
            const key in recipe.output
        ) {


            ResourceManager.add(

                key,

                recipe.output[key]

            );


        }



        eventBus.emit(

            "resource:convert",

            id

        );


        return true;


    }



    /**
     * 自動生産