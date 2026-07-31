/**
 * World Creator
 * Settings
 *
 * ゲーム設定管理
 */


const settings = {


    /**
     * ゲーム情報
     */

    game: {

        title:
            "World Creator",

        version:
            "0.1.0",

        language:
            "ja"

    },



    /**
     * 時間設定
     */

    time: {

        tickRate:
            1000,

        offlineProgress:
            true,

        maxOfflineTime:
            86400

    },



    /**
     * 保存設定
     */

    save: {

        key:
            "world_creator_save",

        autoSave:
            true,

        autoSaveInterval:
            30000

    },



    /**
     * 表示設定
     */

    ui: {

        theme:
            "default",

        animation:
            true

    },



    /**
     * 開発設定
     */

    debug: {

        enabled:
            false

    }



};


export default settings;