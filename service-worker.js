/**
 * World Creator
 * Service Worker
 *
 * Cache Update System
 */


const CACHE_NAME =

"world-creator-v2";



const FILES = [


"./",

"./index.html",


"./css/style.css",

"./css/mobile.css",



"./js/core/main.js",

"./js/core/game.js",

"./js/core/time.js",

"./js/core/save.js",

"./js/core/eventBus.js",



"./js/world/Manager.js",



"./js/resource/Resource.js",

"./js/resource/Manager.js",

"./js/resource/Converter.js",



"./js/research/Manager.js",



"./js/ui/UI.js"



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



    self.skipWaiting();



});





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

                                key !== CACHE_NAME

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



    self.clients.claim();



});





self.addEventListener(

"fetch",

event=>{


    event.respondWith(


        fetch(

            event.request

        )

        .then(

            response=>{


                const copy =

                response.clone();



                caches.open(

                    CACHE_NAME

                )

                .then(

                    cache=>{


                        cache.put(

                            event.request,

                            copy

                        );


                    }

                );



                return response;


            }

        )

        .catch(

            ()=>{


                return caches.match(

                    event.request

                );


            }

        )


    );


});