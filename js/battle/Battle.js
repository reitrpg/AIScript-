/**
 * World Creator
 * Battle System
 *
 * 戦闘処理管理
 */


import Player from "./Player.js";
import Enemy from "./Enemy.js";
import eventBus from "../core/eventBus.js";


class Battle {


    constructor() {

        this.player =
            new Player();


        this.enemy =
            null;


        this.turn = 0;


        this.running = false;


    }



    /**
     * 戦闘開始
     */

    start(enemyData) {


        this.enemy =
            new Enemy(
                enemyData
            );


        this.turn = 0;

        this.running = true;


        eventBus.emit(
            "battle:start",
            this.enemy
        );


    }



    /**
     * 1ターン処理
     */

    update() {


        if (
            !this.running ||
            !this.enemy
        ) {

            return;

        }


        this.turn++;



        /*
            プレイヤー攻撃
        */

        this.enemy.receiveDamage(
            this.player.damage()
        );



        if (
            !this.enemy.isAlive()
        ) {

            this.win();

            return;

        }



        /*
            敵攻撃
        */

        this.player.receiveDamage(
            this.enemy.damage()
        );



        if (
            !this.player.isAlive()
        ) {

            this.lose();

        }


    }



    /**
     * 勝利
     */

    win() {


        this.running = false;


        eventBus.emit(
            "battle:win",
            this.enemy.getReward()
        );


    }



    /**
     * 敗北
     */

    lose() {


        this.running = false;


        eventBus.emit(
            "battle:lose"
        );


    }



    /**
     * 戦闘中確認
     */

    isRunning() {

        return this.running;

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            turn:
                this.turn,

            running:
                this.running,

            enemy:
                this.enemy
                    ? this.enemy.toJSON()
                    : null,

            player:
                this.player.toJSON()

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.turn =
            data.turn ?? 0;


        this.running =
            data.running ?? false;


        this.player.load(
            data.player
        );


        if (data.enemy) {

            this.enemy =
                new Enemy(
                    data.enemy
                );

        }

    }


}


const battle =
    new Battle();


export default battle;