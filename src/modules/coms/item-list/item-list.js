// Libs
import wpower from "../../../libs/wpower/wpower.js";
const {ut,ui,cvm,base_controller,files} = wpower;

// Modules
import utils from "../../utils.js";

// Menu
import edit_ctx_menu from "../../menus/edit-ctx-menu.js";
cvm.reg_menu("edit-ctx-menu",edit_ctx_menu);

//
class item_list extends base_controller{
    // 
    constructor(){
        super();
    }

    _____UI_ACTIONS_____(){}

    //
    async edit_js(Ev){
        var Ele  = Ev.target;
        var Type = Ele.attr("type");
        var Name = Ele.attr("name");

        // Load js file
        var Dir = cvm.get_screen("home").Proj_Dir;

        if (Type=="screen"){
            let File = await files.dir_path2file(Dir,`src/modules/screens/${Name}/${Name}.js`);
            var [Handle,Js] = await files.read_file(File);
        }
        else{
            let File = await files.dir_path2file(Dir,`src/modules/coms/${Name}/${Name}.js`);
            var [Handle,Js] = await files.read_file(File);
        }

        // Get methods from abstract syntax tree
        var Methods = utils.get_methods(Js);        

        // Show editor
        var Home = cvm.get_screen("home");
        Home.Cur_Js_Type = Type;
        Home.Cur_Js_File = Name;
        Home.show_js_methods(Methods);
    }

    //
    launch_comvise(Ev){
        window.open("https://comvise.github.io");
    }

    _____CORE_____(){}

    // Init
    init(){
        super.init(this);
        touch(this.Data,"Proj_Name");
        touch(this.Data,"Screens",[]);
        touch(this.Data,"Components",[]);
    }

    // 
    render(){
    }

    //
    async load_data(){
    }
}

export default item_list;
// EOF