/**
 * World Creator
 * UI Router
 *
 * SPA画面切替管理
 */


import eventBus from "../core/eventBus.js";


class Router {


    constructor() {

        this.routes = new Map();

        this.current = null;

    }



    /**
     * ルート登録
     */

    register(path, callback) {


        this.routes.set(
            path,
            callback
        );


    }



    /**
     * 移動
     */

    navigate(path) {


        const route =
            this.routes.get(path);


        if (!route) {

            return false;

        }


        this.current =
            path;


        route();


        eventBus.emit(
            "router:changed",
            path
        );


        return true;

    }



    /**
     * 現在取得
     */

    getCurrent() {

        return this.current;

    }



    /**
     * 初期化
     */

    init(defaultPath = "/") {


        window.addEventListener(
            "hashchange",
            () => {

                const path =
                    location.hash.substring(1)
                    || defaultPath;


                this.navigate(
                    path
                );

            }
        );



        const initial =
            location.hash.substring(1)
            || defaultPath;


        this.navigate(
            initial
        );

    }



    /**
     * URL変更
     */

    go(path) {


        location.hash =
            path;

    }


}



const router =
    new Router();


export default router;