/**
 * World Creator
 * Research System
 *
 * Research + EP Cost Support
 */


import ResourceManager from "../resource/Manager.js";

import EPManager from "../ep/Manager.js";

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


                    ep:10


                },


                effect:1.05



            },



            mining:{


                name:"大地脈の解読",


                description:
                "大地に刻まれた流れを読み取り、資源獲得能力を高める。",


                level:0,


                max:10,


                cost:{


                    ep:50


                },


                effect:1.1



            },



            magic:{


                name:"原初魔力への接触",


                description:
                "世界創生時の魔力へ接近する。",


                level:0,


                max:10,


                cost:{


                    ep:200


                },


                effect:1.15



            },



            world:{


                name:"世界理の開眼",


                description:
                "世界法則の一端を理解する。",


                level:0,


                max:5,


                cost:{


                    ep:1000


                },


                effect:1.25



            },



            rebirth:{


                name:"輪廻門の理解",


                description:
                "循環する世界の理へ到達する。",


                level:0,


                max:5,


                cost:{


                    ep:10000


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

            data.level >= data.max

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


            if(

                id === "ep"

            ){


                if(

                    !EPManager.canPay(

                        cost[id]

                    )

                ){


                    return false;


                }


                continue;


            }



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


            if(

                id === "ep"

            ){


                EPManager.consume(

                    cost[id]

                );


                continue;


            }



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