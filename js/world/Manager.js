/**
 * World Creator
 * World Manager
 *
 * World Generation Integration
 */


import eventBus from "../core/eventBus.js";



class WorldManager {


    constructor(){


        this.current = null;


    }



    init(){



    }



    createWorld(){


        const rarities = [


            {
                name:"Normal",
                multiplier:1,
                effectCount:1
            },


            {
                name:"Rare",
                multiplier:1.5,
                effectCount:1
            },


            {
                name:"Epic",
                multiplier:2.5,
                effectCount:2
            },


            {
                name:"Legend",
                multiplier:5,
                effectCount:2
            },


            {
                name:"Mythic",
                multiplier:10,
                effectCount:3
            }


        ];



        const rarity =

        rarities[

            Math.floor(

                Math.random()

                *

                rarities.length

            )

        ];



        this.current = {


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

            this.createResources(),



            effects:

            this.createEffects(

                rarity.effectCount

            )


        };



        eventBus.emit(

            "world:created",

            this.current

        );


    }



    createName(){


        const names=[


            "アステリア",

            "エルドラ",

            "ネヴァリス",

            "オルビス",

            "ミストラ"


        ];



        return names[

            Math.floor(

                Math.random()

                *

                names.length

            )

        ];


    }



    createResources(){


        const list=[


            "wood",

            "stone",

            "food",

            "mana",

            "ore",

            "crystal"


        ];



        const result={};



        const count =

        2 +

        Math.floor(

            Math.random()*3

        );



        while(

            Object.keys(result).length

            <

            count

        ){


            const id =

            list[

                Math.floor(

                    Math.random()

                    *

                    list.length

                )

            ];



            result[id]={


                base:

                1 +

                Math.floor(

                    Math.random()*10

                )


            };


        }



        return result;


    }



    createEffects(count){


        const effects=[


            "豊かな森",

            "鉱脈の大地",

            "魔力循環",

            "神代遺構",

            "世界樹の核"


        ];



        const result=[];



        while(

            result.length < count

        ){


            const effect =

            effects[

                Math.floor(

                    Math.random()

                    *

                    effects.length

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



    getNeedExp(){


        return Math.floor(

            100 *

            Math.pow(

                1.5,

                this.current.level-1

            )

        );


    }



    addExp(value){


        if(!this.current){

            return;

        }



        this.current.exp += value;



        while(

            this.current.exp >=

            this.getNeedExp()

        ){


            this.current.exp -=

            this.getNeedExp();



            this.current.level++;


        }



        eventBus.emit(

            "world:update",

            this.current

        );


    }



    rebirth(){


        if(!this.current){

            return false;

        }



        const lv =

        this.current.level;



        this.current.rebirthMultiplier *=


        (

            Math.pow(

                lv,

                2

            )

            /

            100

        );



        this.current.rebirthCount++;



        this.current.level=1;

        this.current.exp=0;



        eventBus.emit(

            "world:rebirth",

            this.current

        );



        return true;


    }



    getCurrent(){


        return this.current;


    }



    update(){


        this.addExp(1);


    }



    toJSON(){


        return this.current;


    }



    load(data){


        this.current=data;


    }


}



const worldManager=

new WorldManager();



export default worldManager;