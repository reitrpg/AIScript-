/**
 * World Creator
 * Life Tree
 *
 * 生命成長ツリー管理
 */


import treeData from "../data/treeData.js";
import BigNumber from "../number/BigNumber.js";
import eventBus from "../core/eventBus.js";


class LifeTree {


    constructor() {

        this.nodes = new Map();

        this.unlocked = new Set();

    }



    /**
     * 初期化
     */

    init() {


        const data =
            treeData.life.nodes;


        for (const id in data) {


            const node =
                data[id];


            this.nodes.set(
                id,
                {

                    ...node,

                    cost:
                        this.convertCost(
                            node.cost
                        )

                }
            );

        }

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
     * ノード取得
     */

    get(id) {

        return this.nodes.get(id);

    }



    /**
     * 解放確認
     */

    isUnlocked(id) {

        return this.unlocked.has(id);

    }



    /**
     * 解放
     */

    unlock(id) {


        if (!this.nodes.has(id)) {

            return false;

        }


        if (
            this.isUnlocked(id)
        ) {

            return false;

        }


        this.unlocked.add(id);


        eventBus.emit(
            "tree:lifeUnlocked",
            id
        );


        return true;

    }



    /**
     * 全ノード取得
     */

    getAll() {

        return this.nodes;

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            unlocked:
                [...this.unlocked]

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        this.unlocked =
            new Set(
                data.unlocked ?? []
            );

    }


}


const lifeTree =
    new LifeTree();


lifeTree.init();


export default lifeTree;