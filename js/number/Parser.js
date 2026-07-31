/**
 * World Creator
 * BigNumber Parser
 *
 * 文字列変換処理
 */


import BigNumber from "./BigNumber.js";


class Parser {


    /**
     * 文字列解析
     */

    static parse(value) {


        if (
            value instanceof BigNumber
        ) {

            return value.clone();

        }



        if (
            typeof value === "number"
        ) {

            return BigNumber.from(
                value
            );

        }



        if (
            typeof value !== "string"
        ) {

            return BigNumber.zero();

        }



        const text =
            value
                .trim()
                .toLowerCase();



        /*
            指数表記
            例:
            1e100
        */

        if (
            text.includes("e")
        ) {


            const parts =
                text.split("e");



            const base =
                Number(
                    parts[0]
                );


            const exponent =
                Number(
                    parts[1]
                );



            return new BigNumber(

                base,

                exponent

            );

        }



        /*
            通常数値
        */

        return BigNumber.from(

            Number(
                text
            )

        );

    }



    /**
     * 安全解析
     */

    static safeParse(value) {


        try {

            return this.parse(
                value
            );

        }
        catch(error) {

            return BigNumber.zero();

        }

    }



    /**
     * JSON復元
     */

    static fromJSON(data) {


        if (!data) {

            return BigNumber.zero();

        }


        return BigNumber.from(
            data
        );

    }


}


export default Parser;