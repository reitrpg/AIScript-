/**
 * World Creator
 * Debug Manager
 *
 * Development Tools Controller
 */


import SaveManager from "../core/save.js";

import EPManager from "../ep/Manager.js";

import ResourceManager from "../resource/Manager.js";

import ResearchManager from "../research/Manager.js";

import Game from "../core/game.js";

import eventBus from "../core/eventBus.js";



class DebugManager {


    constructor(){


        this.enabled=false;


    }



    init(){


        const data=

        SaveManager.getDebug();



        if(data){


            this.enabled=

            data.enabled

            ??

            false;


        }


    }



    save(){


        SaveManager.setDebug({


            enabled:

            this.enabled


        });


    }



    enable(){


        this.enabled=true;


        this.save();



        eventBus.emit(

            "debug:update"

        );


    }



    disable(){


        this.enabled=false;


        this.save();



        eventBus.emit(

            "debug:update"

        );


    }



    toggle(){


        if(this.enabled){


            this.disable();


        }

        else{


            this.enable();


        }


    }



    isEnabled(){


        return this.enabled;


    }



    require(){


        return this.enabled;


    }



    addEP(amount){


        if(

            !this.require()

        ){


            return false;


        }



        EPManager.add(

            Number(amount)

        );



        return true;


    }



    addResource(id,amount){


        if(

            !this.require()

        ){


            return false;


        }



        ResourceManager.add(

            id,

            Number(amount)

        );



        return true;


    }



    forceTick(count=1){


        if(

            !this.require()

        ){


            return false;


        }



        Game.debugTick(

            Number(count)

        );



        return true;


    }



    setResearchLevel(id,level){


        if(

            !this.require()

        ){


            return false;


        }



        const research=

        ResearchManager.get(

            id

        );



        if(!research){


            return false;


        }



        research.level=

        Number(level);



        eventBus.emit(

            "research:update"

        );



        return true;


    }



    getState(){


        if(

            !this.require()

        ){


            return null;


        }



        return {


            ep:

            EPManager.get(),


            resources:

            ResourceManager.toJSON(),


            research:

            ResearchManager.toJSON()


        };


    }



}



export default new DebugManager();