/**
 * World Creator
 * Resource Converter
 *
 * Material Processing System
 */


import ResourceManager from "./Manager.js";



class Converter {


    constructor(){


        this.recipes = {


            stoneToOre:{


                input:{

                    stone:10

                },


                output:{

                    ore:1

                }


            },



            oreToCrystal:{


                input:{

                    ore:100,

                    mana:20

                },


                output:{

                    crystal:1

                }


            },



            crystalToStar:{


                input:{

                    crystal:100,

                    mana:100

                },


                output:{

                    starCrystal:1

                }


            },



            starToCore:{


                input:{

                    starCrystal:100

                },


                output:{

                    worldCore:1

                }


            }


        };


    }



    convert(recipeId){


        const recipe =

        this.recipes[recipeId];



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



        this.consume(

            recipe.input

        );



        this.add(

            recipe.output

        );



        return true;


    }



    canConvert(recipe){


        for(

            const id in recipe.input

        ){


            const resource =

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



    consume(input){


        for(

            const id in input

        ){


            ResourceManager

            .get(id)

            .consume(

                input[id]

            );


        }


    }



    add(output){


        for(

            const id in output

        ){



            let resource =

            ResourceManager.get(

                id

            );



            if(!resource){


                ResourceManager.create(

                    id,

                    id,

                    0

                );



                resource =

                ResourceManager.get(

                    id

                );


            }



            resource.add(

                output[id]

            );


        }


    }



    getRecipes(){


        return this.recipes;


    }


}



export default new Converter();