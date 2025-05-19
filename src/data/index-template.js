export default 
`// ***** CREATED BY WEBSTUO, DONT EDIT *****
// Libs
import wpower from "./libs/wpower/wpower.js";

// Screens and components
import home_js from "./modules/screens/home/home.js";
#IMPORT_SCREENS
#IMPORT_COMS

// Constants
import Phrases from "./modules/phrases.js";

// Check if app is webpacked
function is_webpacked(){
    if (window.onload.toString().indexOf("async function main")==0)
        return false;
    else
        return true;
}

// Main
async function main(){
    const {cvm,lang} = wpower;
    cvm.init();
    lang.set_phrases(Phrases);

    // Import the packed strings if run after packed
    if (is_webpacked()){
        window._Screen_Html["home"] = (await import("./modules/screens/home/home.html")).default.toString();
        window._Screen_Css ["home"] = (await import("./modules/screens/home/home.css")).default.toString();
        #SCREEN_HTMLCSS_LIST
    }
    // Import dynamically
    await cvm.dyn_screens({
        home: [home_js,"modules/screens/home"],
        #SCREEN_LIST
    });

    // Import the packed strings if run after packed
    if (is_webpacked()){
        #COM_HTMLCSS_LIST
    }
    // Import dynamically
    await cvm.dyn_coms({
        #COM_LIST
    });
    cvm.render_screen("home",{});
}
window.onload = main;`;
// EOF