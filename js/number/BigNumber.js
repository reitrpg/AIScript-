/**
 * World Creator
 * BigNumber System
 *
 * 巨大数管理
 */


class BigNumber {


    constructor(
        value = 0,
        exponent = 0
    ) {


        this.value = Number(value);

        this.exponent = Number(exponent);


        this.normalize();


    }



    /**
     * 生成
     */

    static from(value) {


        if (
            value instanceof BigNumber
        ) {


            return new BigNumber(

                value.value,

                value.exponent

            );


        }



        if (
            typeof value === "object"
        ) {


            return new BigNumber(

                value.value,

                value.exponent

            );


        }



        return new BigNumber(

            value,

            0

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


            return;


        }



        while (

            Math.abs(this.value) >= 10

        ) {


            this.value /= 10;


            this.exponent++;


        }



        while (

            Math.abs(this.value) < 1

            &&

            this.value !== 0

        ) {


            this.value *= 10;


            this.exponent--;


        }


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

            target.exponent ===

            this.exponent

        ) {


            this.value +=

                target.value;


        }

        else {


            const diff =

                this.exponent

                -

                target.exponent;



            if (
                diff > 15
            ) {

                return this;

            }



            if (
                diff < -15
            ) {


                this.value =

                    target.value;


                this.exponent =

                    target