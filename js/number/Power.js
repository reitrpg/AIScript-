/**
 * World Creator
 * BigNumber Power
 *
 * 累乗計算処理
 */


import BigNumber from "./BigNumber.js";
import Normalize from "./Normalize.js";


class Power {


    /**
     * 累乗
     */

    static pow(
        value,
        exponent
    ) {


        const base =
            BigNumber.from(
                value
            );


        if (
            exponent === 0
        ) {

            return BigNumber.one();

        }


        if (
            exponent < 0
        ) {

            return this.inverse(
                base,
                Math.abs(exponent)
            );

        }



        let result =
            BigNumber.one();



        for (
            let i = 0;
            i < exponent;
            i++
        ) {


            result.multiply(
                base
            );


        }



        return Normalize.apply(
            result
        );

    }



    /**
     * 逆数累乗
     */

    static inverse(
        value,
        exponent
    ) {


        const result =
            BigNumber.one();


        for (
            let i = 0;
            i < exponent;
            i++
        ) {


            result.divide(
                value
            );


        }


        return Normalize.apply(
            result
        );

    }



    /**
     * 指数増加用
     *
     * 10^n
     */

    static tenPower(
        exponent
    ) {


        return new BigNumber(

            1,

            exponent

        );

    }



    /**
     * 平方根近似
     */

    static sqrt(
        value
    ) {


        const number =
            BigNumber.from(
                value
            )
            .toNumber();



        return BigNumber.from(

            Math.sqrt(
                number
            )

        );

    }


}


export default Power;