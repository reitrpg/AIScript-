/**
 * World Creator
 * Event Bus
 *
 * システム間通信管理
 */


class EventBus {


    constructor(){

        this.events={};

    }



    on(name,callback){

        if(!this.events[name]){

            this.events[name]=[];

        }


        this.events[name].push(callback);

    }



    emit(name,data){

        if(!this.events[name]){

            return;

        }


        this.events[name]
        .forEach(
            callback=>
            callback(data)
        );

    }


}


const eventBus=new EventBus();


export default eventBus;
                  