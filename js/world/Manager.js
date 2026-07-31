/**
 * World Creator
 * World Manager
 *
 * World Create Check Version
 */


import BigNumber from "../number/BigNumber.js";

import eventBus from "../core/eventBus.js";



class WorldManager {


    constructor() {


        this.worlds = [];


        this.current = null;


        this.initialized = false;


    }



    init() {


        if (

            this.initialized

        ) {


            return;


        }



        this.initialized = true;



        console.log(

            "[World] Ready"

        );


    }



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

                10,



            created:

                Date.now()


        };



        this.worlds.push(

            world

        );



        this.current =

            world;



        console.log(

            "[World] Created",

            world.id

        );



        eventBus.emit(

            "world:created",

            world

        );



        return world;


    }



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



    getCurrent() {


        return this.current;


    }



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



    load(data) {


        if (

            !data

        ) {


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