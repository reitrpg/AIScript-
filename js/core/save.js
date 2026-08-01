/**
 * World Creator
 * Save System
 *
 * World Data Integration
 */


import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";



class SaveManager {


    constructor(){


        this.key =

        "world_creator_save";


    }



    save(){


        const data = {


            world:

            WorldManager.toJSON(),



            resources:

            ResourceManager.toJSON(),



            version:

            1



        };



        localStorage.setItem(

            this.key,

            JSON.stringify(data)

        );


    }



    load(){


        const text =

        localStorage.getItem(

            this.key

        );



        if(!text){


            return false;


        }



        try{


            const data =

            JSON.parse(

                text

            );



            if(

                data.world

            ){


                WorldManager.load(

                    data.world

                );


            }



            if(

                data.resources

            ){


                ResourceManager.load(

                    data.resources

                );


            }



            return true;



        }

        catch(e){


            console.error(

                "Save Load Error",

                e

            );



            return false;


        }


    }



    clear(){


        localStorage.removeItem(

            this.key

        );


    }


}



export default new SaveManager();