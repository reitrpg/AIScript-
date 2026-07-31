/**
 * World Creator
 * World Manager
 *
 * 世界管理システム
 */


import Generator from "./Generator.js";
import World from "./World.js";
import eventBus from "../core/eventBus.js";


class WorldManager {


    constructor() {

        this.worlds = new Map();

        this.activeWorld = null;

    }



    /**
     * 世界作成
     */

    create(type = "normal") {


        const world =
            Generator.generate(type);


        this.worlds.set(
            world.id,
            world
        );


        this.activeWorld =
            world;


        eventBus.emit(
            "world:registered",
            world
        );


        return world;

    }



    /**
     * 世界追加
     */

    add(world) {


        if (!(world instanceof World)) {

            return false;

        }


        this.worlds.set(
            world.id,
            world
        );


        return true;

    }



    /**
     * 現在世界取得
     */

    getActive() {

        return this.activeWorld;

    }



    /**
     * 世界切替
     */

    switch(id) {


        const world =
            this.worlds.get(id);


        if (!world) {

            return false;

        }


        this.activeWorld =
            world;


        eventBus.emit(
            "world:changed",
            world
        );


        return true;

    }



    /**
     * 全世界取得
     */

    getAll() {

        return this.worlds;

    }



    /**
     * 更新
     */

    update() {


        if (!this.activeWorld) {

            return;

        }


        this.activeWorld.tick();

    }



    /**
     * 保存用
     */

    toJSON() {


        const data = {};


        for (
            const [id, world]
            of this.worlds
        ) {

            data[id] =
                world.toJSON();

        }


        return {

            worlds: data,

            active:
                this.activeWorld
                    ? this.activeWorld.id
                    : null

        };

    }



    /**
     * 復元
     */

    load(data) {


        if (!data) {

            return;

        }


        for (const id in data.worlds) {


            const world =
                new World();


            world.load(
                data.worlds[id]
            );


            this.worlds.set(
                id,
                world
            );

        }



        if (data.active) {

            this.activeWorld =
                this.worlds.get(
                    data.active
                );

        }

    }


}


const manager =
    new WorldManager();


export default manager;