/**
 * World Creator
 * Rebirth System
 *
 * 転生システム管理
 */


import BigNumber from "../number/BigNumber.js";
import eventBus from "../core/eventBus.js";


class Rebirth {


    constructor() {

        this.count = 0;

        this.power =
            BigNumber.zero();

        this.bonus =
            BigNumber.one();

    }



    /**
     * 転生可能確認
     */

    canRebirth(world) {


        if (!world) {

            return false;

        }


        return (
            world.civilization.value > 0 ||
            world.magic.value > 0
        );

    }



    /**
     * 転生実行
     */

    execute(world) {


        if (!this.canRebirth(world)) {

            return false;

        }



        /*
            転生回数増加
        */

        this.count++;



        /*
            転生力計算
        */

        this.power.add(
            world.civilization
        );

        this.power.add(
            world.magic
        );



        /*
            ボーナス更新
        */

        this.bonus =
            BigNumber
                .one()
                .add(
                    this.count * 0.01
                );



        /*
            世界初期化
        */

        world.create(
            world.type
        );



        eventBus.emit(
            "rebirth:completed",
            this
        );


        return true;

    }



    /**
     * 転生回数取得
     */

    getCount() {

        return this.count;

    }



    /**
     * ボーナス取得
     */

    getBonus() {

        return this.bonus;

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            count:
                this.count,

            power: {

                value:
                    this.power.value,

                exponent:
                    this.power.exponent

            },

            bonus: {

                value:
                    this.bonus.value,

                exponent:
                    this.bonus.exponent

            }

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.count =
            data.count ?? 0;


        this.power =
            new BigNumber(

                data.power.value,

                data.power.exponent

            );


        this.bonus =
            new BigNumber(

                data.bonus.value,

                data.bonus.exponent

            );

    }


}


const rebirth =
    new Rebirth();


export default rebirth;