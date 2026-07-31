/**
 * World Creator
 * Save System
 *
 * LocalStorage管理
 */


import Settings from "./settings.js";


const Save = {


    /**
     * データ保存
     */

    save(data) {

        try {

            const saveData = {

                version: Settings.saveVersion,

                timestamp: Date.now(),

                data: data

            };


            localStorage.setItem(
                Settings.saveKey,
                JSON.stringify(saveData)
            );


            return true;


        } catch (error) {

            console.error(
                "Save failed:",
                error
            );


            return false;

        }

    },


    /**
     * データ読み込み
     */

    load() {

        try {

            const raw =
                localStorage.getItem(
                    Settings.saveKey
                );


            if (!raw) {

                return null;

            }


            const saveData =
                JSON.parse(raw);


            if (
                saveData.version !==
                Settings.saveVersion
            ) {

                return this.migrate(saveData);

            }


            return saveData.data;


        } catch (error) {

            console.error(
                "Load failed:",
                error
            );


            return null;

        }

    },


    /**
     * データ削除
     */

    clear() {

        localStorage.removeItem(
            Settings.saveKey
        );

    },


    /**
     * セーブデータ更新処理
     */

    migrate(oldData) {

        console.warn(
            "Save migration required",
            oldData
        );


        return null;

    },


    /**
     * 保存存在確認
     */

    exists() {

        return (
            localStorage.getItem(
                Settings.saveKey
            ) !== null
        );

    }


};


export default Save;