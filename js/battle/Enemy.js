/**
 * World Creator
 * Battle Enemy
 *
 * 敵データ管理
 */


import BigNumber from "../number/BigNumber.js";


class Enemy {


    constructor(data = {}) {


        this.id =
            data.id ?? "unknown";


        this.name =
            data.name ?? "Enemy";


        this.rank =
            data.rank ?? 1;



        this.hp =
            BigNumber.from(
                data.stats?.hp ?? 10
            );


        this.attack =
            BigNumber.from(
                data.stats?.attack ?? 1
            );


        this.defense =
            BigNumber.from(
                data.stats?.defense ?? 1
            );


        this.speed =
            BigNumber.from(
                data.stats?.speed ?? 1
            );



        this.reward =
            data.reward ?? {};

    }



    /**
     * 攻撃力取得
     */

    damage() {

        return this.attack.clone();

    }



    /**
     * ダメージ受信
     */

    receiveDamage(value) {


        this.hp.subtract(
            value
        );


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
     * 報酬取得
     */

    getReward() {

        return this.reward;

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            id:
                this.id,

            name:
                this.name,

            rank:
                this.rank,

            hp:
                this.hp,

            attack:
                this.attack,

            defense:
                this.defense,

            speed:
                this.speed,

            reward:
                this.reward

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.id =
            data.id;


        this.name =
            data.name;


        this.rank =
            data.rank;



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


        this.reward =
            data.reward ?? {};

    }


}


export default Enemy;