/**
 * World Creator
 * World Level System
 *
 * Exponential EXP Curve
 */


getNeedExp(){


    if(!this.current){

        return 100;

    }



    return Math.floor(


        100 *

        Math.pow(

            1.35,

            this.current.level - 1

        )


    );


}



addExp(value){


    if(!this.current){

        return;

    }



    this.current.exp += value;



    let levelUp=false;



    while(


        this.current.exp >=

        this.getNeedExp()


    ){



        this.current.exp -=

        this.getNeedExp();



        this.current.level++;



        levelUp=true;



        this.checkUnlock();



        eventBus.emit(

            "world:levelup",

            this.current

        );


    }



    if(levelUp){


        eventBus.emit(

            "world:update",

            this.current

        );


    }


}