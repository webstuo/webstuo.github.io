export default 
`// Anti-circular
window.extend = Object.setPrototypeOf;

// Libs
import wpower from "./libs/wpower/wpower.js";

// Screens and components
import home_js from "./modules/screens/home/home.js";
#IMPORT_SCREENS
#IMPORT_COMS

// Constants
import Phrases from "./modules/phrases.js";

// Main
async function main(){
    const {cvm,lang} = wpower;
    cvm.init();
    lang.set_phrases(Phrases);

    await cvm.dyn_screens({
        home: [home_js,"modules/screens/home"],
        #SCREEN_LIST
    });

    await cvm.dyn_coms({
        #COM_LIST
    });
    cvm.render_screen("home",{});
}
window.onload = main;`;
// EOF