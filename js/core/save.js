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



class SaveManager {


    constructor(){


        this.key=

        "world_creator_save";



        this.version=10;



        this.data={};


    }



    createDefault(){


        return {


            version:

            this.version,



            created:

            Date.now(),



            updated:

            Date.now(),



            settings:{


                tickSpeed:1000,


                autoSave:300000,


                numberFormat:"normal",


                language:"ja",


                speedRun:false


            },



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


        const current=

        this.data

        ||

        this.createDefault();



        current.version=

        this.version;



        current.updated=

        Date.now();



        current.world=

        WorldManager.toJSON();



        current.resources=

        ResourceManager.toJSON();



        current.research=

        ResearchManager.toJSON();



        current.converter=

        Converter.toJSON();



        current.ep=

        EPManager.toJSON();



        try{


            localStorage.setItem(

                this.key,

                JSON.stringify(

                    current

                )

            );



            this.data=current;



        }

        catch(error){


            console.error(

                "Save Error",

                error

            );


        }


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

                "Load Error",

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



        if(

            this.data.world

        ){


            WorldManager.load(

                this.data.world

            );


        }



        if(

            this.data.resources

        ){


            ResourceManager.load(

                this.data.resources

            );


        }



        if(

            this.data.research

        ){


            ResearchManager.load(

                this.data.research

            );


        }



        if(

            this.data.converter

        ){


            Converter.load(

                this.data.converter

            );


        }



        if(

            this.data.ep

        ){


            EPManager.load(

                this.data.ep

            );


        }


    }



    getSettings(){


        return this.data.settings;


    }



    setSettings(settings){


        this.data.settings=

        {

            ...

            this.data.settings,

            ...

            settings

        };


    }



    getDebug(){


        return this.data.debug;


    }



    setDebug(debug){


        this.data.debug=

        {

            ...

            this.data.debug,

            ...

            debug

        };


    }



    clear(){


        localStorage