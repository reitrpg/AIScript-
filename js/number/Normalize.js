/**
 * World Creator
 * BigNumber Normalize
 *
 * 巨大数正規化処理
 */


import BigNumber from "./BigNumber.js";
import Constants from "./Constants.js";


class Normalize {


    /**
     * 正規化
     */

    static apply(value) {


        const number =
            BigNumber.from(
                value
            );


        if (
            number.value === 0
        ) {

            number.exponent = 0;

            return number;

        }



        while (
            Math.abs(number.value)
            >=
            Constants.NORMALIZE_THRESHOLD
        ) {


            number.value /= 1000;

            number.exponent += 3;


        }



        while (
            Math.abs(number.value)
            < 1
        ) {


            number.value *= 1000;

            number.exponent -= 3;


        }



        return number;

    }



    /**
     * 強制正規化
     */

    static force(value) {


        return this.apply(
            value
        );

    }



    /**
     * 桁調整
     */

    static adjust(
        value,
        exponent
    ) {


        const number =
            BigNumber.from(
                value
            );


        const diff =
            exponent -
            number.exponent;



        if (
            diff !== 0
        ) {


            number.value *=
                Math.pow(
                    10,
                    -diff
                );


            number.exponent =
                exponent;


        }


        return this.apply(
            number
        );

    }


}


export default Normalize;