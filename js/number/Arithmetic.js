/**
 * World Creator
 * BigNumber Arithmetic
 *
 * 四則演算処理
 */


import BigNumber from "./BigNumber.js";
import Normalize from "./Normalize.js";


class Arithmetic {


    /**
     * 加算
     */

    static add(
        a,
        b
    ) {


        const result =
            BigNumber.from(
                a
            );


        result.add(
            b
        );


        return Normalize.apply(
            result
        );

    }



    /**
     * 減算
     */

    static subtract(
        a,
        b
    ) {


        const result =
            BigNumber.from(
                a
            );


        result.subtract(
            b
        );


        return Normalize.apply(
            result
        );

    }



    /**
     * 乗算
     */

    static multiply(
        a,
        b
    ) {


        const result =
            BigNumber.from(
                a
            );


        result.multiply(
            b
        );


        return Normalize.apply(
            result
        );

    }



    /**
     * 除算
     */

    static divide(
        a,
        b
    ) {


        const result =
            BigNumber.from(
                a
            );


        result.divide(
            b
        );


        return Normalize.apply(
            result
        );

    }



    /**
     * 剰余
     */

    static modulo(
        a,
        b
    ) {


        const left =
            BigNumber.from(
                a
            )
            .toNumber();



        const right =
            BigNumber.from(
                b
            )
            .toNumber();



        return