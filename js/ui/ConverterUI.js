/**
 * World Creator
 * Converter UI
 */


import Converter from "../converter/Converter.js";



class ConverterUI {


    constructor(){


        this.area=null;


    }



    init(id){


        this.area=

        document.getElementById(

            id

        );



        if(!this.area){

            return;

        }



        this.update();


    }



    update(){


        if(!this.area){

            return;

        }



        const list=

        Converter.getAll();



        let html="";



        for(

            const id in list

        ){


            const data=

            list[id];



            html+=`


            <div class="converter-item">


            <h3>

            ${data.name}

            </h3>



            必要:



            ${