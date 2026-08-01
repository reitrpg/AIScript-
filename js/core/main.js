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

import UI from "../ui/UI.js";

import eventBus from "./eventBus.js";



class Main {


    start(){



        // Resource初期化

        ResourceManager.init();



        // セーブ読み込み

        const loaded =

        SaveManager.load();



        // 世界が存在しない場合作成

        if(

            !loaded

            ||

            !WorldManager.getCurrent()

        ){


            WorldManager.createWorld();


        }



        // 世界素材を同期

        ResourceManager.syncWorldResources();



        // UI開始

        UI.init(

            "app"

        );



        // イベント接続


        eventBus.on(

            "world:create",

            ()=>{


                WorldManager.createWorld();


                ResourceManager.syncWorldResources();



                SaveManager.save();


            }

        );



        eventBus.on(

            "world:update",

            ()=>{


                SaveManager.save();


            }

        );



        eventBus.on(

            "resource:update",

            ()=>{


                SaveManager.save();


            }

        );



        eventBus.on(

            "world:rebirth",

            ()=>{


                ResourceManager.syncWorldResources();


                SaveManager.save();


            }

        );



        // ゲーム開始

        game.start();



    }



}



const main =

new Main();



main.start();