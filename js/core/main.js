/**
 * World Creator
 * Main Entry Point
 *
 * System Initialization Controller
 */


import SaveManager from "./save.js";

import SettingsManager from "../settings/Manager.js";

import DebugManager from "../debug/Manager.js";

import Game from "./game.js";

import UI from "../ui/UI.js";

import TabUI from "../ui/TabUI.js";

import ResearchUI from "../ui/ResearchUI.js";

import UpgradeUI from "../ui/UpgradeUI.js";

import SettingsUI from "../ui/SettingsUI.js";

import DebugUI from "../ui/DebugUI.js";

import eventBus from "./eventBus.js";



class Main {


    constructor(){


        this.started=false;


        this.autoSaveTimer=null;


    }



    init(){


        if(this.started){


            return;


        }



        SaveManager.load();



        SettingsManager.init();



        DebugManager.init();



        this.initializeUI();



        this.bindEvents();



        this.startAutoSave();



        Game.start();



        this.started=true;


    }



    initializeUI(){


        UI.init(

            "game"

        );



        TabUI.init(

            "tabs"

        );



        TabUI.addTab(

            "world",

            "世界",

            ()=>`

            <div id="world-content">

            </div>

            `

        );



        TabUI.addTab(

            "research",

            "研究",

            ()=>`

            <div id="research-content">

            </div>

            `

        );



        TabUI.addTab(

            "upgrade",

            "強化",

            ()=>`

            <div id="upgrade-content">

            </div>

            `

        );



        TabUI.addTab(

            "settings",

            "設定",

            ()=>`

            <div id="settings-content">

            </div>

            `

        );



        TabUI.addTab(

            "debug",

            "Debug",

            ()=>`

            <div id="debug-content">

            </div>

            `

        );



        ResearchUI.init(

            "research-content"

        );



        UpgradeUI.init(

            "upgrade-content"

        );



        SettingsUI.init(

            "settings-content"

        );



        DebugUI.init(

            "debug-content"

        );


    }



    bindEvents(){


        eventBus.on(

            "settings:update",

            ()=>{


                this.startAutoSave();


            }

        );


    }



    startAutoSave(){


        this.clearAutoSave();



        const time=

        SettingsManager.getAutoSaveTime();



        if(

            time<=0

        ){


            return;


        }



        this.autoSaveTimer=

        setInterval(

            ()=>{


                SaveManager.save();



            },

            time

        );


    }



    clearAutoSave(){


        if(this.autoSaveTimer){


            clearInterval(

                this.autoSaveTimer

            );



            this.autoSaveTimer=null;


        }


    }



}



export default new Main();