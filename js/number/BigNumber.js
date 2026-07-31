/**
 * World Creator
 * BigNumber
 *
 * 完全自作巨大数クラス
 */


import Constants from "./Constants.js";


class BigNumber {


    constructor(
        value = 0,
        exponent = 0
    ) {


        this.value =
            Number(value);


        this.exponent =
            Number(exponent);


        this.normalize();

    }



    /**
     * 生成
     */

    static from(value) {


        if (
            value instanceof BigNumber
        ) {

            return value.clone();

        }


        if (
            typeof value === "object"
            &&
            value !== null
        ) {


            return new BigNumber(

                value.value,

                value.exponent

            );

        }


        return new BigNumber(
            value
        );

    }



    /**
     * 0
     */

    static zero() {

        return new BigNumber(
            0
        );

    }



    /**
     * 1
     */

    static one() {

        return new BigNumber(
            1
        );

    }



    /**
     * 複製
     */

    clone() {


        return new BigNumber(

            this.value,

            this.exponent

        );

    }



    /**
     * 正規化
     */

    normalize() {


        if (
            this.value === 0
        ) {

            this.exponent = 0;

            return this;

        }


        while (
            Math.abs(this.value)
            >=
            Constants.NORMALIZE_THRESHOLD
        ) {


            this.value /= 1000;

            this.exponent += 3;

        }


        while (
            Math.abs(this.value)
            < 1
        ) {


            this.value *= 1000;

            this.exponent -= 3;


        }


        return this;

    }



    /**
     * 加算
     */

    add(value) {


        const target =
            BigNumber.from(
                value
            );


        if (
            this.exponent ===
            target.exponent
        ) {


            this.value +=
                target.value;


        }
        else {


            const diff =
                this.exponent -
                target.exponent;


            if (
                diff > 0
            ) {

                this.value +=
                    target.value *
                    Math.pow(
                        10,
                        -diff
                    );

            }
            else {

                this.value =
                    this.value *
                    Math.pow(
                        10,
                        diff
                    )
                    +
                    target.value;


                this.exponent =
                    target.exponent