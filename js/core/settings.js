/**
 * World Creator
 * Core Settings
 *
 * 基本設定管理
 */


const Settings = {

    /*
        Application
    */

    appName: "World Creator",

    version: "1.0.0",


    /*
        Game
    */

    tickRate: 1000,

    autoSaveInterval: 30000,


    /*
        Save
    */

    saveKey: "world_creator_save",

    saveVersion: 1,


    /*
        Debug
    */

    debugMode: false,


    /*
        Environment
    */

    isDevelopment: false,


    /*
        Getter
    */

    get(key) {

        return this[key];

    },


    /*
        Setter
    */

    set(key, value) {

        if (key in this) {

            this[key] = value;

        }

    }

};


export default Settings;