/**
 * World Creator
 * Main UI Controller
 *
 * Resource / EP / Converter Display
 */

import ResourceManager from "../resource/Manager.js";
import EPManager from "../ep/Manager.js";
import Converter from "../converter/Converter.js";
import SettingsManager from "../settings/Manager.js";
import eventBus from "../core/eventBus.js";

class UI{

    constructor(){

        this.area=null;

    }

    init(id){

        this.area=document.getElementById(id);

        if(!this.area){
            return;
        }

        this.render();

        eventBus.on("resource:update",()=>this.render());
        eventBus.on("ep:update",()=>this.render());
        eventBus.on("converter:update",()=>this.render());
        eventBus.on("settings:update",()=>this.render());

    }

    render(){

        if(!this.area){
            return;
        }

        let html=`
        <div class="main-status">

            <h2>世界状態</h2>

            <div class="ep-display">
                EP :
                ${this.formatNumber(
                    EPManager.get()
                )}
            </div>

            <h3>資源</h3>
        `;

        const resources=
        ResourceManager.getAll();

        for(const id in resources){

            const data=
            resources[id];

            html+=`
            <div class="resource-row">

                <span>

                ${data.name}

                </span>

                <span>

                ${this.formatNumber(
                    data.amount
                )}

                </span>

            </div>
            `;
        }

        html+=`
        <hr>

        <h3>

        素材変換

        </h3>
        `;

        const recipes=
        Converter.getRecipes();

        for(const id in recipes){

            const recipe=
            recipes[id];

            const can=
            Converter.canConvert(id);

            html+=`

            <div class="recipe">

                ${recipe.resource}

                →

                ${recipe.ep} EP

                <br>

                必要素材 :

                ${recipe.cost}

                <br>

                <button

                    class="convert"

                    data-id="${id}"

                    style="background:${can ? "#55aa55" : "#777"}"

                >

                    変換

                </button>

                <button

                    class="convert-all"

                    data-id="${id}"

                    style="background:${can ? "#4488ff" : "#777"}"

                >

                    全て変換

                </button>

            </div>

            `;
        }

        html+="</div>";

        this.area.innerHTML=html;

        this.bind();

    }

    bind(){

        this.area

        .querySelectorAll(".convert")

        .forEach(button=>{

            button.onclick=()=>{

                Converter.convert(

                    button.dataset.id

                );

            };

        });

        this.area

        .querySelectorAll(".convert-all")

        .forEach(button=>{

            button.onclick=()=>{

                Converter.convertAll(

                    button.dataset.id

                );

            };

        });

    }

    formatNumber(value){

        const format=

        SettingsManager.get(

            "numberFormat"

        );

        const number=

        Number(value)||0;

        if(format==="simple"){

            return this.simpleFormat(number);

        }

        return number.toLocaleString("ja-JP");

    }

    simpleFormat(value){

        const units=[
           