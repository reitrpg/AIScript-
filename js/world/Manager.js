/**
 * World Creator
 * World Manager Complete
 */


import eventBus from "../core/eventBus.js";

import ResearchManager from "../research/Manager.js";



class WorldManager {


    constructor(){


        this.current=null;


        this.unlocks={

            extraResource1:false,

            extraResource2:false,

            rareResource:false

        };


    }



    createWorld(){


        const rarityTable=[


            {
                name:"Normal",
                multiplier:1,
                effects:1,
                pool:[
                    "豊かな森",
                    "肥沃な大地"
                ]
            },


            {
                name:"Rare",
                multiplier:1.5,
                effects:1,
                pool:[
                    "豊かな森",
                    "鉱脈の大地"
                ]
            },


            {
                name:"Epic",
                multiplier:2.5,
                effects:2,
                pool:[
                    "鉱脈の大地",
                    "魔力循環"
                ]
            },


            {
                name:"Legend",
                multiplier:5,
                effects:2,
                pool:[
                    "神代遺構",
                    "星の祝福"
                ]
            },


            {
                name:"Mythic",
                multiplier:10,
                effects:3,
                pool:[
                    "世界樹の核",
                    "創世の力",
                    "星海の加護"
                ]
            }


        ];



        const rarity=

        rarityTable[

            Math.floor(

                Math.random()

                *

                rarityTable.length

            )

        ];



        const effects=

        this.createEffects(

            rarity.pool,

            rarity.effects

        );



        this.current={


            name:

            this.createName(),



            rarity:

            rarity.name,



            rarityMultiplier:

            rarity.multiplier,



            level:1,


            exp:0,


            rebirthCount:0,


            rebirthMultiplier:1,


            resources:

            this.createResources(

                rarity.name,

                effects

            ),


            effects:effects


        };



        eventBus.emit(

            "world:created",

            this.current

        );


    }



    createName(){


        const list=[

            "アステリア",

            "エルドラ",

            "ネヴァリス",

            "オルビス",

            "アルカディア"

        ];



        return list[

            Math.floor(

                Math.random()

                *

                list.length

            )

        ];


    }



    createEffects(pool,count){


        const result=[];



        while(

            result.length<count

        ){


            const effect=

            pool[

                Math.floor(

                    Math.random()

                    *

                    pool.length

                )

            ];



            if(

                !result.includes(effect)

            ){


                result.push(effect);


            }


        }



        return result;


    }



    createResources(rarity,effects){


        const result={};



        const base=[

            "wood",

            "stone",

            "food"

        ];



        let count=2;



        if(rarity==="Rare")

            count=3;


        if(rarity==="Epic")

            count=4;


        if(rarity==="Legend")

            count=5;


        if(rarity==="Mythic")

            count=6;



        const pool=[...base];



        if(rarity!=="Normal"){


            pool.push(

                "ore",

                "mana"

            );


        }



        if(

            rarity==="Legend"

            ||

            rarity==="Mythic"

        ){


            pool.push(

                "crystal"

            );


        }



        while(

            Object.keys(result).length<count

        ){


            const id=

            pool[

                Math.floor(

                    Math.random()

                    *