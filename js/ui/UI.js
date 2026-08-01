/**
 * World Creator
 * Main UI
 *
 * Tab Layout Version
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


            return;


        }



        this.render();


        this.bind();


        this.update();


    }



    render() {


        this.root.innerHTML = `


        <div class="header">


            <h1>

                World Creator

            </h1>


        </div>



        <nav class="tabs">


            <button data-tab="world">

                World

            </button>


            <button data-tab="resource">

                Resource

            </button>


            <button data-tab="research">

                Research

            </button>


        </nav>



        <section id="world-tab">


            <div class="panel">


                <h2>

                    World Status

                </h2>


                <div id="world-info">

                </div>


            </div>


        </section>



        <section id="resource-tab">


            <div class="panel">


                <h2>

                    Resources

                </h2>


                <div id="resource-list">

                </div>


            </div>


        </section>



        <section id="research-tab">


            <div class="panel">


                <h2>

                    Research

                </h2>


                <div id="research-point">

                </div>


                <div id="research-list">

                </div>


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


        document

        .getElementById(

            "create-world"

        )

        .onclick = () => {


            eventBus.emit(

                "world:create"

            );


        };



        document

        .getElementById(

            "save-game"

        )

        .onclick = () => {


            eventBus.emit(

                "game:save"

            );


        };



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



        const data =

            ResourceManager.getAll();



        for (

            const id in data

        ) {


            const row =

                document.createElement(

                    "div"

                );


            row.textContent =

                `${id} : ${data[id]}`;



            area.appendChild(

                row

            );


        }


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

        Age : ${world.age}

        <br>

        Population :

        ${world.population}

        `;


    }


}



const ui =

    new UI();



export default ui;