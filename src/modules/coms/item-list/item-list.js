import wpower from "../../../libs/wpower/wpower.js";
const {ui,cvm,base_controller,files} = wpower;

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
    async edit_a_js_method(Ev){
        var Method = await ui.select("Choose a method to edit",{
            ctor: "constructor",
            init: "init",
            render: "render",
            load_data: "load_data",
            method1: "method1",
            method2: "method2"
        });
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