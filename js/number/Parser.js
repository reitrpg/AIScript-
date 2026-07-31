/**
 * World Creator
 * BigNumber Parser
 *
 * 文字列・数値変換処理
 */


import BigNumber from "./BigNumber.js";


/**
 * 文字列からBigNumber生成
 */

export function parse(value) {


    if (value instanceof BigNumber) {

        return value.clone();

    }


    if (typeof value === "number") {

        return fromNumber(value);

    }


    if (typeof value !== "string") {

        return BigNumber.zero();

    }



    const text =
        value.trim();



    if (text.length === 0) {

        return BigNumber.zero();

    }



    /*
        指数表記対応

        例:
        1.5e120
    */

    if (
        text.includes("e") ||
        text.includes("E")
    ) {

        return fromScientific(text);

    }



    /*
        通常数値
    */

    return fromNumber(
        Number(text)
    );

}



/**
 * Number変換
 */

function fromNumber(number) {


    if (!Number.isFinite(number)) {

        return BigNumber.zero();

    }


    if (number === 0) {

        return BigNumber.zero();

    }


    let exponent = 0;

    let value = number;



    while (
        Math.abs(value) >= 1000
    ) {

        value /= 1000;

        exponent += 3;

    }


    while (
        Math.abs(value) < 1 &&
        exponent > 0
    ) {

        value *= 1000;

        exponent -= 3;

    }


    return new BigNumber(
        value,
        exponent
    );

}



/**
 * 科学表記変換
 */

function fromScientific(text) {


    const parts =
        text.toLowerCase()
            .split("e");


    const value =
        Number(parts[0]);


    const exponent =
        Number(parts[1]);


    return new BigNumber(
        value,
        exponent
    );

}



/**
 * JSON復元
 */

export function fromJSON(data) {


    if (
        !data ||
        typeof data !== "object"
    ) {

        return BigNumber.zero();

    }


    return new BigNumber(
        data.value ?? 0,
        data.exponent ?? 0
    );

}



/**
 * JSON保存形式
 */

export function toJSON(number) {


    const value =
        BigNumber.from(number);


    return {

        value: value.value,

        exponent: value.exponent

    };

}