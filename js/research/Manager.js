/**
 * World Creator
 * Research Manager
 *
 * 技術研究管理
 */


import eventBus from "../core/eventBus.js";



class ResearchManager {


    constructor() {


        this.researches = {};


        this.points = 0;


        this.initialized = false;


    }



    /**
     * 初期化
     */

    init() {


        if (

            this.initialized

        ) {


            return;


        }



        this.register(

            "agriculture",

            "Agriculture",

            100

        );


        this.register(

            "mining",

            "Mining",

            150

        );


        this.register(

            "magic",

            "Magic Research",

            300

        );



        this.initialized = true;


    }



    /**
     * 研究登録
     */

    register(
        id,
        name,
        cost
    ) {


        this.researches[id] = {


            id,

            name,

            cost,

            unlocked:

                false


        };


    }



    /**
     * ポイント追加
     */

    addPoint(value) {


        this.points += value;



        eventBus.emit(

            "research:update"

        );


    }



    /**
     * 研究解放
     */

    unlock(id) {


        const research =

            this.researches[id];



        if (!research) {


            return false;


        }



        if (

            research.unlocked

        ) {


            return false;


        }



        if (

            this.points

            <

            research.cost

        ) {


            return false;


        }



        this.points -=

            research.cost;



        research.unlocked =

            true;



        eventBus.emit(

            "research:unlock",

            research

        );



        return true;


    }



    /**
     * 解放確認
     */

    isUnlocked(id) {


        return (

            this.researches[id]

            &&

            this.researches[id]
                .unlocked

        );


    }



    /**
     * 全取得
     */

    getAll() {


        return this.researches;


    }



    /**
     * 保存
     */

    toJSON() {


        return {


            points:

                this.points,


            researches:

                this.researches


        };


    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {


            return;


        }



        this.points =

            data.points

            ??

            0;



        this.researches =

            data.researches

            ??

            {};


    }


}



const researchManager =

    new ResearchManager();



export default researchManager;