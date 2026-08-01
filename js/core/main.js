/**
 * World Creator
 * Main Entry
 *
 * Initialization System
 */


import game from "./game.js";

import SaveManager from "./save.js";

import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import ResearchManager from "../research/Manager.js";

import UI from "../ui/UI.js";

import eventBus from "./eventBus.js";



class Main {


    start(){



        // Resource初期化

        ResourceManager.init();



        // セーブ読み込み

        const loaded =

        SaveManager.load();



        // 世界が存在しない場合生成

        if(

            !loaded

            ||

            !WorldManager.getCurrent()

        ){


            WorldManager.createWorld();


        }



        // 世界素材同期

        ResourceManager.syncWorldResources();



        // 研究倍率反映

        ResourceManager.setResearchMultiplier(

            ResearchManager.getMultiplier()

        );



        // UI初期化

        UI.init(

            "app"

        );



        // 世界更新

        eventBus.on(

            "world:update",

            ()=>{


                ResourceManager.syncWorldResources();



                SaveManager.save();



                UI.update();


            }

        );



        // 資源更新

        eventBus.on(

            "resource:update",

            ()=>{


                SaveManager.save();



                UI.update();


            }

        );



        // 研究完了

        eventBus.on(

            "research:complete",

            ()=>{


                ResourceManager.setResearchMultiplier(

                    ResearchManager.getMultiplier()

                );



                SaveManager.save();


            }

        );



        // 転生

        eventBus.on(

            "world:rebirth",

            ()=>{


                ResourceManager.syncWorldResources();



                SaveManager.save();



                UI.update();


            }

        );



        // ゲーム開始

        game.start();



    }



}



const main=

new Main();



main.start();