/**
 * World Creator
 * UI Components
 *
 * UI部品生成管理
 */


import ui from "./UI.js";


class Components {


    /**
     * ボタン生成
     */

    createButton(
        text,
        callback
    ) {


        const button =
            ui.create(
                "button",
                {

                    text

                }
            );


        button.addEventListener(
            "click",
            callback
        );


        return button;

    }



    /**
     * パネル生成
     */

    createPanel(
        id,
        title = ""
    ) {


        const panel =
            ui.create(
                "section",
                {

                    id,

                    class:
                        "panel"

                }
            );


        if (title) {


            const header =
                ui.create(
                    "h2",
                    {

                        text:
                            title

                    }
                );


            panel.appendChild(
                header
            );

        }


        return panel;

    }



    /**
     * テキスト表示
     */

    createText(
        text
    ) {


        return ui.create(
            "span",
            {

                text

            }
        );

    }



    /**
     * 数値表示
     */

    createValue(
        label,
        value
    ) {


        const container =
            ui.create(
                "div",
                {

                    class:
                        "value"

                }
            );


        const name =
            this.createText(
                label + ": "
            );


        const number =
            this.createText(
                value
            );


        container.appendChild(
            name
        );


        container.appendChild(
            number
        );


        return container;

    }



    /**
     * リスト生成
     */

    createList(
        items
    ) {


        const list =
            ui.create(
                "ul"
            );


        items.forEach(
            item => {


                const li =
                    ui.create(
                        "li",
                        {

                            text:
                                item

                        }
                    );


                list.appendChild(
                    li
                );


            }
        );


        return list;

    }



}


const components =
    new Components();


export default components;