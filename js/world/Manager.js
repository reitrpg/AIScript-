/**
 * World Creator
 * Rebirth System
 *
 * Lv Based Multiplier
 */


import eventBus from "../core/eventBus.js";

import ResearchManager from "../research/Manager.js";



rebirth(){


    if(!this.current){

        return false;

    }



    const level =

    this.current.level;



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



    this.current.rebirthMultiplier *=


        increase;



    this.current.rebirthCount++;



    this.current.level = 1;


    this.current.exp = 0;



    eventBus.emit(

        "world:rebirth",

        this.current

    );



    eventBus.emit(

        "world:update",

        this.current

    );



    return true;


}