// Libs
import wpower from "../../../libs/wpower/wpower.js";

// Modules
import utils from "../../utils.js";

// Menu
import edit_ctx_menu from "../../menus/edit-ctx-menu.js";
import edit_module_menu from "../../menus/edit-module-menu.js";
import edit_menu_menu from "../../menus/edit-menu-menu.js";

// Class
class item_list extends wpower.base_controller{

    // Ctor
    constructor(){
        super();
    }

    _____UI_ACTIONS_____(){}

    // Info
    add_resource(Ev){
        ui.alert(`Open project dir → src to add resources, 
            app root dir is at src without root slash`);
    }

    // Edit index.html
    edit_global_html(Ev){
        const {ut,ui,cvm,base_controller,files} = wpower;
        cvm.get_screen("home").edit_global_html();
    }

    // Edit index.css
    edit_global_css(Ev){
        const {ut,ui,cvm,base_controller,files} = wpower;
        cvm.get_screen("home").edit_global_css();
    }

    // Add new .js file under /modules
    add_module(){
        const {ut,ui,cvm,base_controller,files} = wpower;
        cvm.get_screen("home").add_module();
    }

    // Edit a .js file in /modules
    edit_module(Ev){
        const {ut,ui,cvm,base_controller,files} = wpower;
        cvm.get_screen("home").edit_module();
    }

    // Delete module
    del_module(Ev){        
        ui.alert("Go to project dir → src/modules to remove");
    }

    // Add new menu to app
    add_menu(){
        const {ut,ui,cvm,base_controller,files} = wpower;
        cvm.get_screen("home").add_menu();
    }

    // Edit a menu in app
    edit_menu(Ev){
        const {ut,ui,cvm,base_controller,files} = wpower;
        cvm.get_screen("home").edit_menu();
    }

    // Del a menu
    del_menu(Ev){
        ui.alert("Go to project dir → src/modules/menus to remove");
    }

    // Edit js methods
    async edit_js(Ev){
        const {ut,ui,cvm,base_controller,files} = wpower;
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

    // Open WYSIWYG editor
    launch_comvise(Ev){
        window.open("https://comvise.github.io");
    }

    _____CORE_____(){}

    // Init
    init(){
        const {cvm} = wpower;
        super.init(this);
        cvm.reg_menu("edit-ctx-menu",edit_ctx_menu);
        cvm.reg_menu("edit-module-menu",edit_module_menu);
        cvm.reg_menu("edit-menu-menu",edit_menu_menu);

        touch(this.Data,"Proj_Name");
        touch(this.Data,"Screens",[]);
        touch(this.Data,"Components",[]);
    }

    // Render
    render(){
    }

    // More data
    async load_data(){
    }
}

export default item_list;
// EOF