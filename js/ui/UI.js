/**
 * World Creator
 * UI System
 *
 * Display Stable Version
 */


import eventBus from "../core/eventBus.js";

import ResourceManager from "../resource/Manager.js";

import WorldManager from "../world/Manager.js";



class UI {


    constructor() {


        this.root = null;


    }



    init(id) {


        this.root =

            document.getElementById(

                id

            );



        if (!this.root) {


            console.error(

                "UI root not found:",

                id

            );


            return;


        }



        this.render();


        this.bind();



        this.update();


        console.log(

            "[UI] Render Complete"

        );


    }



    render() {


        this.root.innerHTML = `


        <section class="header">


            <h1>

                World Creator

            </h1>


            <p>

                Create and evolve your world

            </p>


        </section>



        <section class="panel">


            <h2>

                Resources

            </h2>


            <div id="resource-list">

            </div>


        </section>



        <section class="panel">


            <h2>

                World Status

            </h2>


            <div id="world-info">

            </div>


        </section>



        <section class="panel">


            <button id="create-world">

                Create World

            </button>


            <button id="save-game">

                Save Game

            </button>


        </section>


        `;


    }



    bind() {


        const create =

            document.getElementById(

                "create-world"

            );



        if (create) {


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



        if (save) {


            save.onclick = () => {


                eventBus.emit(

                    "game:save"

                );


            };


        }



        eventBus.on(

            "game:update",

            () => {


                this.update();


            }

        );



        eventBus.on(

            "resource:update",

            () => {


                this.update();


            }

        );



        eventBus.on(

            "world:created",

            () => {


                this.update();


            }

        );


    }



    update() {


        this.updateResources();


        this.updateWorld();


    }



    updateResources() {


        const area =

            document.getElementById(

                "resource-list"

            );



        if (!area) {


            return;


        }



        area.innerHTML = "";



        const resources =

            ResourceManager.getAll();



        Object.entries(resources)

        .forEach(

            ([id,value]) => {


                const row =

                    document.createElement(

                        "div"

                    );



                row.textContent =

                    `${id} : ${value}`;



                area.appendChild(

                    row

                );


            }

        );


    }



    updateWorld() {


        const area =

            document.getElementById(

                "world-info"

            );



        if (!area) {


            return;


        }



        const world =

            WorldManager.getCurrent();



        if (!world) {


            area.textContent =

                "No World";


            return;


        }



        area.innerHTML = `

            Level : ${world.level}

            <br>

            Age : ${world.age.toString()}

            <br>

            Population : ${world.population}

        `;


    }


}



const ui =

    new UI();



export default ui;