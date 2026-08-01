const CACHE_NAME =
"world-creator-v1";


const CACHE_FILES = [

"./",

"./index.html",

"./css/style.css",

"./css/mobile.css",

"./manifest.json",

"./js/core/main.js",

"./js/core/game.js",

"./js/core/time.js",

"./js/core/save.js",

"./js/core/eventBus.js",

"./js/number/BigNumber.js",

"./js/resource/Resource.js",

"./js/resource/Manager.js",

"./js/resource/Converter.js",

"./js/world/Manager.js",

"./js/research/Manager.js",

"./js/ui/UI.js",

"./js/ui/Research.js",

"./js/ui/Tabs.js",

"./js/ui/Router.js"

];



self.addEventListener(
"install",
event=>{

event.waitUntil(

caches.open(
CACHE_NAME
)
.then(
cache=>
cache.addAll(
CACHE_FILES
)
)

);

}
);



self.addEventListener(
"activate",
event=>{

event.waitUntil(

caches.keys()
.then(
keys=>

Promise.all(

keys.map(

key=>{

if(
key!==CACHE_NAME
){

return caches.delete(
key
);

}

}

)

)

)

);

}
);



self.addEventListener(
"fetch",
event=>{

event.respondWith(

caches.match(
event.request
)
.then(

response=>

response ||

fetch(
event.request
)

)

);

}
);