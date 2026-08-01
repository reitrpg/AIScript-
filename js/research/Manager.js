/**
 * World Creator
 * Research Manager
 *
 * Research System
 * Production / Converter / Rebirth Integration
 */


import ResourceManager from "../resource/Manager.js";



class ResearchManager {


    constructor(){


        this.research={


            agriculture:{


                name:"農業技術",


                level:0,


                max:10,


                cost:{


                    food:100


                },


                effect:1.05,


                type:"production"



            },



            mining:{


                name:"採掘技術",


                level:0,


                max:10,


                cost:{


                    ore:100


                },


                effect:1.1,


                type:"production"



            },



            magic:{


                name:"魔力研究",


                level:0,


                max:10,


                cost:{


                    mana:100


                },


                effect:1.15,


                type:"production"



            },



            world:{


                name:"世界解析",


                level:0,


                max:5,


                cost:{


                    crystal:10


                },


                effect:1.25,


                type:"converter"



            },



            rebirth:{


                name:"転生理論",


                level:0,


                max:5,


                cost:{


                    worldCore:1


                },


                effect:1.5,


                type:"rebirth"



            }


        };


    }



    researchUp(id){


        const data=

        this.research[id];



        if(!data){

            return false;

        }



        if(

            data.level >=

            data.max

        ){

            return false;

        }



        if(

            !this.canPay(

                data.cost

            )

        ){

            return false;

        }



        this.pay(

            data.cost

        );



        data.level++;



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



    getMultiplier(type=null){


        let value=1;



        for(

            const id in this.research

        ){


            const data=

            this.research[id];



            if(

                type

                &&

                data.type!==type

            ){

                continue;

            }



            value*=

            Math.pow(

                data.effect,

                data.level

            );


        }



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


        return this.research;


    }



    load(data){


        if(!data){

            return;

        }



       