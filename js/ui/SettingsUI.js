/**
 * World Creator
 * Settings UI
 *
 * Configuration Screen
 */


import SettingsManager from "../settings/Manager.js";

import eventBus from "../core/eventBus.js";



class SettingsUI {


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

            "settings:update",

            ()=>{


                this.update();


            }

        );


    }



    update(){


        if(!this.area){


            return;


        }



        const settings=

        SettingsManager.getAll();



        this.area.innerHTML=`

        <h2>

        設定

        </h2>



        <label>

        TickSpeed

        </label>



        <input

        id="tickSpeed"

        value="${settings.tickSpeed}"

        >



        <br>



        <label>

        AUTOセーブ(ms)

        </label>



        <input

        id="autoSave"

        value="${settings.autoSave}"

        >



        <br>



        <label>

        数値表示

        </label>



        <select id="numberFormat">


            <option value="normal">

            通常

            </option>



            <option value="simple">

            簡易

            </option>


        </select>



        <br>



        <button id="debugButton">

        Debug切替

        </button>



        <button id="speedButton">

        SpeedRun切替

        </button>



        <br>



        <input

        id="seed"

        placeholder="Seed"

        value="${settings.seed ?? ""}"

        >



        <button id="saveSettings">

        保存

        </button>



        <button id="resetSettings">

        初期化

        </button>

        `;



        this.bind();


    }



    bind(){


        this.area

        .querySelector(

            "#saveSettings"

        )

        .onclick=()=>{


            SettingsManager.setTickSpeed(

                this.area.querySelector(

                    "#tickSpeed"

                ).value

            );



            SettingsManager.setAutoSaveTime(

                this.area.querySelector(

                    "#autoSave"

                ).value

            );



            SettingsManager.setNumberFormat(

                this.area.querySelector(

                    "#numberFormat"

                ).value

            );



            SettingsManager.setSeed(

                this.area.querySelector(

                    "#seed"

                ).value

            );


        };



        this.area

        .querySelector(

            "#debugButton"

        )

        .onclick=()=>{


            SettingsManager.toggleDebug();


        };



        this.area

        .querySelector(

            "#speedButton"

        )

        .onclick=()=>{


            SettingsManager.toggleSpeedRun();


        };



        this.area

        .querySelector(

            "#resetSettings"

        )

        .onclick=()=>{


            SettingsManager.reset();


        };


    }



}



export default new SettingsUI();