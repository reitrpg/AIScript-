/**
 * World Creator
 * World Manager
 */


import eventBus from "../core/eventBus.js";



class WorldManager {


    constructor(){


        this.current=null;


    }



    createWorld(){


        const rarityTable=[


            {
                name:"Normal",
                multiplier:1,
                effectCount:1
            },


            {
                name:"Rare",
                multiplier:1.5,
                effectCount:2
            },


            {
                name:"Epic",
                multiplier:2.5,
                effectCount:2
            },


            {
                name:"Legend",
                multiplier:5,
                effectCount:3
            },


            {
                name:"Mythic",
                multiplier:10,
                effectCount:4
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



        this.current={


            name:

            this.randomName(),



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

            "world:create",

            this.current

        );


    }



    randomName(){


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



    createResources(){


        return {


            wood:{

                base:1

            },


            stone:{

                base:1

            },


            food:{

                base:1

            },


            ore:{

                base:0.5

            },


            mana:{

                base:0.2

            }


        };


    }



    createEffects(count){


        const list=[


            "豊かな森",


            "鉱脈の大地",


            "魔力循環",


            "神代遺構",


            "世界樹の核"


        ];



        const result=[];



        while(

            result.length<count

        ){


            const effect=

            list[

                Math.floor(

                    Math.random()

                    *

                    list.length

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



    addExp(value){


        if(!this.current){

            return;

        }



        this.current.exp+=value;



        while(

            this.current.exp >=

            this.getNeedExp()

        ){


            this.current.exp-=

            this.getNeedExp();



            this.current.level++;



            eventBus.emit(

                "world:update",

                this.current

            );


        }


    }



    getNeedExp(){


        return Math.floor(


            100

            *

            Math.pow(

                1.35,

                this.current.level-1

            )


        );


    }



    rebirth(){


        if(!this.current){

            return false;

        }



        const level=

        this.current.level;



        const increase=

        Math.pow(

            level,

            2

        )

        /

        100;



        this.current.rebirthMultiplier*=

        increase;



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



    toJSON(){


        return this.current;


    }



    load(data){


       