import lib from "./dist/main.js";
var log = console.log;

(async function main(){
    var m = await import("./dist/main.js");
    log("Module",m);
    log("Default",m.default);
})();