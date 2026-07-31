/**
 * World Creator
 * BigNumber Constants
 *
 * 超巨大数処理用定数
 */


/*
    基本設定
*/

export const BASE = 10;


/*
    3桁区切り単位
    10^3 = 1K
*/

export const GROUP_SIZE = 3;


/*
    正規化基準

    BigNumber:
    value × 10^exponent

    value範囲:
    1 <= value < 1000
*/

export const MIN_MANTISSA = 1;

export const MAX_MANTISSA = 1000;


/*
    最大処理指数

    JavaScript Numberの限界を超える
    指数管理用
*/

export const MAX_EXPONENT = Number.MAX_SAFE_INTEGER;


/*
    特殊値
*/

export const ZERO = 0;

export const ONE = 1;


/*
    計算精度

    小数演算時の有効桁
*/

export const PRECISION = 20;


/*
    比較用
*/

export const COMPARE_EQUAL = 0;

export const COMPARE_LESS = -1;

export const COMPARE_GREATER = 1;