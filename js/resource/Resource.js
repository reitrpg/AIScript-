/**
 * World Creator
 * Resource Data
 *
 * Decimal / Large Number Support
 */


class Resource {


    constructor(

        id,

        name

    ){


        this.id = id;


        this.name = name;



        this.amount = 0;



        this.production = 0;


    }



    setProduction(value){


        this.production =

        Number(value);


    }



    getProduction(){


        return this.production;


    }



    add(value){


        if(

            isNaN(value)

        ){

            return;

        }



        this.amount +=

        Number(value);



    }



    consume(value){


        if(

            this.amount < value

        ){


            return false;


        }



        this.amount -=

        value;



        return true;


    }



    getAmount(){


        return this.amount;


    }



    toJSON(){


        return {


            id:

            this.id,


            name:

            this.name,


            amount:

            this.amount,


            production:

            this.production


        };


    }



    load(data){


        if(!data){

            return;

        }



        this.amount =

        Number(

            data.amount ?? 0

        );



        this.production =

        Number(

            data.production ?? 0

        );



    }



}



export default Resource;