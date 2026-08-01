/**
 * World Creator
 * EP Manager
 *
 * Energy Point Controller
 */


import eventBus from "../core/eventBus.js";



class EPManager {


    constructor(){


        this.amount=0;


        this.totalEarned=0;


    }



    get(){


        return this.amount;


    }



    add(value){


        const amount=

        Number(value)

        ||

        0;



        if(amount<=0){


            return false;


        }



        this.amount+=amount;



        this.totalEarned+=amount;



        eventBus.emit(

            "ep:update"

        );



        return true;


    }



    consume(value){


        const amount=

        Number(value)

        ||

        0;



        if(

            amount<=0

        ){


            return false;


        }



        if(

            this.amount<amount

        ){


            return false;


        }



        this.amount-=amount;



        eventBus.emit(

            "ep:update"

        );



        return true;


    }



    canPay(value){


        return (

            this.amount

            >=

            Number(value)

        );


    }



    getTotalEarned(){


        return this.totalEarned;


    }



    set(value){


        this.amount=

        Number(value)

        ||

        0;



        eventBus.emit(

            "ep:update"

        );


    }



    reset(){


        this.amount=0;


        this.totalEarned=0;



        eventBus.emit(

            "ep:update"

        );


    }



    toJSON(){


        return {


            amount:

            this.amount,


            totalEarned:

            this.totalEarned


        };


    }



    load(data){


        if(!data){


            return;


        }



        this.amount=

        Number(

            data.amount

        )

        ||

        0;



        this.totalEarned=

        Number(

            data.totalEarned

        )

        ||

        0;


    }



}



export default new EPManager();