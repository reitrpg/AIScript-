/**
 * ==========================================================
 * World Creator
 * main.js
 * アプリケーション起動処理
 * ==========================================================
 */

import { SETTINGS } from "./settings.js";
import { SaveManager } from "./save.js";
import { Game } from "./game.js";
import { UI } from "./ui.js";
import { Debug } from "./debug.js";

/**
 * グローバルゲームオブジェクト
 */
export const APP = {

    version: SETTINGS.version,

    started: false,

    game: null

};

/**
 * 起動
 */
function boot() {

    console.log("==========");
    console.log("World Creator");
    console.log("Version :", SETTINGS.version);
    console.log("==========");

    SaveManager.initialize();

    APP.game = new Game();

    UI.initialize(APP.game);

    Debug.initialize(APP.game);

    registerButtons();

    APP.game.start();

    APP.started = true;

    console.log("Game Started");

}

/**
 * ボタン登録
 */
function registerButtons() {

    const saveButton =
        document.getElementById("saveButton");

    const loadButton =
        document.getElementById("loadButton");

    const settingButton =
        document.getElementById("settingButton");

    const createWorldButton =
        document.getElementById("createWorldButton");

    const debugButton =
        document.getElementById("debugButton");

    if (saveButton) {

        saveButton.addEventListener("click", () => {

            SaveManager.save(APP.game.saveData);

            console.log("Manual Save");

        });

    }

    if (loadButton) {

        loadButton.addEventListener("click", () => {

            SaveManager.load(APP.game);

            UI.refresh(APP.game);

            console.log("Manual Load");

        });

    }

    if (settingButton) {

        settingButton.addEventListener("click", () => {

            alert("Settings UI\n(Phase1では未実装)");

        });

    }

    if (createWorldButton) {

        createWorldButton.addEventListener("click", () => {

            APP.game.tryCreateWorld();

        });

    }

    if (debugButton) {

        debugButton.addEventListener("click", () => {

            Debug.toggle();

        });

    }

}

/**
 * ページを閉じる直前
 */
window.addEventListener("beforeunload", () => {

    if (!APP.started) return;

    SaveManager.save(APP.game.saveData);

});

/**
 * ページ表示復帰
 */
document.addEventListener("visibilitychange", () => {

    if (!APP.started) return;

    if (!document.hidden) {

        APP.game.resume();

    }

});

/**
 * DOM読み込み完了
 */
document.addEventListener("DOMContentLoaded", () => {

    boot();

});