/**
 * World Creator
 * Research System
 *
 * 研究項目管理
 */


import BigNumber from "../number/BigNumber.js";
import eventBus from "../core/eventBus.js";


class Research {


    constructor(data = {}) {


        this.id =
            data.id ?? "unknown";


        this.name =
            data.name ?? "Research";


        this.description =
            data.description ?? "";



        this.cost =
            this.convertCost(
                data.cost ?? {}
            );



        this.effect =
            data.effect ?? {};



        this.level = 0;


        this.progress =
            BigNumber.zero();


        this.completed = false;

    }



    /**
     * コスト変換
     */

    convertCost(cost) {


        const result = {};


        for (const key in cost) {


            result[key] =
                BigNumber.from(
                    cost[key]
                );

        }


        return result;

    }



    /**
     * 研究進行
     */

    addProgress(value) {


        if (this.completed) {

            return;

        }


        this.progress.add(
            value
        );


        if (
            this.checkComplete()
        ) {

            this.complete();

        }

    }



    /**
     * 完成確認
     */

    checkComplete() {


        const required =
            this.cost.knowledge ??
            BigNumber.from(100);



        return (
            this.progress.exponent >
            required.exponent ||
            (
                this.progress.exponent ===
                required.exponent &&
                this.progress.value >=
                required.value
            )
        );

    }



    /**
     * 完成
     */

    complete() {


        this.completed = true;

        this.level++;


        eventBus.emit(
            "research:complete",
            this
        );

    }



    /**
     * 状態取得
     */

    getState() {


        return {

            level:
                this.level,

            progress:
                this.progress,

            completed:
                this.completed

        };

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            id:
                this.id,

            level:
                this.level,

            progress: {

                value:
                    this.progress.value,

                exponent:
                    this.progress.exponent

            },

            completed:
                this.completed

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


        this.progress =
            BigNumber.from(
                data.progress
            );


        this.completed =
            data.completed ?? false;

    }


}


export default Research;