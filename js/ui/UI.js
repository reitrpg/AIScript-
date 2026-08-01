/**
 * World Creator
 * Main UI
 */

import WorldManager from "../world/Manager.js";



class UI {


    init(id){


        this.area=

        document.getElementById(id);



        if(!this.area){

            return;

        }



        this.render();



    }



    render(){


        this.area.innerHTML=`

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



        <section
        id="world-section"
        class="tab-content">


            <h2>
            World
            </h2>


            <div id="world-info">

            </div>


            <div id="rebirth-info">

            </div>


        </section>



        <section
        id="resource-section"
        class="tab-content">


            <h2>
            Resource
            </h2>


            <div id="resource-list">

            </div>


            <div id="converter-area">

            </div>


        </section>



        <section
        id="research-section"
        class="tab-content">


            <h2>
            Research
            </h2>


            <div id="research-area">

            </div>


        </section>



        `;



        this.update();


    }



    update(){


        const world=

        WorldManager.getCurrent();



        const area=

        document.getElementById(

            "world-info"

        );



        if(area && world){


            area.innerHTML=`

            名前:
            ${world.name}

            <br>

            レアリティ:
            ${world.rarity}

            <br>

            Lv:
            ${world.level}

            <br>

            EXP:
            ${world.exp}

            `;


        }



        this.updateRebirth();


    }



    updateRebirth(){


        const area=

        document.getElementById(

            "rebirth-info"

        );



        if(!area){

            return;

        }



        const world=

        WorldManager.getCurrent();



        if(!world){

            return;

        }



        const increase=

        (

            Math.pow(

                world.level,

                2

            )

            /

            100

        );



        area.innerHTML=`

        <h3>
        転生情報
        </h3>


        現在倍率:

        ×${world.rebirthMultiplier}


        <br>


        次回増加:

        ×${increase}


        `;


    }


}



export default new UI();