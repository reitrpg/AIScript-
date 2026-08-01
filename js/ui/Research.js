/**
 * World Creator
 * Research UI Controller
 *
 * UI統合版
 */


import eventBus from "../core/eventBus.js";

import ResearchManager from "../research/Manager.js";



class ResearchUI {


    constructor() {


        this.initialized = false;


    }



    init() {


        if (

            this.initialized

        ) {


            return;


        }



        this.bind();



        this.initialized = true;


    }



    bind() {


        eventBus.on(

            "research:update",

            () => {


                this.update();


            }

        );



        eventBus.on(

            "research:unlock",

            () => {


                this.update();


            }

        );


    }



    update() {


        this.updatePoint();


        this.updateList();


    }



    updatePoint() {


        const area =

            document.getElementById(

                "research-point"

            );



        if (!area) {


            return;


        }



        area.textContent =


            "Research Point : "

            +

            ResearchManager.points;


    }



    updateList() {


        const area =

            document.getElementById(

                "research-list"

            );



        if (!area) {


            return;


        }



        area.innerHTML = "";



        const researches =

            ResearchManager.getAll();



        for (

            const id in researches

        ) {


            const research =

                researches[id];



            const button =

                document.createElement(

                    "button"

                );



            button.textContent =


                research.name

                +

                " "

                +

                (

                    research.unlocked

                    ?

                    "Unlocked"

                    :

                    "Cost "

                    +

                    research.cost

                );



            button.disabled =

                research.unlocked;



            button.onclick = () => {


                ResearchManager.unlock(

                    id

                );


            };



            area.appendChild(

                button

            );


        }


    }


}



const researchUI =

    new ResearchUI();



export default researchUI;