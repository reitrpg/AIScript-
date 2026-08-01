/**
 * World Creator
 * World Generator Fix
 */


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
                "鉱脈の大地",
                "肥沃な大地"
            ]
        },


        {
            name:"Epic",
            multiplier:2.5,
            effects:2,
            pool:[
                "鉱脈の大地",
                "魔力循環",
                "古代遺跡"
            ]
        },


        {
            name:"Legend",
            multiplier:5,
            effects:2,
            pool:[
                "魔力循環",
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



    const rarity =

    rarityTable[

        Math.floor(

            Math.random()

            *

            rarityTable.length

        )

    ];



    const effects =

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