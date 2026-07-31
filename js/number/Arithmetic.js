/**
 * World Creator
 * BigNumber Arithmetic
 *
 * 四則演算処理
 */


import BigNumber from "./BigNumber.js";


/**
 * 加算
 */

export function add(a, b) {

    return BigNumber
        .from(a)
        .add(b);

}


/**
 * 減算
 */

export function subtract(a, b) {

    return BigNumber
        .from(a)
        .subtract(b);

}


/**
 * 乗算
 */

export function multiply(a, b) {

    return BigNumber
        .from(a)
        .multiply(b);

}


/**
 * 除算
 */

export function divide(a, b) {

    return BigNumber
        .from(a)
        .divide(b);

}


/**
 * 剰余
 *
 * 巨大数では精度維持のため
 * 現在値変換可能範囲のみ対応
 */

export function modulo(a, b) {

    const left =
        BigNumber
            .from(a)
            .toNumber();


    const right =
        BigNumber
            .from(b)
            .toNumber();


    return new BigNumber(
        left % right
    );

}


/**
 * 絶対値
 */

export function abs(value) {

    const result =
        BigNumber.from(value);


    result.value =
        Math.abs(result.value);


    return result;

}


/**
 * 最大値
 */

export function max(a, b) {

    const left =
        BigNumber.from(a);

    const right =
        BigNumber.from(b);


    return (
        left.toNumber() >= right.toNumber()
            ? left
            : right
    );

}


/**
 * 最小値
 */

export function min(a, b) {

    const left =
        BigNumber.from(a);

    const right =
        BigNumber.from(b);


    return (
        left.toNumber() <= right.toNumber()
            ? left
            : right
    );

}