/**
 * World Creator
 * Research Manager
 *
 * 研究管理システム
 */


import Research from "./Research.js";
import eventBus from "../core/eventBus.js";


class ResearchManager {


    constructor() {

        this.researches = new Map();

    }



    /**
     * 研究登録
     */

    register(id, data) {


        const research =
            new Research({

                id,

                ...data

            });


        this.researches.set(
            id,
            research
        );


        eventBus.emit(
            "research:registered",
            research
        );


        return research;

    }



    /**
     * 研究取得
     */

    get(id) {

        return this.researches.get(id);

    }



    /**
     * 研究進行
     */

    progress(id, value) {


        const research =
            this.get(id);


        if (!research) {

            return false;

        }


        research.addProgress(
            value
        );


        return true;

    }



    /**
     * 全研究取得
     */

    getAll() {

        return this.researches;

    }



    /**
     * 保存
     */

    toJSON() {


        const data = {};


        for (
            const [id, research]
            of this.researches
        ) {


            data[id] =
                research.toJSON();

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


            let research =
                this.researches.get(id);



            if (!research) {


                research =
                    new Research({

                        id

                    });


                this.researches.set(
                    id,
                    research
                );

            }


            research.load(
                data[id]
            );

        }

    }


}


const manager =
    new ResearchManager();


export default manager;