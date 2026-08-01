/**
 * World Creator
 * Research UI
 *
 * 技術研究表示管理
 */


import eventBus from "../core/eventBus.js";

import ResearchManager from "../research/Manager.js";



class ResearchUI {


    constructor() {


        this.root = null;


    }



    /**
     * 初期化
     */

    init(id) {


        this.root =

            document.getElementById(

                id

            );



        if (!this.root) {


            return;


        }



        this.render();


        this.bind();


        this.update();


    }



    /**
     * 描画
     */

    render() {


        this.root.innerHTML = `


        <section class="panel">


            <h2>

                Research

            </h2>


            <div id="research-point">

            </div>


            <div id="research-list">

            </div>


        </section>


        `;


    }



    /**
     * イベント
     */

    bind() {


        eventBus.on(

            "research:update",

            () => {


                this.update();


            }

        );



        eventBus.on(

            "research:unlock",

            () => {


                this.update();


            }

        );


    }



    /**
     * 更新
     */

    update() {


        this.updatePoint();


        this.updateList();


    }



    /**
     * ポイント表示
     */

    updatePoint() {


        const area =

            document.getElementById(

                "research-point"

            );



        if (!area) {


            return;


        }



        area.textContent =

            "Research Point : "

            +

            ResearchManager.points;


    }



    /**
     * 研究一覧
     */

    updateList() {


        const area =

            document.getElementById(

                "research-list"

            );



        if (!area) {


            return;


        }



        area.innerHTML = "";



        const data =

            ResearchManager.getAll();



        for (

            const id in data

        ) {


            const item =

                data[id];



            const button =

                document.createElement(

                    "button"

                );



            button.textContent =


                item.name

                +

                " "

                +

                (

                    item.unlocked

                    ?

                    "Unlocked"

                    :

                    "Cost "

                    +

                    item.cost

                );



            button.disabled =

                item.unlocked;



            button.onclick = () => {


                ResearchManager.unlock(

                    id

                );


            };



            area.appendChild(

                button

            );


        }


    }


}



const researchUI =

    new ResearchUI();



export default researchUI;