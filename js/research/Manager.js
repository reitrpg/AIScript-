/**
 * World Creator
 * Research Manager
 *
 * Research Control System
 */


import Research from "./Research.js";

import ResourceManager from "../resource/Manager.js";



class ResearchManager {


    constructor(){


        this.research={


            agriculture:

            new Research({


                id:"agriculture",


                name:"農業技術",


                max:10,


                effect:1.05,


                type:"production",


                cost:{


                    food:100


                }


            }),



            mining:

            new Research({


                id:"mining",


                name:"採掘技術",


                max:10,


                effect:1.1,


                type:"production",


                cost:{


                    ore:100


                }


            }),



            magic:

            new Research({


                id:"magic",


                name:"魔力研究",


                max:10,


                effect:1.15,


                type:"production",


                cost:{


                    mana:100


                }


            }),



            world:

            new Research({


                id:"world",


                name:"世界解析",


                max:5,


                effect:1.25,


                type:"converter",


                cost:{


                    crystal:10


                }


            }),



            rebirth:

            new Research({


                id:"rebirth",


                name:"転生理論",


                max:5,


                effect:1.5,


                type:"rebirth",


                cost:{


                    worldCore:1


                }


            })


        };


    }



    researchUp(id){


        const research=

        this.research[id];



        if(!research){


            return false;

        }



        if(

            research.level >=

            research.max

        ){


            return false;

        }



        if(

            !this.canPay(

                research.cost

            )

        ){


            return false;

        }



        this.pay(

            research.cost

        );



        research.level++;



        return true;


    }



    canPay(cost){


        for(

            const id in cost

        ){


            const resource=

            ResourceManager.get(

                id

            );



            if(

                !resource

                ||

                resource.getAmount()

                <

                cost[id]

            ){


                return false;


            }


        }



        return true;


    }



    pay(cost){


        for(

            const id in cost

        ){


            const resource=

            ResourceManager.get(

                id

            );



            if(resource){


                resource.consume(

                    cost[id]

                );


            }


        }


    }



    getMultiplier(type){


        let value=1;



        Object.values(

            this.research

        )

        .forEach(

            research=>{


                if(

                    !type

                    ||

                    research.type===type

                ){


                    value*=

                    research.getMultiplier();


                }


            }

        );



        return value;


    }



    getProductionMultiplier(){


        return this.getMultiplier(

            "production"

        );


    }



    getConverterMultiplier(){


        return this.getMultiplier(

            "converter"

        );


    }



    getRebirthMultiplier(){


        return this.getMultiplier(

            "rebirth"

        );


    }



    getAll(){


        return this.research;


    }



    toJSON(){


        const data={};



        for(

            const id in this.research

        ){


            data[id]=

            this.research[id]

            .toJSON();


        }



        return data;


    }



    load(data){


        if(!data){

            return;

        }



        for(

            const id in data

        ){


            if(

                this.research[id]

            ){


                this.research[id]

                .load(

                    data[id]

                );


            }


        }


    }



}



export default new ResearchManager();