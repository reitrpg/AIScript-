/**
 * World Creator
 * World Save Compatibility
 *
 * Age Removal Migration
 */


load(data){


    if(!data){

        return;

    }



    // 旧Ageデータ除外

    if(data.Age){

        delete data.Age;

    }



    this.current={


        name:

        data.name

        ??

        "Unknown World",



        rarity:

        data.rarity

        ??

        "Normal",



        rarityMultiplier:

        data.rarityMultiplier

        ??

        1,



        level:

        data.level

        ??

        1,



        exp:

        data.exp

        ??

        0,



        rebirthCount:

        data.rebirthCount

        ??

        0,



        rebirthMultiplier:

        data.rebirthMultiplier

        ??

        1,



        resources:

        data.resources

        ??

        {},



        effects:

        data.effects

        ??

        []



    };



    eventBus.emit(

        "world:update",

        this.current

    );


}



toJSON(){


    if(!this.current){

        return null;

    }



    return {


        name:

        this.current.name,



        rarity:

        this.current.rarity,



        rarityMultiplier:

        this.current.rarityMultiplier,



        level:

        this.current.level,



        exp:

        this.current.exp,



        rebirthCount:

        this.current.rebirthCount,



        rebirthMultiplier:

        this.current.rebirthMultiplier,



        resources:

        this.current.resources,



        effects:

        this.current.effects



    };


}