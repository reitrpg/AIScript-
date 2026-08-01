/**
 * World Creator
 * Converter System
 *
 * Resource Conversion Controller
 */


import ResourceManager from "../resource/Manager.js";

import EPManager from "../ep/Manager.js";

import eventBus from "../core/eventBus.js";



class Converter {


    constructor(){


        this.multiplier=1;



        this.recipes={



            essenceExtraction:{


                name:

                "原初の変換",


                description:

                "集めた素材を世界力へ変換する。",


                input:{


                    wood:10,


                    ore:5


                },


                output:{


                    ep:10


                },


                unlockEP:0



            },



            manaConversion:{


                name:

                "魔力循環式",


                description:

                "魔力を効率的な世界力へ変換する。",


                input:{


                    mana:10


                },


                output:{


                    ep:50


                },


                unlockEP:100



            },



            crystalConversion:{


                name:

                "結晶昇華式",


                description:

                "結晶に宿る力を解放する。",


                input:{


                    crystal:1


                },


                output:{


                    ep:500


                },


                unlockEP:1000



            }


        };


    }



    getAll(){


        return this.recipes;


    }



    get(id){


        return this.recipes[id];


    }



    setMultiplier(value){


        this.multiplier=

        Number(value)

        ||

        1;


    }



    getMultiplier(){


        return this.multiplier;


    }



    isUnlocked(id){


        const recipe=

        this.recipes[id];



        if(!recipe){


            return false;


        }



        return true;


    }



    canConvert(id){


        const recipe=

        this.recipes[id];



        if(!recipe){


            return false;


        }



        if(

            !this.isUnlocked(id)

        ){


            return false;


        }



        for(

            const resource in recipe.input

        ){


            const data=

            ResourceManager.get(

                resource

            );



            if(

                !data

                ||

                data.getAmount()

                <

                recipe.input[resource]

            ){


                return false;


            }


        }



        return true;


    }



    convert(id){


        const recipe=

        this.recipes[id];



        if(

            !this.canConvert(id)

        ){


            return false;


        }



        for(

            const resource in recipe.input

        ){


            ResourceManager

            .get(resource)

            .consume(

                recipe.input[resource]

            );


        }



        for(

            const output in recipe.output

        ){



            const amount=

            recipe.output[output]

            *

            this.multiplier;



            if(

                output==="ep"

            ){


                EPManager.add(

                    amount

                );


                continue;


            }



            let resource=

            ResourceManager.get(

                output

            );



            if(!resource){


                ResourceManager.create(

                    output,

                    output

                );


            }



            ResourceManager

            .get(output)

            .add(

                amount

            );


        }



        eventBus.emit(

            "converter:update"

        );



        return true;


    }



   