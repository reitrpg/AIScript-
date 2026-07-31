/**
 * World Creator
 * Debug Command
 *
 * デバッグコマンド管理
 */


import debug from "./Debug.js";
import eventBus from "../core/eventBus.js";


class Command {


    constructor() {

        this.commands = new Map();

    }



    /**
     * コマンド登録
     */

    register(
        name,
        callback
    ) {


        this.commands.set(
            name,
            callback
        );

    }



    /**
     * 実行
     */

    execute(
        input
    ) {


        if (!input) {

            return null;

        }


        const args =
            input
                .trim()
                .split(/\s+/);



        const name =
            args.shift();



        const command =
            this.commands.get(
                name
            );


        if (!command) {


            debug.log(
                "Unknown command:",
                name
            );


            return null;

        }



        try {


            const result =
                command(
                    args
                );


            eventBus.emit(
                "debug:command",
                {

                    name,

                    args,

                    result

                }
            );


            return result;


        }
        catch(error) {


            debug.error(
                error
            );


            return null;

        }

    }



    /**
     * コマンド一覧
     */

    list() {

        return [
            ...this.commands.keys()
        ];

    }



    /**
     * 保存
     */

    toJSON() {


        return {

            commands:
                this.list()

        };

    }


}



const command =
    new Command();


export default command;