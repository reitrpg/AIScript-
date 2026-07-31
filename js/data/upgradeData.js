/**
 * World Creator
 * Upgrade Data
 *
 * 強化項目定義データ
 */


const upgradeData = {


    /*
        資源強化
    */


    energyProduction: {

        id: "energyProduction",

        name: "Energy Production",

        description:
            "エネルギー生産量を増加",

        category:
            "resource",

        maxLevel:
            null,

        cost: {

            energy: 10

        },

        effect: {

            type:
                "multiply",

            target:
                "energy",

            value:
                1.1

        }

    },


    matterProduction: {

        id: "matterProduction",

        name: "Matter Production",

        description:
            "物質生成量を増加",

        category:
            "resource",

        maxLevel:
            null,

        cost: {

            energy: 100

        },

        effect: {

            type:
                "multiply",

            target:
                "matter",

            value:
                1.1

        }

    },



    /*
        世界強化
    */


    worldExpansion: {

        id: "worldExpansion",

        name: "World Expansion",

        description:
            "世界規模を拡張",

        category:
            "world",

        maxLevel:
            null,

        cost: {

            matter: 1000,

            energy: 500

        },

        effect: {

            type:
                "increase",

            target:
                "worldSize",

            value:
                1

        }

    },



    /*
        研究強化
    */


    researchSpeed: {

        id: "researchSpeed",

        name: "Research Speed",

        description:
            "研究速度を向上",

        category:
            "research",

        maxLevel:
            null,

        cost: {

            knowledge: 100

        },

        effect: {

            type:
                "multiply",

            target:
                "research",

            value:
                1.05

        }

    },



    /*
        転生関連
    */


    rebirthPower: {

        id: "rebirthPower",

        name: "Rebirth Power",

        description:
            "転生後の成長補正を強化",

        category:
            "rebirth",

        maxLevel:
            null,

        cost: {

            soul: 1

        },

        effect: {

            type:
                "multiply",

            target:
                "global",

            value:
                1.02

        }

    }


};


export default upgradeData;