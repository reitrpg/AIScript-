/**
 * World Creator
 * BigNumber Power
 *
 * 累乗処理
 */


import BigNumber from "./BigNumber.js";


/**
 * 累乗
 *
 * BigNumber ^ exponent
 */

export function power(value, exponent) {


    const base =
        BigNumber.from(value);


    if (exponent === 0) {

        return BigNumber.one();

    }


    if (exponent < 0) {

        return reciprocal(
            power(base, Math.abs(exponent))
        );

    }


    let result =
        BigNumber.one();


    let current =
        base.clone();


    let count = exponent;



    /*
        べき乗高速化
        Exponentiation by Squaring
    */

    while (count > 0) {


        if (count % 2 === 1) {

            result.multiply(current);

        }


        current.multiply(current);


        count =
            Math.floor(count / 2);

    }


    return result;

}



/**
 * 逆数
 */

export function reciprocal(value) {


    const number =
        BigNumber.from(value);


    if (number.value === 0) {

        throw new Error(
            "Cannot divide by zero"
        );

    }


    const result =
        BigNumber.one();


    return result.divide(number);

}



/**
 * 10の指数乗
 *
 * 10^n をBigNumber形式で生成
 */

export function tenPower(exponent) {


    return new BigNumber(
        1,
        exponent
    );

}



/**
 * 指数増加
 *
 * 現在値 × 10^amount
 */

export function scale(value, amount) {


    const result =
        BigNumber.from(value);


    result.exponent += amount;


    return result.normalize();

}