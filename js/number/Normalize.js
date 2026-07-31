/**
 * World Creator
 * BigNumber Normalize
 *
 * BigNumber形式統一処理
 */


import {
    MIN_MANTISSA,
    MAX_MANTISSA
} from "./Constants.js";


/**
 * 正規化
 *
 * value × 10^exponent
 *
 * mantissaを
 * 1 <= value < 1000
 * に調整
 */

export function normalize(value, exponent = 0) {


    if (value === 0) {

        return {
            value: 0,
            exponent: 0
        };

    }


    while (
        Math.abs(value) >= MAX_MANTISSA
    ) {

        value /= 1000;

        exponent += 3;

    }


    while (
        Math.abs(value) < MIN_MANTISSA &&
        exponent > 0
    ) {

        value *= 1000;

        exponent -= 3;

    }


    return {

        value,

        exponent

    };

}


/**
 * BigNumber形式確認
 */

export function isNormalized(number) {


    if (!number) {

        return false;

    }


    if (number.value === 0) {

        return (
            number.exponent === 0
        );

    }


    return (
        Math.abs(number.value) >= MIN_MANTISSA &&
        Math.abs(number.value) < MAX_MANTISSA
    );

}


/**
 * コピーして正規化
 */

export function normalizedCopy(number) {


    return normalize(
        number.value,
        number.exponent
    );

}