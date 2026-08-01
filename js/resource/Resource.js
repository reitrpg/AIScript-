/**
 * World Creator
 * Resource Data
 *
 * Integrated Version
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



        this.productionRate = 1;


    }



    add(value){


        this.amount += value;


        if(this.amount < 0){


            this.amount = 0;


        }


    }



    remove(value){


        if(

            this.amount < value

        ){


            return false;


        }



        this.amount -= value;



        return true;


    }



    setProduction(value){


        this.production = value;


    }



    setProductionRate(value){


        this.productionRate = value;


    }



    getProduction(){


        return (

            this.production *

            this.productionRate

        );


    }



    update(){


        this.add(

            this.getProduction()

        );


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

                this.production,



            productionRate:

                this.productionRate


        };


    }



    load(data){


        if(!data){


            return;


        }



        this.amount =

            data.amount ?? 0;



        this.production =

            data.production ?? 0;



        this.productionRate =

            data.productionRate ?? 1;


    }


}



export default Resource;