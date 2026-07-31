/**
 * World Creator
 * Tree Data
 *
 * 成長ツリー定義データ
 */


const treeData = {


    /*
        Life Tree
    */

    life: {


        id: "life",

        name: "Life Tree",

        description:
            "生命の発展を司る成長系統",


        nodes: {


            origin: {

                id: "origin",

                name: "Origin",

                description:
                    "生命の基礎能力を解放",

                cost: {

                    life: 10

                },

                effect: {

                    type:
                        "increase",

                    target:
                        "population",

                    value:
                        10

                }

            },


            evolution: {

                id: "evolution",

                name: "Evolution",

                description:
                    "生命進化速度を向上",

                cost: {

                    life: 100,

                    knowledge: 10

                },

                effect: {

                    type:
                        "multiply",

                    target:
                        "growth",

                    value:
                        1.1

                }

            },


            civilization: {

                id: "civilization",

                name: "Civilization",

                description:
                    "文明形成能力を獲得",

                cost: {

                    life: 1000,

                    knowledge: 100

                },

                effect: {

                    type:
                        "unlock",

                    target:
                        "civilization"

                }

            }


        }


    },



    /*
        Death Tree
    */

    death: {


        id: "death",

        name: "Death Tree",

        description:
            "終焉と再生を司る成長系統",


        nodes: {


            decay: {

                id: "decay",

                name: "Decay",

                description:
                    "破壊から力を得る",

                cost: {

                    soul: 1

                },

                effect: {

                    type:
                        "multiply",

                    target:
                        "damage",

                    value:
                        1.2

                }

            },


            rebirth: {

                id: "rebirth",

                name: "Rebirth",

                description:
                    "転生能力を解放",

                cost: {

                    soul: 10

                },

                effect: {

                    type:
                        "unlock",

                    target:
                        "rebirth"

                }

            },


            eternity: {

                id: "eternity",

                name: "Eternity",

                description:
                    "永続的な成長補正",

                cost: {

                    soul: 1000

                },

                effect: {

                    type:
                        "multiply",

                    target:
                        "global",

                    value:
                        2

                }

            }


        }


    }


};


export default treeData;