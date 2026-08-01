/**
 * World Creator
 * Save System
 *
 * Universal Save Data Controller
 */


import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import ResearchManager from "../research/Manager.js";

import Converter from "../converter/Converter.js";

import EPManager from "../ep/Manager.js";

import UpgradeManager from "../upgrades/Manager.js";



class SaveManager {


    constructor(){


        this.key=

        "world_creator_save";


        this.version=11;


        this.data={};


    }



    createDefault(){


        return {


            version:this.version,


            created:Date.now(),


            updated:Date.now(),



            settings:{},



            debug:{


                enabled:false


            },



            upgrades:{},



            world:{},



            resources:{},



            research:{},



            converter:{},



            ep:{


                amount:0,


                totalEarned:0


            }


        };


    }



    save(){


        this.data.version=

        this.version;



        this.data.updated=

        Date.now();



        this.data.world=

        WorldManager.toJSON();



        this.data.resources=

        ResourceManager.toJSON();



        this.data.research=

        ResearchManager.toJSON();



        this.data.converter=

        Converter.toJSON();



        this.data.ep=

        EPManager.toJSON();



        this.data.upgrades=

        UpgradeManager.toJSON();



        localStorage.setItem(

            this.key,

            JSON.stringify(

                this.data

            )

        );


    }



    load(){


        const save=

        localStorage.getItem(

            this.key

        );



        if(!save){


            this.data=

            this.createDefault();


            return false;


        }



        try{


            this.data=

            JSON.parse(

                save

            );



            this.migrate();



            this.applyData();



            return true;


        }

        catch(error){


            console.error(

                error

            );


            this.data=

            this.createDefault();



            return false;


        }


    }



    migrate(){


        const defaultData=

        this.createDefault();



        for(

            const key in defaultData

        ){


            if(

                this.data[key]===undefined

            ){


                this.data[key]=

                defaultData[key];


            }


        }



        this.data.version=

        this.version;


    }



    applyData(){


        WorldManager.load(

            this.data.world

        );



        ResourceManager.load(

            this.data.resources

        );



        ResearchManager.load(

            this.data.research

        );



        Converter.load(

            this.data.converter

        );



        EPManager.load(

            this.data.ep

        );



        UpgradeManager.load(

            this.data.upgrades

        );


    }



    getSettings(){


        return this.data.settings;


    }



    setSettings(data){


        this.data.settings=

        {

            ...

            this.data.settings,

            ...

            data

        };


    }



    getDebug(){


        return this.data.debug;


    }



    setDebug(data){


        this.data.debug=

        {

            ...

            this.data.debug,

            ...

            data

        };


    }



    clear(){


        localStorage.removeItem(

            this.key

        );



        this.data=

        this.createDefault();


    }



}



export default new SaveManager();