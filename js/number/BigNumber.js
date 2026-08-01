/**
 * World Creator
 * Big Number System
 */


class BigNumber {


    constructor(

        value=0,

        exponent=0

    ){


        this.value=

        Number(value);



        this.exponent=

        Number(exponent);



        this.normalize();


    }



    static zero(){


        return new BigNumber(

            0,

            0

        );


    }



    static from(data){


        if(

            data instanceof BigNumber

        ){

            return data;

        }



        if(

            typeof data==="number"

        ){

            return new BigNumber(

                data,

                0

            );

        }



        if(

            !data

        ){

            return BigNumber.zero();

        }



        return new BigNumber(

            data.value ?? 0,

            data.exponent ?? 0

        );


    }



    normalize(){


        if(

            this.value===0

        ){

            this.exponent=0;

            return;

        }



        while(

            Math.abs(this.value)>=10

        ){


            this.value/=10;


            this.exponent++;


        }



        while(

            Math.abs(this.value)<1

            &&

            this.value!==0

        ){


            this.value*=10;


            this.exponent--;


        }


    }



    add(other){


        const num=

        BigNumber.from(

            other

        );



        if(

            this.exponent===num.exponent

        ){


            this.value+=num.value;


        }

        else{


            const diff=

            this.exponent-num.exponent;



            if(

                diff>=0

            ){


                this.value+=

                num.value

                *

                Math.pow(

                    10,

                    -diff

                );


            }

            else{


                this.value=

                this.value

                *

                Math.pow(

                    10,

                    diff

                )

                +

                num.value;



                this.exponent=

                num.exponent;


            }


        }



        this.normalize();



        return this;


    }



    compare(other){


        const num=

        BigNumber.from(

            other

        );



        if(

            this.exponent!==num.exponent

        ){


            return this.exponent-num.exponent;


        }



        return this.value-num.value;


    }



    greaterOrEqual(other){


        return (

            this.compare(

                other

            )

            >=0

        );


    }



    toJSON(){


        return {


            value:

            this.value,


            exponent:

            this