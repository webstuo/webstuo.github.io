import wpower from "../../../../libs/wpower/wpower.js";

// Modules
import utils from "../../../utils.js";

// Data
import controller_template from "../../../../data/controller-template.js";

//
class create_com extends wpower.base_controller{
    //
    constructor(){
        super();
    }

    _____DATA_____(){}

    //
    async create_com(Ev){
        const {cvm,files,base_controller} = wpower;
        ui.close_dialogs();
        var Name = this.$(".com-name").value.trim();
        if (Name.length==0) return;

        // Check format
        if (Name.match(/^[0-9A-Za-z-]+$/)==null){
            ui.alert("Only alphanumeric and dash for component name");
            return;
        }
        if (Name.match(/^[0-9]+/) != null){
            ui.alert("Can't start with digits");
            return;
        }
        Name           = Name.toLowerCase();
        var Class_Name = Name.replaceAll("-","_");

        // Check keyword
        if (utils.JS_KEYWORDS.indexOf(Class_Name) >= 0){
            ui.alert("Can't be the same as JS keywords:<br>"+
                utils.JS_KEYWORDS.toString().replaceAll(",",", ") );
            return;
        }

        // Check if existing
        var Home = cvm.get_screen("home");
        var Dir  = Home.Proj_Dir;
        var Js_File  = await files.dir_file_exists(Dir,`src/modules/coms/${Name}/${Name}.js`);
        var Html_File= await files.dir_file_exists(Dir,`src/modules/coms/${Name}/${Name}.html`);
        var Css_File = await files.dir_file_exists(Dir,`src/modules/coms/${Name}/${Name}.css`);

        if (Js_File==true || Html_File==true || Css_File==true){
            ui.alert("Component files exist, can't create");
            return;
        }

        // Get template
        var Defaulthtml = `${Name}\n<!-- EOF -->`;
        var Defaultcss = `/* EOF */`;
        var [Html,Css] = await utils.choose_template(Defaulthtml, Defaultcss);

        // Create folder and file
        var Js_File  = await files.dir_path2file(Dir,`src/modules/coms/${Name}/${Name}.js`);
        var Html_File= await files.dir_path2file(Dir,`src/modules/coms/${Name}/${Name}.html`);
        var Css_File = await files.dir_path2file(Dir,`src/modules/coms/${Name}/${Name}.css`);

        var Code = controller_template.replaceAll("#NAME",Class_Name);
        await files.write_file(Js_File,Code);
        await files.write_file(Html_File,Html);
        await files.write_file(Css_File,Css);

        // Rerender
        cvm.get_screen("home").open_proj(false);
    }

    //
    cancel(Ev){
        const {cvm,files,base_controller} = wpower;
        ui.close_dialogs();
    }

    _____CORE_____(){}

    //
    init(){
        super.init(this);
    }

    // 
    render(){        
    }

    //
    async load_data(){
    }
}

export default create_com;
// EOF