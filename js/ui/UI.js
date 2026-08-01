/**
 * World Creator
 * Main UI
 *
 * World Information Update
 */


import eventBus from "../core/eventBus.js";

import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";



class UI {


    constructor(){


        this.root = null;


    }



    init(id){


        this.root =

            document.getElementById(id);



        if(!this.root){

            return;

        }



        this.render();

        this.bind();

        this.update();


    }



    render(){


        this.root.innerHTML = `


        <h1>
        World Creator
        </h1>



        <div class="tabs">

            <button data-tab="world">

            World

            </button>


            <button data-tab="resource">

            Resource

            </button>


            <button data-tab="research">

            Research

            </button>

        </div>



        <section id="world-section">


            <h2>
            World
            </h2>


            <div id="world-info">

            </div>



            <button id="create-world">

            Create World

            </button>



            <button id="rebirth-world">

            Rebirth

            </button>


        </section>



        <section id="resource-section">


            <h2>
            Resource
            </h2>


            <div id="resource-list">

            </div>


        </section>



        `;


    }



    bind(){


        const create =

        document.getElementById(

            "create-world"

        );



        if(create){


            create.onclick = ()=>{


                eventBus.emit(

                    "world:create"

                );


            };


        }



        const rebirth =

        document.getElementById(

            "rebirth-world"

        );



        if(rebirth){


            rebirth.onclick = ()=>{


                WorldManager.rebirth();



                this.update();


            };


        }



        eventBus.on(

            "world:update",

            ()=>{


                this.updateWorld();


            }

        );



        eventBus.on(

            "world:created",

            ()=>{


                this.updateWorld();


            }

        );



        eventBus.on(

            "resource:update",

            ()=>{


                this.updateResource();


            }

        );


    }



    update(){


        this.updateWorld();

        this.updateResource();


    }



    updateWorld(){


        const area =

        document.getElementById(

            "world-info"

        );



        if(!area){

            return;

        }



        const world =

        WorldManager.getCurrent();



        if(!world){


            area.textContent =

            "No World";


            return;


        }



        area.innerHTML = `


        <p>

        名前：

        ${world.name}

        </p>



        <p>

        レアリティ：

        ${world.rarity}

        </p>



        <p>

        Lv：

        ${world.level}

        </p>



        <p>

        EXP：

        ${world.exp}

        /

        ${WorldManager.getNeedExp()}

        </p>



        <p>

        転生倍率：

        ${world.rebirthMultiplier.toFixed(2)}

        倍

        </p>



        <p>

        素材産出種類

        </p>



        ${this.renderResources(world)}



        <p>

        固有効果

        </p>



        ${

           