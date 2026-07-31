/**
 * World Creator
 * World Effect
 *
 * 世界補正・効果管理
 */


import BigNumber from "../number/BigNumber.js";


class WorldEffect {


    constructor() {

        this.effects = new Map();

    }



    /**
     * 効果登録
     */

    add(id, effect) {


        this.effects.set(
            id,
            {

                id,

                type:
                    effect.type,

                target:
                    effect.target,

                value:
                    BigNumber.from(
                        effect.value ?? 0
                    )

            }
        );


    }



    /**
     * 効果削除
     */

    remove(id) {

        this.effects.delete(id);

    }



    /**
     * 効果取得
     */

    get(id) {

        return this.effects.get(id);

    }



    /**
     * 効果適用
     */

    apply(target, value) {


        let result =
            BigNumber.from(value);



        for (
            const effect
            of this.effects.values()
        ) {


            if (
                effect.target !== target
            ) {

                continue;

            }



            switch(effect.type) {


                case "add":

                    result.add(
                        effect.value
                    );

                    break;



                case "multiply":

                    result.multiply(
                        effect.value
                    );

                    break;



                case "set":

                    result =
                        effect.value.clone();

                    break;


            }

        }


        return result;

    }



    /**
     * 全効果取得
     */

    getAll() {

        return this.effects;

    }



    /**
     * 保存
     */

    toJSON() {


        const data = {};


        for (
            const [id, effect]
            of this.effects
        ) {


            data[id] = {

                id:
                    effect.id,

                type:
                    effect.type,

                target:
                    effect.target,

                value: {

                    value:
                        effect.value.value,

                    exponent:
                        effect.value.exponent

                }

            };

        }


        return data;

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        for (const id in data) {


            this.add(
                id,
                data[id]
            );

        }

    }


}


const effect =
    new WorldEffect();


export default effect;