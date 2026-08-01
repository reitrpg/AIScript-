/**
 * World Creator
 * Main UI System
 */


import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import eventBus from "../core/eventBus.js";



class UI {


    constructor(){


        this.root=null;


    }



    init(id){


        this.root=

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


        this.root.innerHTML=`

        <div class="tabs">


            <button data-tab="world">
            世界
            </button>


            <button data-tab="resource">
            資源
            </button>


            <button data-tab="research">
            研究
            </button>


        </div>



        <div id="world-tab">


            <h2>
            世界情報
            </h2>


            <div id="world-info"></div>


            <div id="rebirth-info"></div>


        </div>



        <div id="resource-tab"
        style="display:none;">


            <h2>
            資源
            </h2>


            <div id="resource-list"></div>


        </div>



        <div id="research-tab"
        style="display:none;">


            <h2>
            研究
            </h2>


            <div id="research-area"></div>


        </div>

        `;


    }



    bind(){


        document

        .querySelectorAll(

            "[data-tab]"

        )

        .forEach(

            button=>{


                button.onclick=

                ()=>{


                    this.openTab(

                        button.dataset.tab

                    );


                };


            }

        );


        eventBus.on(

            "world:update",

            ()=>this.update()

        );


        eventBus.on(

            "resource:update",

            ()=>this.update()

        );


        eventBus.on(

            "world:rebirth",

            ()=>this.update()

        );


    }



    openTab(name){


        const tabs=[

            "world",

            "resource",

            "research"

        ];



        tabs.forEach(

            tab=>{


                const element=

                document