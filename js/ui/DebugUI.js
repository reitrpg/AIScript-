/**
 * World Creator
 * Debug UI
 *
 * Development Control Panel
 */


import DebugManager from "../debug/Manager.js";

import eventBus from "../core/eventBus.js";



class DebugUI {


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

            "debug:update",

            ()=>{


                this.update();


            }

        );


    }



    update(){


        if(!this.area){


            return;


        }



        if(

            !DebugManager.isEnabled()

        ){


            this.area.innerHTML=`

            <h2>

            Debug

            </h2>



            <p>

            無効

            </p>

            `;



            return;


        }



        this.area.innerHTML=`

        <h2>

        Debug

        </h2>



        <button id="addEP">

        EP +1000

        </button>



        <br>



        <input

        id="resourceId"

        placeholder="Resource ID"

        >



        <input

        id="resourceAmount"

        value="100"

        >



        <button id="addResource">

        資源追加

        </button>



        <br>



        <input

        id="tickAmount"

        value="10"

        >



        <button id="tick">

        Tick実行

        </button>



        <br>



        <input

        id="researchId"

        placeholder="Research ID"

        >



        <input

        id="researchLevel"

        value="1"

        >



        <button id="research">

        研究設定

        </button>

        `;



        this.bind();


    }



    bind(){


        this.area

        .querySelector(

            "#addEP"

        )

        .onclick=()=>{


            DebugManager.addEP(

                1000

            );


        };



        this.area

        .querySelector(

            "#addResource"

        )

        .onclick=()=>{


            const id=

            this.area

            .querySelector(

                "#resourceId"

            )

            .value;



            const amount=

            this.area

            .querySelector(

                "#resourceAmount"

            )

            .value;



            DebugManager.addResource(

                id,

                amount

            );


        };



        this.area

        .querySelector(

            "#tick"

        )

        .onclick=()=>{


            const amount=

            this.area

            .querySelector(

                "#tickAmount"

            )

            .value;



            DebugManager.forceTick(

                amount

            );


        };



        this.area

        .querySelector(

            "#research"

        )

        .onclick=()=>{


            const id=

            this.area

            .querySelector(

                "#researchId"

            )

            .value;



            const level=

            this.area

            .querySelector(

                "#researchLevel"

            )

            .value;



            DebugManager.setResearchLevel(

                id,

                level

            );


        };


    }



}



export default new DebugUI();