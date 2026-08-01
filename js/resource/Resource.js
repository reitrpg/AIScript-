class Resource {


    constructor(
        id,
        name
    ){

        this.id=id;

        this.name=name;

        this.amount=0;

        this.production=0;


    }



    add(value){

        this.amount+=value;

    }



    remove(value){

        if(this.amount<value){

            return false;

        }


        this.amount-=value;

        return true;

    }



    setProduction(value){

        this.production=value;

    }



    update(){

        this.add(
            this.production
        );

    }



    toJSON(){

        return {

            id:this.id,

            name:this.name,

            amount:this.amount,

            production:this.production

        };

    }



    load(data){

        this.amount=data.amount ?? 0;

        this.production=data.production ?? 0;

    }


}


export default Resource;