/**
 * World Creator
 * Battle Player
 *
 * プレイヤー戦闘能力管理
 */


import BigNumber from "../number/BigNumber.js";


class Player {


    constructor() {


        this.level = 1;


        this.hp =
            BigNumber.from(100);


        this.attack =
            BigNumber.from(10);


        this.defense =
            BigNumber.from(5);


        this.speed =
            BigNumber.from(5);


        this.exp =
            BigNumber.zero();


    }



    /**
     * 経験値取得
     */

    gainExp(value) {


        this.exp.add(value);


        this.checkLevel();


    }



    /**
     * レベル確認
     */

    checkLevel() {


        const required =
            BigNumber.from(
                100 * this.level
            );


        if (
            this.exp.exponent >
            required.exponent ||
            (
                this.exp.exponent ===
                required.exponent &&
                this.exp.value >=
                required.value
            )
        ) {


            this.level++;


            this.exp.subtract(
                required
            );


            this.grow();


        }

    }



    /**
     * 成長
     */

    grow() {


        this.hp.multiply(1.1);

        this.attack.multiply(1.1);

        this.defense.multiply(1.1);

        this.speed.multiply(1.05);


    }



    /**
     * ダメージ計算
     */

    damage() {

        return this.attack.clone();

    }



    /**
     * 受けるダメージ
     */

    receiveDamage(value) {


        this.hp.subtract(value);


        return this.hp;

    }



    /**
     * 生存確認
     */

    isAlive() {

        return (
            this.hp.value > 0
        );

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            level:
                this.level,

            hp:
                this.hp,

            attack:
                this.attack,

            defense:
                this.defense,

            speed:
                this.speed,

            exp:
                this.exp

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
            data.level ?? 1;


        this.hp =
            BigNumber.from(
                data.hp
            );


        this.attack =
            BigNumber.from(
                data.attack
            );


        this.defense =
            BigNumber.from(
                data.defense
            );


        this.speed =
            BigNumber.from(
                data.speed
            );


        this.exp =
            BigNumber.from(
                data.exp
            );

    }


}


export default Player;