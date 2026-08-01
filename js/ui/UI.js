/**
 * World Creator
 * Main UI System
 *
 * World / Resource Display
 */


import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import eventBus from "../core/eventBus.js";



class UI {


    constructor(){


        this.area=null;


    }



    init(id){


        this.area=

        document.getElementById(

            id

        );



        if(!this.area){


            return;

        }



        this.createLayout();



        this.bindEvents();



        this.update();



    }



    createLayout(){


        this.area.innerHTML=`

        <div id="world-info">


        </div>



        <hr>



        <div id="resource-info">


        </div>



        <hr>



        <div id="converter-area">


        </div>


        `;


    }



    bindEvents(){


        eventBus.on(

            "resource:update",

            ()=>{


                this.update();


            }

        );



        eventBus.on(

            "world:update",

            ()=>{


                this.update();


            }

        );



        eventBus.on(

            "world:rebirth",

            ()=>{


                this.update();


            }

        );


    }



    update(){


        this.updateWorld();



        this.updateResource();


    }



    updateWorld(){


        const area=

        document.getElementById(

            "world-info"

        );



        if(!area){


            return;

        }



        const world=

        WorldManager.getCurrent();



        if(!world){


            area.innerHTML="";


            return;

        }



        area.innerHTML=`

        <h2>

        World Status

        </h2>



        Lv:

        ${world.level}



        <br>



        EXP:

        ${world.exp}



        <br>



        転生回数:

        ${world.rebirthCount}



        <br>



        転生倍率:

        ×${

            world.rebirthMultiplier

            .toFixed(2)

        }



        <br>



        レアリティ:

        ${world.rarity}



        `;


    }



    updateResource(){


        const area=

        document.getElementById(

            "resource-info"

        );



        if(!area){


            return;

        }



        const resources=

        ResourceManager.getAll();



        let html="";



        html+=`

        <h2>

        Resources

        </h2>

        `;



        for(

            const id in resources

        ){


            const resource=

            resources[id];



            html+=`

            ${resource.name}

            :

            ${resource.amount}

            <br>

            `;


        }



        area.innerHTML=

        html;


    }



}



export default new UI();