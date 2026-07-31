/**
 * World Creator
 * Service Worker
 *
 * PWA Cache Management
 */


const CACHE_NAME =
    "world-creator-v1";



const CACHE_FILES = [

    "./",

    "./index.html",

    "./manifest.json",

    "./css/style.css",

    "./css/mobile.css"

];



/**
 * インストール
 */

self.addEventListener(

    "install",

    event => {


        event.waitUntil(

            caches.open(
                CACHE_NAME
            )
            .then(

                cache => {

                    return cache.addAll(
                        CACHE_FILES
                    );

                }

            )

        );


    }

);





/**
 * 起動
 */

self.addEventListener(

    "activate",

    event => {


        event.waitUntil(

            caches.keys()

            .then(

                keys => {


                    return Promise.all(

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

                    );


                }

            )

        );


    }

);





/**
 * リクエスト処理
 */

self.addEventListener(

    "fetch",

    event => {


        event.respondWith(

            caches.match(
                event.request
            )
            .then(

                response => {


                    return (

                        response

                        ||

                        fetch(
                            event.request
                        )

                    );


                }

            )

        );


    }

);