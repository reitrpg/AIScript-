/**
 * World Creator
 * Event Bus System
 */


class EventBus {


    constructor(){


        this.events={};


    }



    on(

        name,

        callback

    ){


        if(

            typeof callback !== "function"

        ){

            return;

        }



        if(

            !this.events[name]

        ){


            this.events[name]=[];

        }



        if(

            !this.events[name]

            .includes(callback)

        ){


            this.events[name]

            .push(

                callback

            );


        }


    }



    emit(

        name,

        data

    ){


        if(

            !this.events[name]

        ){


            return;

        }



        this.events[name]

        .forEach(

            callback=>{


                try{


                    callback(

                        data

                    );


                }

                catch(error){


                    console.error(

                        "Event Error:",

                        name,

                        error

                    );


                }


            }

        );


    }



    off(

        name,

        callback

    ){


        if(

            !this.events[name]

        ){

            return;

        }



        this.events[name]=

        this.events[name]

        .filter(

            fn=>

            fn!==callback

        );


    }



    clear(){


        this.events={};


    }



}



export default new EventBus();