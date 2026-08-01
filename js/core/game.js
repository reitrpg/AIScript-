update(){


ResourceManager.update();


ResearchManager.addPoint(1);


WorldManager.update();



eventBus.emit(

"game:update"

);


}