/**
 * World Creator
 * Research System
 *
 * Divine Revelation Research
 */


import ResourceManager from "../resource/Manager.js";

import EPManager from "../ep/Manager.js";

import eventBus from "../core/eventBus.js";



class ResearchManager {


    constructor(){


        this.research={



            harvest:{


                name:

                "豊穣神の恩寵",


                description:

                "生命の循環を理解し、世界の実りを増幅させる。",


                level:0,


                max:null,


                cost:{


                    ep:10


                },


                growth:1.05,


                infinite:true



            },



            earth:{


                name:

                "大地脈の啓示",


                description:

                "地脈に眠る力を読み取り、資源の流れを強化する。",


                level:0,


                max:null,


                cost:{


                    ep:50


                },


                growth:1.08,


                infinite:true



            },



            mana:{


                name:

                "原初魔力への接触",


                description:

                "世界創造以前の魔力構造へ接続する。",


                level:0,


                max:null,


                cost:{


                    ep:200


                },


                growth:1.1,


                infinite:true



            },



            creation:{


                name:

                "創世神の残響",


                description:

                "世界の根源法則の一部を理解する。",


                level:0,


                max:null,


                cost:{


                    ep:1000


                },


                growth:1.15,


                infinite:true



            }


        };


    }



    get(id){


        return this.research[id];


    }



    getAll(){


        return this.research;


    }



    getCost(id){


        const data=

        this.research[id];



        if(!data){


            return null;


        }



        return {


            ep:

            Math.floor(

                data.cost.ep

                *

                Math.pow(

                    1.25,

                    data.level

                )

            )


        };


    }



    canResearch(id){


        const cost=

        this.getCost(

            id

        );



        if(!cost){


            return false;


        }



        return EPManager.canPay(

            cost.ep

        );


    }



    researchUp(id){


        const data=

        this.research[id];



        if(!data){


            return false;


        }



        const cost=

        this.getCost(

            id

        );



        if(

            !this.canResearch(

                id

            )

        ){


            return false;


        }



        EPManager.consume(

            cost.ep

        );



        data.level++;



        eventBus.emit(

            "research:update"

        );



        return true;


    }



    getEffect(id){


        const data=

        this.research[id];



        if(!data){


            return 1;


        }



        return Math.pow(


            data.growth,


            data.level


        );


    }



    getMultiplier(){


        let value=1;



        for(

            const id in this.research

        ){


            value*=

            this.getEffect(

                id

            );


        }



        return value;


    }



    getStatus(id){


        const data=

        this.research[id];



        if(!data){


            return null;


        }



        return {


            name:data.name,


            description:data.description,


            level:data.level,


            cost:this.getCost(id),


            canResearch:this.canResearch(id)


        };


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