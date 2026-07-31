/**
 * World Creator
 * Tree Synergy
 *
 * 成長ツリー間相乗効果管理
 */


import BigNumber from "../number/BigNumber.js";
import eventBus from "../core/eventBus.js";


class Synergy {


    constructor() {

        this.effects = new Map();

        this.active = new Set();

    }



    /**
     * 相乗効果登録
     */

    register(id, data) {


        this.effects.set(
            id,
            {

                id,

                name:
                    data.name,

                description:
                    data.description,

                condition:
                    data.condition,

                effect:
                    {

                        type:
                            data.effect.type,

                        target:
                            data.effect.target,

                        value:
                            BigNumber.from(
                                data.effect.value ?? 0
                            )

                    }

            }
        );

    }



    /**
     * 発動確認
     */

    check(conditionData) {


        for (
            const [id, synergy]
            of this.effects
        ) {


            if (
                this.active.has(id)
            ) {

                continue;

            }


            if (
                synergy.condition(
                    conditionData
                )
            ) {

                this.activate(id);

            }

        }

    }



    /**
     * 発動
     */

    activate(id) {


        const synergy =
            this.effects.get(id);


        if (!synergy) {

            return false;

        }


        this.active.add(id);


        eventBus.emit(
            "tree:synergyActivated",
            synergy
        );


        return true;

    }



    /**
     * 有効確認
     */

    isActive(id) {

        return this.active.has(id);

    }



    /**
     * 効果取得
     */

    getEffect(id) {


        const synergy =
            this.effects.get(id);


        if (!synergy) {

            return null;

        }


        return synergy.effect;

    }



    /**
     * 全取得
     */

    getAll() {

        return this.effects;

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            active:
                [
                    ...this.active
                ]

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.active =
            new Set(
                data.active ?? []
            );

    }


}


const synergy =
    new Synergy();


export default synergy;