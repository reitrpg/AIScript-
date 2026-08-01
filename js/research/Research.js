/**
 * World Creator
 * Research Data
 *
 * Individual Research Object
 */


import BigNumber from "../number/BigNumber.js";



class Research {


    constructor(data={}){


        this.id=

        data.id

        ??

        "unknown";



        this.name=

        data.name

        ??

        "Research";



        this.description=

        data.description

        ??

        "";



        this.level=

        data.level

        ??

        0;



        this.max=

        data.max

        ??

        1;



        this.effect=

        data.effect

        ??

        1;



        this.type=

        data.type

        ??

        "production";



        this.cost=

        data.cost

        ??

        {};



        this.progress=

        BigNumber.zero();


        this.completed=false;


    }



    addProgress(value){


        if(

            this.level >=

            this.max

        ){


            return;

        }



        this.progress.add(

            value

        );



        if(

            this.checkComplete()

        ){


            this.complete();


        }


    }



    checkComplete(){


        const required=

        BigNumber.from(

            (

                this.level + 1

            )

            *

            100

        );



        return this.progress

        .greaterOrEqual(

            required

        );


    }



    complete(){


        if(

            this.level >=

            this.max

        ){


            return;

        }



        this.level++;



        this.progress=

        BigNumber.zero();



        this.completed=true;


    }



    getMultiplier(){


        return Math.pow(

            this.effect,

            this.level

        );


    }



    getState(){


        return {


            level:

            this.level,


            progress:

            this.progress,


            completed:

            this.completed


        };


    }



    toJSON(){


        return {


            id:

            this.id,


            name:

            this.name,


            description:

            this.description,


            level:

            this.level,


            max:

            this.max,


            effect:

            this.effect,


            type:

            this.type,


            cost:

            this.cost,


            progress:

            this.progress.toJSON(),


            completed:

            this.completed


        };


    }



    load(data){


        if(!data){


            return;

        }



        this.level=

        data.level

        ??

        0;



        this.completed=

        data.completed

        ??

        false;



        this.progress=

        BigNumber.from(

            data.progress

        );


    }



}



export default Research;