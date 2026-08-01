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



class Main {


    constructor(){


        this.started=false;


    }



    init(){


        if(this.started){


            return;


        }



        SaveManager.load();



        SettingsManager.init();



        DebugManager.init();



        this.initializeUI();



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



}



export default new Main();