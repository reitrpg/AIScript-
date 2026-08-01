/**
 * World Creator
 * Main Entry
 *
 * Debug Initialization Version
 */


import game from "./game.js";

import SaveManager from "./save.js";

import WorldManager from "../world/Manager.js";

import ResourceManager from "../resource/Manager.js";

import ResearchManager from "../research/Manager.js";

import Converter from "../converter/Converter.js";

import UI from "../ui/UI.js";

import ResearchUI from "../ui/ResearchUI.js";

import ConverterUI from "../ui/ConverterUI.js";

import eventBus from "./eventBus.js";



class Main {


    start(){


        console.log(

            "Main start"

        );



        try{


            console.log(

                "Resource init"

            );


            ResourceManager.init();



            console.log(

                "Save load"

            );


            const loaded=

            SaveManager.load();



            console.log(

                "Loaded:",

                loaded

            );



            if(

                !loaded

                ||

                !WorldManager.getCurrent()

            ){


                console.log(

                    "Create World"

                );



                WorldManager.createWorld();


            }



            console.log(

                "Resource sync"

            );


            ResourceManager.syncWorldResources();



            console.log(

                "Converter init"

            );


            Converter.setResearchMultiplier(

                ResearchManager

                .getConverterMultiplier()

            );



            console.log(

                "UI init"

            );


            UI.init(

                "app"

            );



            ResearchUI.init(

                "research-area"

            );



            ConverterUI.init(

                "converter-area"

            );



            console.log(

                "Event bind"

            );



            eventBus.on(

                "research:update",

                ()=>{


                    Converter.setResearchMultiplier(

                        ResearchManager

                        .getConverterMultiplier()

                    );


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

                "world:update",

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



            console.log(

                "Game start"

            );


            game.start();



            console.log(

                "World Creator Started"

            );


        }

        catch(error){


            console.error(

                "Initialization Error",

                error

            );


        }


    }


}



new Main()

.start();