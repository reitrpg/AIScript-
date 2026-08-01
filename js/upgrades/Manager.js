/**
 * World Creator
 * Upgrade Manager
 *
 * Infinite Divine Upgrade System
 */


import EPManager from "../ep/Manager.js";

import eventBus from "../core/eventBus.js";



class UpgradeManager {


    constructor(){


        this.upgrades={



            divineHarvest:{


                name:

                "豊穣神の微かな祝福",


                description:

                "生命の流れを僅かに整え、収穫効率を高める。",


                level:0,


                baseCost:100,


                effect:0.01



            },



            ancientKnowledge:{


                name:

                "古代神託の欠片",


                description:

                "失われた知識の一部を呼び起こす。",


                level:0,


                baseCost:500,


                effect:0.02



            },



            creationPulse:{


                name:

                "創世の残響",


                description:

                "世界創造の余波を利用する。",


                level:0,


                baseCost:5000,


                effect:0.03



            }


        };


    }



    getAll(){


        return this.upgrades;


    }



    get(id){


        return this.upgrades[id];


    }



    getCost(id){


        const upgrade=

        this.upgrades[id];



        if(!upgrade){


            return 0;


        }



        return Math.floor(


            upgrade.baseCost

            *

            Math.pow(

                1.15,

                upgrade.level

            )


        );


    }



    canUpgrade(id){


        return EPManager.canPay(

            this.getCost(id)

        );


    }



    upgrade(id){


        const data=

        this.upgrades[id];



        if(!data){


            return false;


        }



        const cost=

        this.getCost(id);



        if(

            !EPManager.canPay(cost)

        ){


            return false;


        }



        EPManager.consume(

            cost

        );



        data.level++;



        eventBus.emit(

            "upgrade:update"

        );



        return true;


    }



    getEffect(id){


        const data=

        this.upgrades[id];



        if(!data){


            return 0;


        }



        return (

            data.level

            *

            data.effect

        );


    }



    getTotalMultiplier(){


        let value=1;



        for(

            const id in this.upgrades

        ){


            value+=

            this.getEffect(id);


        }



        return value;


    }



    getStatus(id){


        const data=

        this.upgrades[id];



        if(!data){


            return null;


        }



        return {


            name:data.name,


            description:data.description,


            level:data.level,


            cost:this.getCost(id),


            canUpgrade:this.canUpgrade(id),


            effect:this.getEffect(id)


        };


    }



    toJSON(){


        return this.upgrades;


    }



    load(data){


        if(data){


            this.upgrades=data;


        }


    }



}



export default new UpgradeManager();