export default 
`import wpower from "./libs/wpower/wpower.js";
const {cvm} = wpower;

// Screens and components
import home_js from "./modules/screens/home/home.js";

// Main
async function main(){
    await cvm.dyn_screens({
        home: [home_js,"modules/screens/home"]
    });
    await cvm.dyn_coms({
        // WEBSTUO UPDATES HERE
    });
    cvm.render_screen("home",{});
}
window.onload = main;`;
// EOF