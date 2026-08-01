/**
 * World Creator
 * World Manager
 *
 * Integrated Version
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
                multiplier:1
            },


            {
                name:"Rare",
                multiplier:1.5
            },


            {
                name:"Epic",
                multiplier:2.5
            },


            {
                name:"Legend",
                multiplier:5
            },


            {
                name:"Mythic",
                multiplier:10
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

                "New World",



            rarity:

                rarity.name,



            rarityMultiplier:

                rarity.multiplier,



            level:

                1,



            exp:

                0,



            rebirthCount:

                0,



            rebirthMultiplier:

                1,



            resources:{},



            effects:[]



        };



        eventBus.emit(

            "world:created",

            this.current

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


            this.levelUp();


        }


    }



    getNeedExp(){


        return Math.floor(

            100 *

            Math.pow(

                1.5,

                this.current.level - 1

            )

        );


    }



    levelUp(){


        this.current.exp -=

            this.getNeedExp();



        this.current.level++;



        eventBus.emit(

            "world:update",

            this.current

        );


    }



    getLevelMultiplier(){


        if(!this.current){


            return 1;


        }



        return Math.pow(

            1.05,

            this.current.level - 1

        );


    }



    getProductionMultiplier(){


        if(!this.current){


            return 1;


        }



        return (

            this.getLevelMultiplier()

            *

            this.current.rarityMultiplier

            *

            this.current.rebirthMultiplier

        );


    }



    rebirth(){


        if(!this.current){


            return false;


        }



        const level =

            this.current.level;



        const bonus =


            (

                Math.pow(

                    level,

                    2

                )

                /

                100

            );



        this.current.rebirthMultiplier *=

            bonus;



        this.current.rebirthCount++;



        this.current.level = 1;


        this.current.exp = 0;



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


        if(!this.current){


            return;


        }



        this.addExp(

            1

        );


        eventBus.emit(

            "world:update",

            this.current

        );


    }



    toJSON(){


        return this.current;


    }



    load(data){


        if(data){


            this.current = data;


        }


    }


}



const worldManager =

    new WorldManager();



export default worldManager;