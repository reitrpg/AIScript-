/**
 * World Creator
 * World Data
 *
 * 世界生成・発展用データ
 */


const worldData = {


    /*
        基本世界
    */

    normal: {

        id: "normal",

        name: "Normal World",

        description:
            "標準的な世界",

        difficulty:
            1,


        start: {

            size: 1,

            population: 10,

            civilization: 0,

            magic: 0

        },


        modifiers: {

            resource:
                1.0,

            growth:
                1.0,

            danger:
                1.0

        }

    },



    /*
        魔法世界
    */

    magicWorld: {

        id: "magicWorld",

        name: "Magic World",

        description:
            "魔力が豊富な世界",

        difficulty:
            2,


        start: {

            size: 1,

            population: 10,

            civilization: 0,

            magic: 100

        },


        modifiers: {

            resource:
                1.2,

            growth:
                1.1,

            danger:
                1.3

        }

    },



    /*
        荒廃世界
    */

    ruinedWorld: {

        id: "ruinedWorld",

        name: "Ruined World",

        description:
            "文明崩壊後の世界",

        difficulty:
            3,


        start: {

            size: 1,

            population: 5,

            civilization: 0,

            magic: 20

        },


        modifiers: {

            resource:
                0.8,

            growth:
                0.7,

            danger:
                1.8

        }

    },



    /*
        異界
    */

    otherWorld: {

        id: "otherWorld",

        name: "Other World",

        description:
            "未知の法則を持つ世界",

        difficulty:
            5,


        start: {

            size: 1,

            population: 1,

            civilization: 0,

            magic: 500

        },


        modifiers: {

            resource:
                2.0,

            growth:
                0.5,

            danger:
                3.0

        }

    }


};


export default worldData;