/**
 * World Creator
 * Service Worker
 *
 * PWA Cache System
 */


const CACHE_NAME =

    "world-creator-v1";



const FILES = [


    "./",

    "./index.html",


    "./css/style.css",

    "./css/mobile.css",


    "./manifest.json",



    "./js/core/main.js",

    "./js/core/game.js",

    "./js/core/eventBus.js",

    "./js/core/save.js",

    "./js/core/time.js",



    "./js/number/BigNumber.js",



    "./js/resource/Resource.js",

    "./js/resource/Manager.js",

    "./js/resource/Converter.js",



    "./js/world/Manager.js",



    "./js/ui/UI.js",

    "./js/ui/Router.js",

    "./js/ui/Tabs.js"


];



/**
 * Install
 */

self.addEventListener(

    "install",

    event => {


        event.waitUntil(


            caches.open(

                CACHE_NAME

            )

            .then(

                cache =>

                    cache.addAll(

                        FILES

                    )

            )


        );


    }

);





/**
 * Activate
 */

self.addEventListener(

    "activate",

    event => {


        event.waitUntil(


            caches.keys()

            .then(

                keys =>


                    Promise.all(

                        keys.map(

                            key => {


                                if (

                                    key !== CACHE_NAME

                                ) {


                                    return caches.delete(

                                        key

                                    );


                                }


                            }

                        )

                    )


            )


        );


    }

);





/**
 * Fetch
 */

self.addEventListener(

    "fetch",

    event => {


        event.respondWith(


            caches.match(

                event.request

            )

            .then(

                response =>


                    response

                    ||

                    fetch(

                        event.request

                    )


            )


        );


    }

);