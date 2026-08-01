/**
 * World Creator
 * Tab Manager
 */


class TabManager {


    constructor(){


        this.current="world";


        this.tabs=[

            "world",

            "resource",

            "research"

        ];


    }



    init(){


        document

        .querySelectorAll(

            "[data-tab]"

        )

        .forEach(

            button=>{


                button.addEventListener(

                    "click",

                    ()=>{


                        this.open(

                            button.dataset.tab

                        );


                    }

                );


            }

        );



        this.open(

            this.current

        );


    }



    open(name){


        if(

            !this.tabs.includes(name)

        ){

            return;

        }



        this.current=name;



        this.tabs.forEach(

            tab=>{


                const area=

                document.getElementById(

                    tab+"-tab"

                );



                if(area){


                    area.style.display=

                    tab===name

                    ?

                    "block"

                    :

                    "none";


                }


            }

        );


    }



    getCurrent(){


        return this.current;


    }



}



export default new TabManager();