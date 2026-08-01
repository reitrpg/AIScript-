/**
 * World Creator
 * Main UI System
 *
 * World / Resource / System Layout
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



        <div id="research-area">


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


                this.updateResource();


            }

        );



        eventBus.on(

            "world:update",

            ()=>{


                this.updateWorld();


            }

        );



        eventBus.on(

            "world:rebirth",

            ()=>{


                this.updateWorld();


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



        area.innerHTML=

        `

        <h2>

        World Status

        </h2>



        Lv:

        ${world.level}



        <br>



        EXP:

        ${world.exp}



        <br>



        Rebirth:

        ${world.rebirthCount}



        <br>



        Multiplier:

        ×${

            world.rebirthMultiplier

            .toFixed(2)

        }



        <br>



        Rarity:

        ${world.rarity}



        <br>



        Effects:

        ${

            world.effects.join(

                ", "

            )

        }


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



        let html=

        `

        <h