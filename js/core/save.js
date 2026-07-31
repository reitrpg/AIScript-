/**
 * World Creator
 * Save System
 *
 * LocalStorage保存管理
 */


import settings from "./settings.js";
import eventBus from "./eventBus.js";


class Save {


    constructor() {

        this.key =
            settings.save.key;

    }



    /**
     * 保存
     */

    save(data) {


        try {


            const json =
                JSON.stringify(
                    data
                );


            localStorage.setItem(
                this.key,
                json
            );


            eventBus.emit(
                "save:complete"
            );


            return true;


        }
        catch(error) {


            console.error(
                "Save Error:",
                error
            );


            return false;

        }

    }



    /**
     * 読込
     */

    load() {


        try {


            const data =
                localStorage.getItem(
                    this.key
                );


            if (!data) {

                return null;

            }


            return JSON.parse(
                data
            );


        }
        catch(error) {


            console.error(
                "Load Error:",
                error
            );


            return null;

        }

    }



    /**
     * 削除
     */

    clear() {


        localStorage.removeItem(
            this.key
        );


        eventBus.emit(
            "save:cleared"
        );

    }



    /**
     * 存在確認
     */

    exists() {


        return (
            localStorage.getItem(
                this.key
            ) !== null
        );

    }



    /**
     * 保存キー変更
     */

    setKey(key) {


        this.key =
            key;

    }



    /**
     * 現在キー取得
     */

    getKey() {

        return this.key;

    }


}



const save =
    new Save();


export default save;