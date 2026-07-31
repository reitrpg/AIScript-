/**
 * World Creator
 * Upgrade
 *
 * 強化データ管理
 */


import BigNumber from "../number/BigNumber.js";


class Upgrade {


    constructor(data) {

        this.id =
            data.id;

        this.name =
            data.name;

        this.description =
            data.description;


        this.level = 0;


        this.maxLevel =
            data.maxLevel;


        this.cost =
            data.cost ?? {};


        this.effect =
            data.effect ?? {};

    }



    /**
     * 最大レベル確認
     */

    isMaxLevel() {


        if (this.maxLevel === null) {

            return false;

        }


        return (
            this.level >= this.maxLevel
        );

    }



    /**
     * 次レベルコスト取得
     */

    getCost() {


        const cost = {};


        for (const key in this.cost) {


            cost[key] =
                BigNumber
                    .from(
                        this.cost[key]
                    )
                    .multiply(
                        Math.pow(
                            1.15,
                            this.level
                        )
                    );

        }


        return cost;

    }



    /**
     * 強化
     */

    upgrade() {


        if (this.isMaxLevel()) {

            return false;

        }


        this.level++;


        return true;

    }



    /**
     * 効果値取得
     */

    getEffectValue() {


        if (!this.effect.value) {

            return BigNumber.one();

        }


        return BigNumber
            .from(
                this.effect.value
            )
            .multiply(
                Math.pow(
                    1.05,
                    this.level
                )
            );

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            id:
                this.id,

            level:
                this.level

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.level =
            data.level ?? 0;

    }


}


export default Upgrade;