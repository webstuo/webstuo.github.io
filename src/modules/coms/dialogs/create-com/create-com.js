import wpower from "../../../../libs/wpower/wpower.js";
const {cvm,files,base_controller} = wpower;

// Data
import controller_template from "../../../../data/controller-template.js";

//
class create_com extends base_controller{
    //
    constructor(){
        super();
    }

    _____DATA_____(){}

    //
    async create_com(Ev){
        ui.close_dialogs();
        var Name = this.$(".com-name").value.trim();
        if (Name.length==0) return;

        // Check format
        if (Name.match(/^[0-9A-Za-z-]+$/)==null){
            ui.alert("Only alphanumeric and dash for component name");
            return;
        }
        Name           = Name.toLowerCase();
        var Class_Name = Name.replaceAll("-","_");

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

        // Create folder and file
        var Js_File  = await files.dir_path2file(Dir,`src/modules/coms/${Name}/${Name}.js`);
        var Html_File= await files.dir_path2file(Dir,`src/modules/coms/${Name}/${Name}.html`);
        var Css_File = await files.dir_path2file(Dir,`src/modules/coms/${Name}/${Name}.css`);

        var Code = controller_template.replaceAll("#NAME",Class_Name);
        await files.write_file(Js_File,Code);
        await files.write_file(Html_File,`${Name}\n<!-- EOF -->`);
        await files.write_file(Css_File,`/* EOF */`);

        // Rerender
        cvm.get_screen("home").open_proj(false);
    }

    //
    cancel(Ev){
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