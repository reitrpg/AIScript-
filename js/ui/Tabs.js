class Tabs {


    init(){


        const buttons =

            document.querySelectorAll(
                ".tabs button"
            );



        const sections = [

            document.querySelector(
                "#world-info"
            ),

            document.querySelector(
                "#resource-list"
            ),

            document.querySelector(
                "#research-list"
            )

        ];



        buttons.forEach(

            (button,index)=>{


                button.onclick = ()=>{


                    sections.forEach(

                        section=>{


                            if(section){

                                section.parentElement
                                .style.display="none";

                            }


                        }

                    );



                    if(sections[index]){


                        sections[index]
                        .parentElement
                        .style.display="block";


                    }


                };


            }

        );


    }


}


export default new Tabs();