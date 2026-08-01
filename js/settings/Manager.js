/**
 * World Creator
 * Settings Manager
 *
 * Global Configuration Controller
 */


import SaveManager from "../core/save.js";

import eventBus from "../core/eventBus.js";



class SettingsManager {


    constructor(){


        this.defaultSettings={


            tickSpeed:1000,


            autoSave:300000,


            numberFormat:"normal",


            debugMode:false,


            speedRun:false,


            language:"ja",


            seed:null


        };



        this.settings=

        {

            ...

            this.defaultSettings

        };


    }



    init(){


        const data=

        SaveManager.getSettings();



        if(data){


            this.settings=

            {

                ...

                this.settings,

                ...

                data

            };


        }


    }



    get(key){


        return this.settings[key];


    }



    getAll(){


        return this.settings;


    }



    set(key,value){


        if(

            this.settings[key]===undefined

        ){


            return false;


        }



        this.settings[key]=value;



        this.save();



        eventBus.emit(

            "settings:update"

        );



        return true;


    }



    save(){


        SaveManager.setSettings(

            this.settings

        );


    }



    getTickSpeed(){


        return this.settings.tickSpeed;


    }



    setTickSpeed(value){


        const speed=

        Number(value);



        if(

            speed>0

        ){


            this.set(

                "tickSpeed",

                speed

            );


        }


    }



    getAutoSaveTime(){


        return this.settings.autoSave;


    }



    setAutoSaveTime(value){


        const time=

        Number(value);



        if(

            time>0

        ){


            this.set(

                "autoSave",

                time

            );


        }


    }



    getNumberFormat(){


        return this.settings.numberFormat;


    }



    setNumberFormat(value){


        this.set(

            "numberFormat",

            value

        );


    }



    isDebugMode(){


        return this.settings.debugMode;


    }



    toggleDebug(){


        this.set(

            "debugMode",

            !this.settings.debugMode

        );


    }



    isSpeedRun(){


        return this.settings.speedRun;


    }



    toggleSpeedRun(){


        this.set(

            "speedRun",

            !this.settings.speedRun

        );


    }



    setLanguage(value){


        this.set(

            "language",

            value

        );


    }



    getLanguage(){


        return this.settings.language;


    }



    setSeed(value){


        this.set(

            "seed",

            value

        );


    }



    getSeed(){


        return this.settings.seed;


    }



    reset(){


        this.settings=

        {

            ...

            this.defaultSettings

        };



        this.save();



        eventBus.emit(

            "settings:update"

        );


    }



}



export default new SettingsManager();