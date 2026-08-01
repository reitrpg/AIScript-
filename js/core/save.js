/**
 * World Creator
 * Save System
 *
 * World + Resource + Research + EP
 */


import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import ResearchManager from "../research/Manager.js";

import Converter from "../converter/Converter.js";

import EPManager from "../ep/Manager.js";



class SaveManager {


    constructor(){


        this.key=

        "world_creator_save";


        this.version=5;


    }



    save(){


        const data={


            version:

            this.version,



            time:

            Date.now(),



            world:

            WorldManager.toJSON(),



            resources:

            ResourceManager.toJSON(),



            research:

            ResearchManager.toJSON(),



            converter:

            Converter.toJSON(),



            ep:

            EPManager.toJSON()



        };



        try{


            localStorage.setItem(

                this.key,

                JSON.stringify(

                    data

                )

            );


        }

        catch(error){


            console.error(

                "Save Error",

                error

            );


        }


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



            if(

                data.ep

            ){


                EPManager.load(

                    data.ep

                );


            }



            return true;


        }

        catch(error){


            console.error(

                "Load Error",

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