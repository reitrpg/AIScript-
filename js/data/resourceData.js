/**
 * World Creator
 * Resource Data
 *
 * 資源定義データ
 */


/*
    基本資源
*/

const resourceData = {


    /*
        初期資源
    */

    energy: {

        id: "energy",

        name: "Energy",

        description:
            "世界を維持する基本エネルギー",

        type: "basic",

        baseValue: 0

    },


    matter: {

        id: "matter",

        name: "Matter",

        description:
            "世界を構成する物質",

        type: "basic",

        baseValue: 0

    },


    life: {

        id: "life",

        name: "Life",

        description:
            "生命活動によって生まれる力",

        type: "basic",

        baseValue: 0

    },


    knowledge: {

        id: "knowledge",

        name: "Knowledge",

        description:
            "研究や発展に使用する知識",

        type: "research",

        baseValue: 0

    },


    soul: {

        id: "soul",

        name: "Soul",

        description:
            "転生や高位技術に必要な特殊資源",

        type: "special",

        baseValue: 0

    },


    /*
        発展資源
    */

    civilization: {

        id: "civilization",

        name: "Civilization",

        description:
            "文明発展度を示す資源",

        type: "world",

        baseValue: 0

    },


    magic: {

        id: "magic",

        name: "Magic",

        description:
            "魔法体系を形成する力",

        type: "special",

        baseValue: 0

    }


};


export default resourceData;