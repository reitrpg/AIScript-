/**
 * World Creator
 * World Status UI
 *
 * Rebirth Display Update
 */


import WorldManager from "../world/Manager.js";

import ResearchManager from "../research/Manager.js";



class UI {


    updateRebirth(){


        const area =

        document.getElementById(

            "rebirth-info"

        );



        if(!area){

            return;

        }



        const world =

        WorldManager.getCurrent();



        if(!world){


            area.innerHTML="";


            return;


        }



        const level =

        world.level;



        let researchBonus = 1;



        const research =

        ResearchManager

        .getAll()

        .rebirth;



        if(research){


            researchBonus =

            Math.pow(

                research.effect,

                research.level

            );


        }



        const increase =


        (

            Math.pow(

                level,

                2

            )

            /

            100

        )

        *

        researchBonus;



        const next =


        world.rebirthMultiplier

        *

        increase;



        area.innerHTML=`

        <h3>

        転生情報

        </h3>


        現在Lv:

        ${level}


        <br>


        現在転生倍率:

        ×${

            world.rebirthMultiplier

            .toFixed(2)

        }


        <br><br>


        転生倍率増加:


        ×${

            increase

            .toFixed(2)

        }


        <br>


        転生後倍率:


        ×${

            next

            .toFixed(2)

        }


        <br>


        転生回数:


        ${world.rebirthCount}


        回


        `;


    }



}


export default new UI();