/**
 * World Creator
 * Main UI
 *
 * Display Component Separation
 */


import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import EPManager from "../ep/Manager.js";

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



        this.update();



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

            "ep:update",

            ()=>{


                this.update();


            }

        );


    }



    formatNumber(value){


        value=

        Number(value)

        ||

        0;



        if(

            value < 1000

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


            "Qi",


            "Sx",


            "Sp",


            "Oc"


        ];



        let index=0;



        while(

            value>=1000

            &&

            index < units.length-1

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



    createWorldSection(){


        const world=

        WorldManager.getCurrent();



        if(!world){


            return "";


        }



        return `

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

        回



        <hr>

        `;


    }



    createEPSection(){


        return `

        <h3>

        EP

        </h3>



        ${

            this.formatNumber(

                EPManager.get()

            )

        }



        <hr>

        `;


    }



    createResourceSection(){


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



        return html;


    }



    update(){


        if(!this.area){


            return;


        }



        this.area.innerHTML=



        `

        <h2>

        World Creator

        </h2>



        ${

            this.createWorldSection()

        }



        ${

            this.createEPSection()

        }



        ${

            this.createResourceSection()

        }

        `;


    }



}



export default new UI();