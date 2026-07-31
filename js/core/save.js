/**
 * World Creator
 * Save System
 *
 * LocalStorage管理
 */


class SaveManager {


    constructor() {


        this.key =

            "world_creator_save";


    }



    /**
     * 保存
     */

    save(data) {


        try {


            const json =

                JSON.stringify(
                    data
                );



            localStorage.setItem(

                this.key,

                json

            );



            return true;


        }

        catch(error) {


            console.error(

                "Save Error:",

                error

            );


            return false;


        }


    }



    /**
     * 読込
     */

    load() {


        try {


            const json =

                localStorage.getItem(

                    this.key

                );



            if (!json) {


                return null;


            }



            return JSON.parse(

                json

            );


        }

        catch(error) {


            console.error(

                "Load Error:",

                error

            );


            return null;


        }


    }



    /**
     * 削除
     */

    clear() {


        localStorage.removeItem(

            this.key

        );


    }



    /**
     * 存在確認
     */

    exists() {


        return (

            localStorage.getItem(

                this.key

            )

            !==

            null

        );


    }


}



const save =

    new SaveManager();



export default save;