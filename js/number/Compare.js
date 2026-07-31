/**
 * World Creator
 * BigNumber Compare
 *
 * 巨大数比較処理
 */


import BigNumber from "./BigNumber.js";


/**
 * 比較
 *
 * 戻り値:
 *  1  : a > b
 *  0  : a = b
 * -1  : a < b
 */

export function compare(a, b) {


    const left =
        BigNumber.from(a);


    const right =
        BigNumber.from(b);



    /*
        符号比較
    */

    if (
        left.value > 0 &&
        right.value < 0
    ) {

        return 1;

    }


    if (
        left.value < 0 &&
        right.value > 0
    ) {

        return -1;

    }



    /*
        指数比較
    */

    if (
        left.exponent >
        right.exponent
    ) {

        return left.value > 0 ? 1 : -1;

    }


    if (
        left.exponent <
        right.exponent
    ) {

        return left.value > 0 ? -1 : 1;

    }



    /*
        仮数比較
    */

    if (
        left.value >
        right.value
    ) {

        return 1;

    }


    if (
        left.value <
        right.value
    ) {

        return -1;

    }


    return 0;

}



/**
 * 等価判定
 */

export function equal(a, b) {

    return compare(a, b) === 0;

}



/**
 * 大小判定
 */

export function greater(a, b) {

    return compare(a, b) > 0;

}



export function less(a, b) {

    return compare(a, b) < 0;

}



/**
 * 以上・以下
 */

export function greaterOrEqual(a, b) {

    return compare(a, b) >= 0;

}



export function lessOrEqual(a, b) {

    return compare(a, b) <= 0;

}