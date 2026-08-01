/**
 * World Creator
 * Tab UI System
 *
 * Screen Navigation Controller
 */



class TabUI {


    constructor(){


        this.container=null;


        this.tabs={};


        this.active=null;


    }



    init(id){


        this.container=

        document.getElementById(

            id

        );



        if(!this.container){


            return;


        }



        this.createLayout();


    }



    createLayout(){


        this.container.innerHTML=`

        <div class="tab-buttons"></div>

        <div class="tab-content"></div>

        `;



        this.buttonArea=

        this.container.querySelector(

            ".tab-buttons"

        );



        this.contentArea=

        this.container.querySelector(

            ".tab-content"

        );


    }



    addTab(id,name,content){


        if(

            this.tabs[id]

        ){


            return false;


        }



        this.tabs[id]={


            name:name,


            content:content


        };



        const button=

        document.createElement(

            "button"

        );



        button.textContent=

        name;



        button.onclick=

        ()=>{


            this.open(id);


        };



        this.buttonArea.appendChild(

            button

        );



        if(

            this.active===null

        ){


            this.open(id);


        }



        return true;


    }



    open(id){


        const tab=

        this.tabs[id];



        if(!tab){


            return false;


        }



        this.active=id;



        if(

            typeof tab.content==="function"

        ){


            this.contentArea.innerHTML=

            tab.content();


        }

        else{


            this.contentArea.innerHTML=

            tab.content;


        }



        return true;


    }



    getActive(){


        return this.active;


    }



    getTabs(){


        return this.tabs;


    }



}



export default new TabUI();