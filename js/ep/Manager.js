/**
 * World Creator
 * Evolution Point Manager
 *
 * EP System Base
 */


import eventBus from "../core/eventBus.js";



class EPManager {


    constructor(){


        this.amount=0;


        this.totalEarned=0;


    }



    add(value){


        const gain=

        Number(value)

        ||

        0;



        if(gain<=0){


            return;

        }



        this.amount+=gain;


        this.totalEarned+=gain;



        eventBus.emit(

            "ep:update"

        );


    }



    consume(value){


        const cost=

        Number(value)

        ||

        0;



        if(

            this.amount < cost

        ){


            return false;


        }



        this.amount-=cost;



        eventBus.emit(

            "ep:update"

        );



        return true;


    }



    get(){


        return this.amount;


    }



    getTotal(){


        return this.totalEarned;


    }



    canPay(value){


        return (

            this.amount >=

            Number(value)

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