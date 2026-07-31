/**
 * World Creator
 * Router
 *
 * 画面切替管理
 */


class Router {


    constructor() {


        this.routes = {};

        this.current = null;


    }



    /**
     * ルート登録
     */

    register(
        path,
        callback
    ) {


        this.routes[path] =

            callback;


    }



    /**
     * 初期化
     */

    init(path = "/") {


        this.navigate(

            path

        );


    }



    /**
     * 移動
     */

    navigate(path) {


        this.current =

            path;



        const route =

            this.routes[path];



        if (route) {


            route();


        }


    }



    /**
     * 現在ページ
     */

    getCurrent() {


        return this.current;


    }


}



const router =

    new Router();



export default router;