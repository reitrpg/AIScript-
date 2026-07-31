/**
 * World Creator
 * BigNumber Core
 *
 * 完全自作巨大数クラス
 *
 * 表現:
 * value × 10^exponent
 *
 * 例:
 * 12345
 * = 12.345 × 10^3
 */


import {
    MIN_MANTISSA,
    MAX_MANTISSA,
    ZERO,
    ONE
} from "./Constants.js";


class BigNumber {


    constructor(value = 0, exponent = 0) {

        this.value = Number(value);

        this.exponent = Number(exponent);

        this.normalize();

    }


    /**
     * 数値正規化
     */

    normalize() {


        if (!Number.isFinite(this.value)) {

            this.value = 0;

            this.exponent = 0;

            return this;

        }


        if (this.value === ZERO) {

            this.exponent = 0;

            return this;

        }


        while (Math.abs(this.value) >= MAX_MANTISSA) {

            this.value /= 1000;

            this.exponent += 3;

        }


        while (
            Math.abs(this.value) < MIN_MANTISSA &&
            this.exponent > 0
        ) {

            this.value *= 1000;

            this.exponent -= 3;

        }


        return this;

    }


    /**
     * コピー
     */

    clone() {

        return new BigNumber(
            this.value,
            this.exponent
        );

    }


    /**
     * 加算
     */

    add(target) {

        const num =
            BigNumber.from(target);


        if (num.value === 0) {

            return this;

        }


        if (this.value === 0) {

            this.value = num.value;

            this.exponent = num.exponent;

            return this;

        }


        const diff =
            this.exponent - num.exponent;


        if (diff >= 12) {

            return this.normalize();

        }


        if (diff < 0) {

            const temp = this;

            this.value = num.value;

            this.exponent = num.exponent;

            return this.add(temp);

        }


        this.value +=
            num.value *
            Math.pow(10, -diff);


        return this.normalize();

    }


    /**
     * 減算
     */

    subtract(target) {

        return this.add(
            BigNumber.from(target).multiply(-1)
        );

    }


    /**
     * 乗算
     */

    multiply(target) {

        const num =
            BigNumber.from(target);


        this.value *= num.value;

        this.exponent += num.exponent;


        return this.normalize();

    }


    /**
     * 除算
     */

    divide(target) {

        const num =
            BigNumber.from(target);


        if (num.value === 0) {

            throw new Error(
                "Division by zero"
            );

        }


        this.value /= num.value;

        this.exponent -= num.exponent;


        return this.normalize();

    }


    /**
     * 通常数値化
     */

    toNumber() {

        return (
            this.value *
            Math.pow(10, this.exponent)
        );

    }


    /**
     * 文字列化
     */

    toString() {

        if (this.value === 0) {

            return "0";

        }


        return `${this.value}e${this.exponent}`;

    }


    /**
     * 静的生成
     */

    static from(value) {


        if (value instanceof BigNumber) {

            return value.clone();

        }


        return new BigNumber(value);

    }


    /**
     * ゼロ
     */

    static zero() {

        return new BigNumber(0);

    }


    /**
     * 1
     */

    static one() {

        return new BigNumber(ONE);

    }


}


export default BigNumber;