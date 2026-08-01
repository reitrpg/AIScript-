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


        this.researchMultiplier=1;



        this.recipes={


            woodToPlank:{


                name:"木材加工",


                input:{


                    wood:10


                },


                output:{


                    plank:1


                }


            },



            oreToMetal:{


                name:"鉱石精錬",


                input:{


                    ore:10


                },


                output:{


                    metal:1


                }


            },



            crystalToMana:{


                name:"魔力結晶変換",


                input:{


                    crystal:1


                },


                output:{


                    mana:10


                }


            },



            foodToPreserved:{


                name:"保存食加工",


                input:{


                    food:20


                },


                output:{


                    preservedFood:5


                }


            },



            woodOreToMaterial:{


                name:"建築素材生成",


                input:{


                    wood:5,


                    ore:5


                },


                output:{


                    material:1


                }


            }


        };


    }



    setResearchMultiplier(value){


        this.researchMultiplier=

        Number(value)

        ||

        1;


    }



    getMultiplier(){


        return this.researchMultiplier;


    }



    getAll(){


        return this.recipes;


    }



    canConvert(recipe){


        for(

            const id in recipe.input

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

                recipe.input[id]

            ){


                return false;

            }


        }



        return true;


    }



    convert(id){


        const recipe=

        this.recipes[id];



        if(!recipe){


            return false;


        }



        if(

            !this.canConvert(

                recipe

            )

        ){


            return false;

        }



        for(

            const item in recipe.input

        ){


            ResourceManager

            .get(item)

            .consume(

                recipe.input[item]

            );


        }



        for(

            const item in recipe.output

        ){


            let resource=

            ResourceManager.get(

                item

            );



            if(!resource){


                ResourceManager.create(

                    item,

                    item,

                    0

                );


            }



            ResourceManager

            .get(item)

            .add(

                recipe.output[item]

                *

                this.researchMultiplier

            );


        }



        eventBus.emit(

            "resource:update"

        );



        return true;


    }



    toJSON(){


        return {


            researchMultiplier:

            this.researchMultiplier


        };


    }



    load(data){


        if(!data){


            return;

        }



        this.researchMultiplier=

        data.researchMultiplier

        ??

        1;


    }



}



export default new Converter();