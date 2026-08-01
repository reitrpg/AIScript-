/**
 * World Creator
 * Service Worker
 *
 * Offline Cache System
 */


const CACHE_NAME =

"world-creator-v2";



const FILES = [


    "./",


    "./index.html",


    "./css/style.css",



    "./js/core/main.js",

    "./js/core/game.js",

    "./js/core/save.js",

    "./js/core/time.js",

    "./js/core/eventBus.js",



    "./js/world/Manager.js",



    "./js/resource/Manager.js",

    "./js/resource/Resource.js",



    "./js/research/Manager.js",

    "./js/research/Research.js",



    "./js/converter/Converter.js",



    "./js/ui/UI.js",

    "./js/ui/ResearchUI.js",

    "./js/ui/ConverterUI.js",



    "./js/number/BigNumber.js"


];



self.addEventListener(

"install",

event=>{


    event.waitUntil(


        caches.open(

            CACHE_NAME

        )

        .then(

            cache=>{


                return cache.addAll(

                    FILES

                );


            }

        )


    );


}

);



self.addEventListener(

"activate",

event=>{


    event.waitUntil(


        caches.keys()

        .then(

            keys=>{


                return Promise.all(

                    keys.map(

                        key=>{


                            if(

                                key!==CACHE_NAME

                            ){


                                return caches.delete(

                                    key

                                );


                            }


                        }

                    )

                );


            }

        )


    );


}

);



self.addEventListener(

"fetch",

event=>{


    event.respondWith(


        caches.match(

            event.request

        )

        .then(

            response=>{


                return response

                ||

                fetch(

                    event.request

                );


            }

        )


    );


}

);