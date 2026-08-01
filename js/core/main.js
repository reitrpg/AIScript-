/**
 * World Creator
 * Main Entry
 *
 * System Initialization
 */


import game from "./game.js";

import SaveManager from "./save.js";

import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import ResearchManager from "../research/Manager.js";

import Converter from "../converter/Converter.js";

import UI from "../ui/UI.js";

import ConverterUI from "../ui/ConverterUI.js";

import eventBus from "./eventBus.js";



class Main {


    start(){



        /*
         * Resource初期化
         */


        ResourceManager.init();



        /*
         * Save読込
         */


        const loaded=

        SaveManager.load();



        /*
         * World生成
         */


        if(

            !loaded

            ||

            !WorldManager.getCurrent()

        ){


            WorldManager.createWorld();


        }



        /*
         * Resource同期
         */


        ResourceManager.syncWorldResources();



        /*
         * Research反映
         */


        const researchMultiplier=

        ResearchManager

        .getConverterMultiplier();



        Converter.setResearchMultiplier(

            researchMultiplier

        );



        /*
         * UI開始
         */


        UI.init(

            "app"

        );



        ConverterUI.init(

            "converter-area"

        );



        /*
         * Research更新
         */


        eventBus.on(

            "research:complete",

            ()=>{


                Converter.setResearchMultiplier(

                    ResearchManager

                    .getConverterMultiplier()

                );


                SaveManager.save();


            }

        );



        /*
         * World更新
         */


        eventBus.on(

            "world:update",

            ()=>{


                SaveManager.save();


            }

        );



        /*
         * Resource更新
         */


        eventBus.on(

            "resource:update",

            ()=>{


                SaveManager.save();


            }

        );



        /*
         * 転生
         */


        eventBus.on(

            "world:rebirth",

            ()=>{


                ResourceManager

                .syncWorldResources();



                SaveManager.save();


            }

        );



        /*
         * Game開始
         */


        game.start();


    }


}



const main=

new Main();



main.start();