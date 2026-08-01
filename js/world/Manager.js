/**
 * World Creator
 * World Resource Generation
 */


// 既存WorldManager内の
// createResources()
// を以下へ置換


createResources(rarity, effects){


    const resources = {};


    const basic = [

        "wood",

        "stone",

        "food"

    ];



    const advanced = [

        "ore",

        "mana"

    ];



    const rare = [

        "crystal",

        "starCrystal"

    ];



    let count = 2;



    switch(rarity){


        case "Rare":

            count = 3;

            break;


        case "Epic":

            count = 4;

            break;


        case "Legend":

            count = 5;

            break;


        case "Mythic":

            count = 6;

            break;


    }



    const pool = [

        ...basic

    ];



    if(

        rarity !== "Normal"

    ){

        pool.push(

            ...advanced

        );

    }



    if(

        rarity === "Legend"

        ||

        rarity === "Mythic"

    ){

        pool.push(

            ...rare

        );

    }



    while(

        Object.keys(resources).length

        <

        count

    ){


        const id =

        pool[

            Math.floor(

                Math.random()

                *

                pool.length

            )

        ];



        if(

            !resources[id]

        ){


            resources[id]={


                base:

                this.getBaseProduction(

                    rarity,

                    id

                )


            };


        }


    }



    // 固有効果による追加素材


    if(

        effects.includes(

            "世界樹の核"

        )

    ){


        resources.worldCore={


            base:1


        };


    }



    if(

        effects.includes(

            "星の祝福"

        )

    ){


        resources.starCrystal={


            base:1


        };


    }



    return resources;


}




getBaseProduction(

    rarity,

    resource

){


    let value = 1;



    switch(rarity){


        case "Rare":

            value*=2;

            break;


        case "Epic":

            value*=4;

            break;


        case "Legend":

            value*=8;

            break;


        case "Mythic":

            value*=15;

            break;


    }



    if(

        resource==="crystal"

        ||

        resource==="worldCore"

    ){


        value*=0.2;


    }



    return value;


}