/**
 * World Creator
 * Event Bus System
 *
 * Global Event Communication
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

            !this.events[name]

        ){


            this.events[name]=[];


        }



        this.events[name]

        .push(

            callback

        );


    }



    emit(

        name,

        data=null

    ){


        const listeners=

        this.events[name];



        if(

            !listeners

        ){


            return;

        }



        listeners.forEach(

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

            event=>event!==callback

        );


    }



    clear(name){


        if(name){


            delete this.events[name];


        }

        else{


            this.events={};


        }


    }



}



export default new EventBus();