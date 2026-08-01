/**
 * World Creator
 * Notification UI
 */


import eventBus from "../core/eventBus.js";



class NotificationUI {


    constructor(){


        this.area=null;


    }



    init(id){


        this.area=

        document.getElementById(id);



        if(!this.area){

            return;

        }



        this.bind();


    }



    bind(){



        eventBus.on(

            "world:unlock",

            data=>{


                this.show(

                    this.getUnlockText(data)

                );


            }

        );



        eventBus.on(

            "world:levelup",

            world=>{


                this.show(

                    "世界Lvが "

                    +

                    world.level

                    +

                    " になりました"

                );


            }

        );



        eventBus.on(

            "world:rebirth",

            world=>{


                this.show(

                    "転生しました\n倍率: "

                    +

                    world.rebirthMultiplier

                    +

                    "倍"

                );


            }

        );



        eventBus.on(

            "world:created",

            world=>{


                this.show(

                    world.name

                    +

                    " が誕生しました"

                );


            }

        );


    }



    getUnlockText(id){


        switch(id){


            case "resource_slot":

                return "素材産出枠が増加しました";


            case "advanced_resource":

                return "高位素材が解放されました";


            case "rare_material":

                return "希少素材が解放されました";


            default:

                return "新要素が解放されました";


        }


    }



    show(text){


        const message=

        document.createElement(

            "div"

        );



        message.className=

        "notification";



        message.textContent=

        text;



        this.area.appendChild(

            message

        );



        setTimeout(

            ()=>{


                message.remove();


            },

            3000

        );


    }



}



export default new NotificationUI();