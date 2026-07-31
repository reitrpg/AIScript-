/**
 * World Creator
 * Core Utility
 *
 * 汎用処理
 */


const Util = {


    /*
        ID生成
    */

    createId(length = 16) {

        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let result = "";

        for (let i = 0; i < length; i++) {

            result += chars[
                Math.floor(Math.random() * chars.length)
            ];

        }

        return result;

    },


    /*
        待機
    */

    wait(ms) {

        return new Promise(resolve => {

            setTimeout(resolve, ms);

        });

    },


    /*
        範囲制限
    */

    clamp(value, min, max) {

        return Math.min(
            Math.max(value, min),
            max
        );

    },


    /*
        深いコピー
    */

    deepClone(data) {

        return structuredClone(data);

    },


    /*
        配列確認
    */

    isArray(value) {

        return Array.isArray(value);

    },


    /*
        オブジェクト確認
    */

    isObject(value) {

        return (
            value !== null &&
            typeof value === "object" &&
            !Array.isArray(value)
        );

    },


    /*
        数値確認
    */

    isNumber(value) {

        return (
            typeof value === "number" &&
            Number.isFinite(value)
        );

    },


    /*
        時刻取得
    */

    now() {

        return Date.now();

    },


    /*
        ランダム整数
    */

    randomInt(min, max) {

        return Math.floor(
            Math.random() * (max - min + 1)
        ) + min;

    }

};


export default Util;