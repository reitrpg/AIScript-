/**
 * World Creator
 * Research Manager
 *
 * Integrated Version
 */


import eventBus from "../core/eventBus.js";



class ResearchManager {


    constructor(){


        this.points = 0;



        this.data = {


            agriculture:{


                name:"Agriculture",


                cost:100,


                unlocked:false


            },



            mining:{


                name:"Mining",


                cost:150,


                unlocked:false


            },



            magic:{


                name:"Magic",


                cost:300,


                unlocked:false


            }


        };


    }



    init(){


    }



    addPoint(value){


        this.points += value;



        eventBus.emit(

            "research:update",

            this.points

        );


    }



    unlock(id){


        const research =

            this.data[id];



        if(!research){


            return false;


        }



        if(research.unlocked){


            return false;


        }



        if(

            this.points <

            research.cost

        ){


            return false;


        }



        this.points -=

            research.cost;



        research.unlocked = true;



        eventBus.emit(

            "research:update",

            research

        );



        eventBus.emit(

            "research:unlock",

            research

        );



        return true;


    }



    isUnlocked(id){


        if(!this.data[id]){


            return false;


        }



        return this.data[id]

        .unlocked;


    }



    getAll(){


        return this.data;


    }



    toJSON(){


        return {


            points:

                this.points,


            data:

                this.data


        };


    }



    load(saveData){


        if(!saveData){


            return;


        }



        this.points =

            saveData.points ?? 0;



        this.data =

            saveData.data ?? this.data;


    }


}



const researchManager =

    new ResearchManager();



export default researchManager;