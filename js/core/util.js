/**
 * World Creator
 * Utility
 *
 * 共通処理
 */


class Util {


    /**
     * ID生成
     */

    static createId(prefix = "") {


        return (

            prefix +

            "_" +

            Date.now()
                .toString(36)

            +

            Math.random()
                .toString(36)
                .substring(2)

        );

    }



    /**
     * 待機
     */

    static wait(ms) {


        return new Promise(

            resolve => {

                setTimeout(
                    resolve,
                    ms
                );

            }

        );

    }



    /**
     * 範囲制限
     */

    static clamp(
        value,
        min,
        max
    ) {


        return Math.min(

            Math.max(
                value,
                min
            ),

            max

        );

    }



    /**
     * 配列ランダム取得
     */

    static randomChoice(array) {


        if (
            !array ||
            array.length === 0
        ) {

            return null;

        }


        return array[

            Math.floor(
                Math.random() *
                array.length
            )

        ];

    }



    /**
     * 深いコピー
     */

    static deepClone(data) {


        return JSON.parse(

            JSON.stringify(
                data
            )

        );

    }



    /**
     * 数値確認
     */

    static isNumber(value) {


        return (

            typeof value ===
            "number"

            &&

            !Number.isNaN(
                value
            )

        );

    }



    /**
     * 時刻取得
     */

    static now() {

        return Date.now();

    }



}


export default Util;