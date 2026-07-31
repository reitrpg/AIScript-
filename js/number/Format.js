/**
 * World Creator
 * BigNumber Format
 *
 * 表示用フォーマット処理
 */


import BigNumber from "./BigNumber.js";


/*
    単位表
*/

const UNITS = [

    {
        value: 3,
        name: "K"
    },

    {
        value: 6,
        name: "M"
    },

    {
        value: 9,
        name: "B"
    },

    {
        value: 12,
        name: "T"
    },

    {
        value: 15,
        name: "Qa"
    },

    {
        value: 18,
        name: "Qi"
    },

    {
        value: 21,
        name: "Sx"
    },

    {
        value: 24,
        name: "Sp"
    },

    {
        value: 27,
        name: "Oc"
    },

    {
        value: 30,
        name: "No"
    }

];



/**
 * 表示変換
 */

export function format(value, precision = 2) {


    const number =
        BigNumber.from(value);



    if (number.value === 0) {

        return "0";

    }



    const exponent =
        number.exponent;



    /*
        通常表示
    */

    if (exponent < 3) {

        return number
            .toNumber()
            .toFixed(precision);

    }



    /*
        単位表示
    */

    const unit =
        UNITS
            .slice()
            .reverse()
            .find(
                item =>
                    exponent >= item.value
            );



    if (!unit) {

        return scientific(number);

    }



    const scaled =
        number.value *
        Math.pow(
            10,
            exponent - unit.value
        );



    return (
        scaled.toFixed(precision)
        +
        unit.name
    );

}



/**
 * 科学表記
 */

export function scientific(value) {


    const number =
        BigNumber.from(value);


    return (
        number.value.toFixed(3)
        +
        "e"
        +
        number.exponent
    );

}



/**
 * 詳細表示
 */

export function detailed(value) {


    const number =
        BigNumber.from(value);


    return {

        value:
            number.value,

        exponent:
            number.exponent,

        text:
            scientific(number)

    };

}



/**
 * 整数表示
 */

export function integer(value) {


    return format(
        value,
        0
    );

}