/**
 * World Creator
 * User Interface
 *
 * Main Display Controller
 */


import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import EPManager from "../ep/Manager.js";

import SaveManager from "../core/save.js";

import eventBus from "../core/eventBus.js";



class UI {


    constructor(){


        this.area=null;


        this.sections={};


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



        this.update();



        this.registerEvents();


    }



    registerEvents(){


        eventBus.on(

            "resource:update",

            ()=>this.update()

        );



        eventBus.on(

            "world:update",

            ()=>this.update()

        );



        eventBus.on(

            "ep:update",

            ()=>this.update()

        );



        eventBus.on(

            "settings:update",

            ()=>this.update()

        );


    }



    createLayout(){


        this.area.innerHTML=`

        <div id="world-section"></div>

        <div id="ep-section"></div>

        <div id="resource-section"></div>

        <div id="system-section"></div>

        `;



        this.sections.world=

        document.getElementById(

            "world-section"

        );



        this.sections.ep=

        document.getElementById(

            "ep-section"

        );



        this.sections.resource=

        document.getElementById(

            "resource-section"

        );



        this.sections.system=

        document.getElementById(

            "system-section"

        );


    }



    getNumberFormat(){


        const settings=

        SaveManager.getSettings();



        return settings.numberFormat

        ??

        "normal";


    }



    formatNumber(value){


        value=

        Number(value)

        ||

        0;



        const mode=

        this.getNumberFormat();



        if(

            mode==="simple"

        ){


            return Math.floor(

                value

            );


        }



        if(

            value<1000

        ){


            return value.toFixed(2);


        }



        const units=[


            "",


            "K",


            "M",


            "B",


            "T",


            "Qa",


            "Qi"


        ];



        let index=0;



        while(

            value>=1000

            &&

            index<units.length-1

        ){


            value/=1000;


            index++;


        }



        return (

            value.toFixed(2)

            +

            units[index]

        );


    }



    updateWorld(){


        const world=

        WorldManager.getCurrent();



        if(!world){


            return;


        }



        this.sections.world.innerHTML=`

        <h3>

        世界情報

        </h3>



        Lv:

        ${world.level}



        <br>



        EXP:

        ${

            this.formatNumber(

                world.exp

            )

        }



        <br>



        転生:

        ${world.rebirthCount}

        `;


    }



    updateEP(){


        this.sections.ep.innerHTML=`

        <h3>

        EP

        </h3>



        ${

            this.formatNumber(

                EPManager.get()

            )

        }

        `;


    }



    updateResource(){


        const resources=

        ResourceManager.getAll();



        let html=`

        <h3>

        資源

        </h3>

        `;



        for(

            const id in resources

        ){


            const resource=

            resources[id];



            html+=`

            ${resource.name}

            :

            ${

                this.formatNumber(

                    resource.getAmount()

                )

            }



            <br>

            `;


        }



        this.sections.resource.innerHTML=

        html;


    }



    updateSystem(){


        this.sections.system.innerHTML=`

        <h3>

        システム

        </h3>



        <button>

        設定

        </button>



        <button>

        デバッグ

        </button>

        `;


    }



    update(){


        if(!this.area){


            return;


        }



        this.updateWorld();


        this.updateEP();


        this.updateResource();


        this.updateSystem();


    }



}



export default new UI();