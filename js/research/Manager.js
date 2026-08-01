/**
 * World Creator
 * Research Manager
 *
 * Divine Research System
 */


import EPManager from "../ep/Manager.js";

import eventBus from "../core/eventBus.js";



class ResearchManager {


    constructor(){


        this.researches={



            originKnowledge:{


                name:

                "創世神託の記録",


                description:

                "世界の始まりに残された知識の欠片。",


                level:0,


                maxLevel:10,


                baseCost:100,


                effect:0.05



            },



            eternalFlow:{


                name:

                "永劫なる流転の啓示",


                description:

                "世界を巡る力の流れを理解する。",


                level:0,


                maxLevel:10,


                baseCost:500,


                effect:0.08



            },



            divineLaw:{


                name:

                "神域法則への接触",


                description:

                "世界を構成する法則の一部へ到達する。",


                level:0,


                maxLevel:5,


                baseCost:5000,


                effect:0.15



            }


        };


    }



    get(id){


        return this.researches[id];


    }



    getAll(){


        return this.researches;


    }



    getCost(id){


        const data=

        this.researches[id];



        if(!data){


            return 0;


        }



        return Math.floor(


            data.baseCost

            *

            Math.pow(

                2,

                data.level

            )


        );


    }



    canResearch(id){


        const data=

        this.researches[id];



        if(!data){


            return false;


        }



        if(

            data.level

            >=

            data.maxLevel

        ){


            return false;


        }



        return EPManager.canPay(

            this.getCost(id)

        );


    }



    researchUp(id){


        const data=

        this.researches[id];



        if(!data){


            return false;


        }



        const cost=

        this.getCost(id);



        if(

            !EPManager.consume(

                cost

            )

        ){


            return false;


        }



        data.level++;



        eventBus.emit(

            "research:update"

        );



        return true;


    }



    getMultiplier(){


        let multiplier=1;



        for(

            const id in this.researches

        ){


            const data=

            this.researches[id];



            multiplier+=

            data.level

            *

            data.effect;


        }



        return multiplier;


    }



    getStatus(id){


        const data=

        this.researches[id];



        if(!data){


            return null;


        }



        return {


            name:data.name,


            description:data.description,


            level:data.level,


            maxLevel:data.maxLevel,


            cost:{


                ep:

                this.getCost(id)


            },


            canResearch:

            this.canResearch(id),


            effect:

            data.effect

        };


    }



    toJSON(){


        return this.researches;


    }



    load(data){


        if(!data){


            return;


        }



        for(

            const id in data

        ){


            if(

                this.researches[id]

            ){


                this.researches[id].level=

                data[id].level

                ??

                0;


            }


        }


    }



}



export default new ResearchManager();