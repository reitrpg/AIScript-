/**
 * World Creator
 * Tab Manager
 *
 * UI Navigation System
 */


class TabManager {


    constructor(){


        this.current = "world";


    }



    init(){


        const buttons =

        document.querySelectorAll(

            "[data-tab]"

        );



        buttons.forEach(

            button=>{


                button.onclick=()=>{


                    this.open(

                        button.dataset.tab

                    );


                };


            }

        );



        this.open(

            this.current

        );


    }



    open(name){


        const sections =

        document.querySelectorAll(

            ".tab-content"

        );



        sections.forEach(

            section=>{


                if(

                    section.id ===

                    name + "-section"

                ){


                    section.style.display=

                    "block";


                }

                else{


                    section.style.display=

                    "none";


                }


            }

        );



        this.current=name;



        document

        .querySelectorAll(

            "[data-tab]"

        )

        .forEach(

            button=>{


                button.classList.remove(

                    "active"

                );



                if(

                    button.dataset.tab === name

                ){


                    button.classList.add(

                        "active"

                    );


                }


            }

        );


    }



}



export default new TabManager();