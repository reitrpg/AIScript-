/**
 * World Creator
 * BigNumber Compare
 *
 * 巨大数比較処理
 */


import BigNumber from "./BigNumber.js";


class Compare {


    /**
     * 比較
     *
     * return
     *  1 : a > b
     *  0 : a = b
     * -1 : a < b
     */

    static compare(
        a,
        b
    ) {


        const left =
            BigNumber.from(
                a
            );


        const right =
            BigNumber.from(
                b
            );



        if (
            left.exponent >
            right.exponent
        ) {

            return 1;

        }


        if (
            left.exponent <
            right.exponent
        ) {

            return -1;

        }



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
     * 大小判定
     */

    static greater(
        a,
        b
    ) {


        return (
            this.compare(
                a,
                b
            ) > 0
        );

    }



    /**
     * 以下判定
     */

    static less(
        a,
        b
    ) {


        return (
            this.compare(
                a,
                b
            ) < 0
        );

    }



    /**
     * 等価判定
     */

    static equal(
        a,
        b
    ) {


        return (
            this.compare(
                a,
                b
            ) === 0
        );

    }



    /**
     * 最大値
     */

    static max(
        a,
        b
    ) {


        return (

            this.greater(
                a,
                b
            )

            ?

            BigNumber.from(a)

            :

            BigNumber.from(b)

        );

    }



    /**
     * 最小値
     */

    static min(
        a,
        b
    ) {


        return (

            this.less(
                a,
                b
            )

            ?

            BigNumber.from(a)

            :

            BigNumber.from(b)

        );

    }


}


export default Compare;