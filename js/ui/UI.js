/**
 * World Creator
 * Main UI
 *
 * Integrated Version
 */


import eventBus from "../core/eventBus.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";



class UI {


    constructor(){


        this.root = null;


    }



    init(id){


        this.root =

            document.getElementById(

                id

            );



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



        <section id="world-section"

        class="panel">


            <h2>

            World

            </h2>


            <div id="world-info">

            </div>


            <button id="create-world">

            Create World

            </button>


        </section>



        <section id="resource-section"

        class="panel">


            <h2>

            Resource

            </h2>


            <div id="resource-list">

            </div>


        </section>



        <section id="research-section"

        class="panel">


            <h2>

            Research

            </h2>


            <div id="research-point">

            </div>


            <div id="research-list">

            </div>


        </section>



        <button id="save-game">

        Save

        </button>


        `;


    }



    bind(){


        const create =

            document.getElementById(

                "create-world"

            );



        if(create){


            create.onclick = () => {


                eventBus.emit(

                    "world:create"

                );


            };


        }



        const save =

            document.getElementById(

                "save-game"

            );



        if(save){


            save.onclick = () => {


                eventBus.emit(

                    "game:save"

                );


            };


        }



        eventBus.on(

            "resource:update",

            () => {


                this.updateResources();


            }

        );



        eventBus.on(

            "world:update",

            () => {


                this.updateWorld();


            }

        );



        eventBus.on(

            "world:created",

            () => {


                this.updateWorld();


            }

        );



    }



    update(){


        this.updateWorld();


        this.updateResources();


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

        Level : ${world.level}

        <br>

        Age : ${world.age}

        `;


    }



    updateResources(){


        const area =

            document.getElementById(

                "resource-list"

            );



        if(!area){


            return;


        }



        area.innerHTML = "";



        const resources =

            ResourceManager.getAll();



        Object.values(resources)

        .forEach(

            resource => {


                const row =

                    document.createElement(

                        "div"

                    );



                row.textContent =


                    resource.name

                    +

                    " : "

                    +

                    resource.amount;



                area.appendChild(

                    row

                );


            }

        );


    }


}



const ui =

    new UI();



export default ui;