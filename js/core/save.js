/**
 * World Creator
 * Save System
 *
 * World / Resource / Research / Converter
 */


import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import ResearchManager from "../research/Manager.js";

import Converter from "../converter/Converter.js";



class SaveManager {


    constructor(){


        this.key=

        "world_creator_save";



        this.version=3;


    }



    save(){


        const data={


            version:

            this.version,



            world:

            WorldManager.toJSON(),



            resources:

            ResourceManager.toJSON(),



            research:

            ResearchManager.toJSON(),



            converter:

            Converter.toJSON()



        };



        localStorage.setItem(

            this.key,

            JSON.stringify(

                data

            )

        );


    }



    load(){


        const text=

        localStorage.getItem(

            this.key

        );



        if(!text){


            return false;


        }



        try{


            const data=

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



            if(

                data.research

            ){


                ResearchManager.load(

                    data.research

                );


            }



            if(

                data.converter

            ){


                Converter.load(

                    data.converter

                );


            }



            return true;


        }

        catch(error){


            console.error(

                "Save Load Error",

                error

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