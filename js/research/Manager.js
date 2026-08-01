/**
 * World Creator
 * Research System
 *
 * Divine Revelation Research
 */


import ResourceManager from "../resource/Manager.js";

import eventBus from "../core/eventBus.js";



class ResearchManager {


    constructor(){


        this.research={


            agriculture:{


                name:"豊穣神の啓示",


                description:
                "生命を育む神の知識に触れ、世界の実りを高める。",


                level:0,


                max:10,


                cost:{


                    food:100


                },


                effect:1.05



            },



            mining:{


                name:"大地脈の解読",


                description:
                "大地に刻まれた古き流れを読み取り、鉱脈への理解を深める。",


                level:0,


                max:10,


                cost:{


                    ore:100


                },


                effect:1.1



            },



            magic:{


                name:"原初魔力への接触",


                description:
                "世界創生時より存在する魔力の根源へ近づく。",


                level:0,


                max:10,


                cost:{


                    mana:100


                },


                effect:1.15



            },



            world:{


                name:"世界理の開眼",


                description:
                "世界そのものが持つ法則の一端を理解する。",


                level:0,


                max:5,


                cost:{


                    crystal:10


                },


                effect:1.25



            },



            rebirth:{


                name:"輪廻門の理解",


                description:
                "終わりと始まりを繋ぐ循環の理へ到達する。",


                level:0,


                max:5,


                cost:{


                    worldCore:1


                },


                effect:1.5



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

            data.level>=

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



        eventBus.emit(

            "research:update"

        );



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


            ResourceManager

            .get(id)

            .consume(

                cost[id]

            );


        }


    }



    getMultiplier(){


        let value=1;



        for(

            const id in this.research

        ){


            const data=

            this.research[id];



            value*=

            Math.pow(

                data.effect,

                data.level

            );


        }



        return value;


    }



    getProductionMultiplier(){


        return this.getMultiplier();


    }



    getConverterMultiplier(){


        return this.getMultiplier();


    }



    getAll(){


        return this.research;


    }



    toJSON(){


        return this.research;


    }



    load(data){


        if(data){


            this.research=data;


        }


    }



}



export default new ResearchManager();