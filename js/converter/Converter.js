/**
 * World Creator
 * Converter System
 *
 * Resource -> EP Converter
 */


import ResourceManager from "../resource/Manager.js";
import EPManager from "../ep/Manager.js";
import eventBus from "../core/eventBus.js";



class Converter {


    constructor(){


        this.recipes={


            wood:{


                resource:"wood",


                cost:10,


                ep:1


            },



            stone:{


                resource:"stone",


                cost:10,


                ep:1


            },



            ore:{


                resource:"ore",


                cost:10,


                ep:2


            }


        };


    }



    getRecipes(){


        return this.recipes;


    }



    addRecipe(id,data){


        this.recipes[id]=data;


    }



    canConvert(id){


        const recipe=

        this.recipes[id];



        if(!recipe){


            return false;


        }



        return ResourceManager.has(

            recipe.resource,

            recipe.cost

        );


    }



    convert(id){


        const recipe=

        this.recipes[id];



        if(!recipe){


            return false;


        }



        if(

            !this.canConvert(id)

        ){


            return false;


        }



        ResourceManager.consume(

            recipe.resource,

            recipe.cost

        );



        EPManager.add(

            recipe.ep

        );



        eventBus.emit(

            "converter:update"

        );



        return true;


    }



    convertAll(id){


        const recipe=

        this.recipes[id];



        if(!recipe){


            return 0;


        }



        let count=0;



        while(

            this.canConvert(id)

        ){


            this.convert(id);


            count++;


        }



        return count;


    }



    toJSON(){


        return this.recipes;


    }



    load(data){


        if(!data){


            return;


        }



        this.recipes={


            ...this.recipes,


            ...data


        };


    }


}



export default new Converter();