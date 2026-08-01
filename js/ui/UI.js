/**
 * World Creator
 * Main UI Controller
 *
 * Resource and EP Display
 */


import ResourceManager from "../resource/Manager.js";

import EPManager from "../ep/Manager.js";

import SettingsManager from "../settings/Manager.js";

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



        this.render();



        eventBus.on(

            "resource:update",

            ()=>{


                this.render();


            }

        );



        eventBus.on(

            "ep:update",

            ()=>{


                this.render();


            }

        );



        eventBus.on(

            "settings:update",

            ()=>{


                this.render();


            }

        );


    }



    render(){


        if(!this.area){


            return;


        }



        let html=`

        <div class="main-status">


        <h2>

        世界状態

        </h2>



        <div>

        EP:

        ${

            this.formatNumber(

                EPManager.get()

            )

        }

        </div>



        <h3>

        資源

        </h3>



        `;



        const resources=

        ResourceManager.getAll();



        for(

            const id in resources

        ){


            const resource=

            resources[id];



            html+=`



            <div class="resource">


            ${resource.name}



            :



            ${

                this.formatNumber(

                    resource.amount

                )

            }



            </div>



            `;


        }



        html+=`

        </div>

        `;



        this.area.innerHTML=

        html;


    }



    formatNumber(value){


        const format=

        SettingsManager.get(

            "numberFormat"

        );



        const number=

        Number(value)

        ||

        0;



        if(

            format==="simple"

        ){


            return this.simpleFormat(

                number

            );


        }



        return number.toLocaleString(

            "ja-JP"

        );


    }



    simpleFormat(value){


        const units=[


            "",


            "K",


            "M",


            "B",


            "T"



        ];



        let index=0;


        let number=value;



        while(

            number>=1000

            &&

            index<units.length-1

        ){


            number/=1000;


            index++;


        }



        return (

            Math.floor(

                number*100

            )

            /

            100

        )

        +

        units[index];


    }



}



export default new UI();