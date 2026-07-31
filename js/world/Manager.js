/**
 * World Creator
 * World Manager
 *
 * 世界管理システム
 */


import BigNumber from "../number/BigNumber.js";

import eventBus from "../core/eventBus.js";



class WorldManager {


    constructor() {


        this.worlds = [];


        this.current = null;


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



        this.initialized = true;


    }



    /**
     * 世界作成
     */

    createWorld() {


        const world = {


            id:

                Date.now()
                    .toString(),



            level:

                1,



            age:

                BigNumber.from(

                    0

                ),



            population:

                0,



            created:

                Date.now()


        };



        this.worlds.push(

            world

        );



        this.current =

            world;



        eventBus.emit(

            "world:created",

            world

        );



        return world;


    }



    /**
     * Tick更新
     */

    update() {


        if (
            !this.current
        ) {

            return;

        }



        this.current.age.add(

            1

        );



        eventBus.emit(

            "world:update",

            this.current

        );


    }



    /**
     * 現在世界取得
     */

    getCurrent() {


        return this.current;


    }



    /**
     * 保存
     */

    toJSON() {


        return {


            worlds:

                this.worlds.map(

                    world => ({


                        id:

                            world.id,


                        level:

                            world.level,


                        age:

                            world.age.toJSON(),


                        population:

                            world.population,


                        created:

                            world.created


                    })

                ),



            current:

                this.current

                ?

                this.current.id

                :

                null


        };


    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }



        this.worlds =

            data.worlds

            ?

            data.worlds.map(

                world => ({


                    ...world,


                    age:

                        BigNumber.from(

                            world.age

                        )


                })

            )

            :

            [];



        this.current =


            this.worlds.find(

                world =>

                    world.id ===

                    data.current


            )

            ||

            null;


    }


}



const worldManager =

    new WorldManager();



eventBus.on(

    "world:create",

    () => {


        worldManager.createWorld();


    }

);



export default worldManager;