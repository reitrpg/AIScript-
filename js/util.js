/**
 * ==========================================================
 * World Creator
 * util.js
 * 汎用ユーティリティ
 * ==========================================================
 */

/**
 * 指定範囲に値を収める
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function clamp(value, min, max) {

    return Math.min(Math.max(value, min), max);

}

/**
 * 指定範囲の整数乱数
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomInt(min, max) {

    return Math.floor(Math.random() * (max - min + 1)) + min;

}

/**
 * 指定範囲の小数乱数
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
export function randomFloat(min, max) {

    return Math.random() * (max - min) + min;

}

/**
 * 指定確率でtrueを返す
 * @param {number} chance
 * @returns {boolean}
 */
export function chance(chance) {

    return Math.random() < chance;

}

/**
 * 配列からランダム取得
 * @param {Array} array
 * @returns {*}
 */
export function randomChoice(array) {

    if (array.length === 0) return null;

    return array[randomInt(0, array.length - 1)];

}

/**
 * 深いコピー
 * @param {*} object
 * @returns {*}
 */
export function deepCopy(object) {

    return structuredClone(object);

}

/**
 * 数値を指定桁で丸める
 * @param {number} value
 * @param {number} digit
 * @returns {number}
 */
export function round(value, digit = 2) {

    const power = Math.pow(10, digit);

    return Math.round(value * power) / power;

}

/**
 * 秒→時分秒
 * @param {number} seconds
 * @returns {string}
 */
export function formatTime(seconds) {

    seconds = Math.floor(seconds);

    const day = Math.floor(seconds / 86400);
    seconds %= 86400;

    const hour = Math.floor(seconds / 3600);
    seconds %= 3600;

    const minute = Math.floor(seconds / 60);
    seconds %= 60;

    let result = "";

    if (day > 0) result += `${day}d `;

    if (hour > 0 || day > 0) result += `${hour}h `;

    if (minute > 0 || hour > 0 || day > 0) result += `${minute}m `;

    result += `${seconds}s`;

    return result;

}

/**
 * 現在時刻(ms)
 * @returns {number}
 */
export function now() {

    return Date.now();

}

/**
 * UUID風ID生成
 * @returns {string}
 */
export function createID() {

    return crypto.randomUUID();

}

/**
 * オブジェクトが空か判定
 * @param {Object} object
 * @returns {boolean}
 */
export function isEmpty(object) {

    return Object.keys(object).length === 0;

}

/**
 * 数値判定
 * @param {*} value
 * @returns {boolean}
 */
export function isNumber(value) {

    return typeof value === "number" &&
        Number.isFinite(value);

}

/**
 * パーセント表示
 * @param {number} value
 * @param {number} digit
 * @returns {string}
 */
export function percent(value, digit = 2) {

    return `${round(value * 100, digit)}%`;

}

/**
 * 指定値を範囲内でループ
 * @param {number} value
 * @param {number} max
 * @returns {number}
 */
export function loop(value, max) {

    return ((value % max) + max) % max;

}

/**
 * 配列シャッフル
 * @param {Array} array
 * @returns {Array}
 */
export function shuffle(array) {

    const copy = [...array];

    for (let i = copy.length - 1; i > 0; i--) {

        const j = randomInt(0, i);

        [copy[i], copy[j]] = [copy[j], copy[i]];

    }

    return copy;

}

/**
 * 指定ミリ秒待機
 * @param {number} ms
 * @returns {Promise}
 */
export function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}