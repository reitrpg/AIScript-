/**
 * World Creator
 * Enemy Data
 *
 * 敵データ定義
 */


const enemyData = {


    /*
        初期敵
    */


    slime: {

        id: "slime",

        name: "Slime",

        description:
            "最弱級の生命体",

        rank:
            1,


        stats: {

            hp:
                10,

            attack:
                1,

            defense:
                1,

            speed:
                1

        },


        reward: {

            energy:
                5,

            matter:
                3

        }

    },



    beast: {

        id: "beast",

        name: "Beast",

        description:
            "野生の強力な生物",

        rank:
            2,


        stats: {

            hp:
                100,

            attack:
                15,

            defense:
                10,

            speed:
                8

        },


        reward: {

            energy:
                50,

            matter:
                30,

            life:
                5

        }

    },



    monster: {

        id: "monster",

        name: "Monster",

        description:
            "高い生命力を持つ怪物",

        rank:
            3,


        stats: {

            hp:
                1000,

            attack:
                120,

            defense:
                80,

            speed:
                30

        },


        reward: {

            energy:
                500,

            matter:
                300,

            life:
                100

        }

    },



    ancient: {

        id: "ancient",

        name: "Ancient Entity",

        description:
            "古代から存在する高位生命",

        rank:
            5,


        stats: {

            hp:
                100000,

            attack:
                10000,

            defense:
                5000,

            speed:
                100

        },


        reward: {

            energy:
                100000,

            soul:
                1,

            knowledge:
                1000

        }

    }


};


export default enemyData;