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


        /*
         * 基本初期化
         */


        ResourceManager.init();



        /*
         * セーブ読込
         */


        const loaded =

        SaveManager.load();



        /*
         * 世界が無い場合生成
         */


        if(

            !loaded

            ||

            !WorldManager.getCurrent()

        ){


            WorldManager.createWorld();


        }



        /*
         * 世界資源同期
         */


        ResourceManager.syncWorldResources();



        /*
         * 研究倍率反映
         */


        ResourceManager.setResearchMultiplier(

            ResearchManager.getMultiplier()

        );



        /*
         * UI生成
         */


        UI.init(

            "app"

        );



        /*
         * イベント
         */


        eventBus.on(

            "world:create",

            ()=>{


                ResourceManager.syncWorldResources();


                SaveManager.save();


            }

        );



        eventBus.on(

            "world:update",

            ()=>{


                SaveManager.save();


                UI.update();


            }

        );



        eventBus.on(

            "resource:update",

            ()=>{


                SaveManager.save();


                UI.update();


            }

        );



        eventBus.on(

            "research:complete",

            ()=>{


                ResourceManager.setResearchMultiplier(

                    ResearchManager.getMultiplier()

                );


                SaveManager.save();


            }

        );



        eventBus.on(

            "world:rebirth",

            ()=>{


                ResourceManager.syncWorldResources();


                SaveManager.save();


                UI.update();


            }

        );



        /*
         * ゲーム開始
         */


        game.start();


    }