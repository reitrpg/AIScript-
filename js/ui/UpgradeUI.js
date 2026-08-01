/**
 * World Creator
 * Upgrade UI
 *
 * Divine Upgrade Display
 */


import UpgradeManager from "../upgrades/Manager.js";

import eventBus from "../core/eventBus.js";



class UpgradeUI {


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

            "upgrade:update",

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



    update(){


        if(!this.area){


            return;


        }



        const upgrades=

        UpgradeManager.getAll();



        let html=`

        <h2>

        神授強化

        </h2>

        `;



        for(

            const id in upgrades

        ){


            const data=

            UpgradeManager.getStatus(

                id

            );



            html+=`



            <div>



            <h3>

            ${data.name}

            </h3>



            <p>

            ${data.description}

            </p>



            Lv:

            ${data.level}



            <br>



            効果:

            +${

                (

                    data.effect

                    *

                    100

                ).toFixed(2)

            }%



            <br>



            必要EP:

            ${data.cost}



            <br>



            <button

            class="upgrade-button"

            data-id="${id}"

            style="

            background:

            ${

                data.canUpgrade

                ?

                '#55aa55'

                :

                '#777'

            }

            "

            >



            ${

                data.canUpgrade

                ?

                "天啓を受ける"

                :

                "EP不足"

            }



            </button>



            </div>



            `;


        }



        this.area.innerHTML=

        html;



        this.bind();


    }



    bind(){


        const buttons=

        this.area.querySelectorAll(

            ".upgrade-button"

        );



        buttons.forEach(

            button=>{


                button.onclick=()=>{


                    UpgradeManager.upgrade(

                        button.dataset.id

                    );


                };


            }

        );


    }



}



export default new UpgradeUI();