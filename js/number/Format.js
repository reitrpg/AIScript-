/**
 * World Creator
 * BigNumber Format
 *
 * 巨大数表示処理
 */


import BigNumber from "./BigNumber.js";


class Format {


    /**
     * 標準表示
     */

    static format(
        value,
        decimal = 2
    ) {


        const number =
            BigNumber.from(
                value
            );


        if (
            number.value === 0
        ) {

            return "0";

        }



        const suffix =
            this.getSuffix(
                number.exponent
            );



        if (
            suffix
        ) {


            return (

                number.value
                    .toFixed(
                        decimal
                    )

                +

                suffix

            );

        }



        return number
            .toNumber()
            .toFixed(
                decimal
            );

    }



    /**
     * 接尾辞取得
     */

    static getSuffix(
        exponent
    ) {


        const table = {


            3:
                "K",


            6:
                "M",


            9:
                "B",


            12:
                "T",


            15:
                "Qa",


            18:
                "Qi",


            21:
                "Sx",


            24:
                "Sp",


            27:
                "Oc",


            30:
                "No"

        };



        return (
            table[
                exponent
            ]
            ??
            (
                exponent > 30
                    ?
                    "e"
                    +
                    exponent
                    :
                    ""
            )
        );

   