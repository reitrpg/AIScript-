/**
 * World Creator
 * Resource Data
 *
 * Resource Object
 */


class Resource {


    constructor(

        id,

        name

    ){


        this.id=

        id;



        this.name=

        name;



        this.amount=

        0;



        this.production=

        0;


    }



    setProduction(value){


        this.production=

        Number(value)

        ||

        0;


    }



    getProduction(){


        return this.production;


    }



    add(value){


        const number=

        Number(value);



        if(

            isNaN(number)

        ){


            return;

        }



        this.amount+=

        number;


    }



    consume(value){


        const number=

        Number(value);



        if(

            this.amount < number

        ){


            return false;


        }



        this.amount-=

        number;



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



        this.amount=

        Number(

            data.amount

        )

        ||

        0;



        this.production=

        Number(

            data.production

        )

        ||

        0;


    }



}



export default Resource;