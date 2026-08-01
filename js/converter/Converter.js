/**
 * World Creator
 * Converter System
 *
 * Resource Conversion Management
 */


import ResourceManager from "../resource/Manager.js";

import eventBus from "../core/eventBus.js";



class Converter {


    constructor(){


        this.multiplier=1;


        this.recipes={



            woodToPlank:{


                name:"木材加工",


                unlockEP:0,


                input:{


                    wood:10


                },


                output:{


                    plank:1


                }


            },



            oreToMetal:{


                name:"鉱石精錬",


                unlockEP:100,


                input:{


                    ore:10


                },


                output:{


                    metal:1


                }


            },



            crystalToMana:{


                name:"魔力変換",


                unlockEP:1000,


                input:{


                    crystal:1


                },


                output:{


                    mana:10


                }


            }


        };


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



    getAll(){


        return this.recipes;


    }



    isUnlocked(recipe){


        return true;


    }



    canConvert(id){


        const recipe=

        this.recipes[id];



        if(!recipe){


            return false;


        }



        if(

            !this.isUnlocked(

                recipe

            )

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

            !this.canConvert(

                id

            )

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

            const resource in recipe.output

        ){


            let target=

            ResourceManager.get(

                resource

            );



            if(!target){


                ResourceManager.create(

                    resource,

                    resource

                );


            }



            ResourceManager

            .get(resource)

            .add(

                recipe.output[resource]

                *

                this.multiplier

            );


        }



        eventBus.emit(

            "resource:update"

        );



        return true;


    }



    toJSON(){


        return {


            multiplier:

            this.multiplier


        };


    }



    load(data){


        if(!data){


            return;

        }



        this.multiplier=

        Number(

            data.multiplier

        )

        ||

        1;


    }



}



export default new Converter();