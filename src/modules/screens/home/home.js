// Libs
import wpower from "../../../libs/wpower/wpower.js";

// Data
import index_template_js from "../../../data/index-template.js";
import Phrases           from "../../../data/phrases-template.js";

function _____CLASS_____(){}

// Home screen
class home extends wpower.base_controller{
    Wpowerjs  = "";
    Wpowercss = "";
    Indexjs   = "";
    Indexhtml = "";
    Indexcss  = "";
    Run_Cmd   = "cd src; python -m http.server 1234";
    Proj_Dir;
    Screen_Dirs = [];
    Com_Dirs    = [];
    Termi       = null;

    Js_Editor     = null;
    Cur_Special   = null; // "index.css", or other values
    Cur_Js_Type   = null;
    Cur_Js_File   = null;
    Cur_Js_Method = null;    

    // Ctor
    constructor(){
        super();
    }

    // Util
    static id(Str){ 
        return Str.replaceAll("-","_"); 
    }

    _____BUILD_____(){}

    // Add items to dyn_screens, and dyn_coms
    async add_dyn_items(Html){
        const {base_controller,files,ui,cvm,net} = wpower;
        // Get screen dirs
        var Dir         = this.Proj_Dir;
        var Tmpdir      = await files.dir_path2dir(Dir,"src/modules/screens");
        var Screen_Dirs = await files.dir_get_subdirs(Tmpdir);
        var Scr_Names   = Screen_Dirs.map(X=>X.name);

        // Get component dirs
        var Tmpdir    = await files.dir_path2dir(Dir,"src/modules/coms");
        var Com_Dirs  = await files.dir_get_subdirs(Tmpdir);
        var Com_Names = Com_Dirs.map(X=>X.name);

        // Imports of screen
        Scr_Names = Scr_Names.filter(X=>X!="home");
        var Code  = "";
        function id(Str){ return Str.replaceAll("-","_"); }

        for (let Name of Scr_Names)
            Code += `import ${id(Name)} from "./modules/screens/${Name}/${Name}.js";\n`;

        Html = Html.replace("#IMPORT_SCREENS",Code);

        // Imports of components
        var Code = "";

        for (let Name of Com_Names)
            Code += `import ${id(Name)} from "./modules/coms/${Name}/${Name}.js";\n`;

        Html = Html.replace("#IMPORT_COMS",Code.trim());

        // Dyn load of screens
        var Indent;
        var Code = "";

        for (let i=0; i<Scr_Names.length; i++){
            if (i>0) Indent = "\x20".repeat(8);
            else     Indent = "";

            let Name = Scr_Names[i];
            Code += `${Indent}"${Name}": [${id(Name)},"modules/screens/${Name}"],\n`;
        }
        
        if (Code.length>0)
            Html = Html.replace("#SCREEN_LIST", Code);
        else
            Html = Html.replace("#SCREEN_LIST", "// More here");

        // Dyn load of screens        
        var Code = "";
        var Indent;

        for (let i=0; i<Com_Names.length; i++){
            if (i>0) Indent = "\x20".repeat(8);
            else     Indent = "";

            let Name = Com_Names[i];
            Code += `${Indent}"${Name}": [${id(Name)},"modules/coms/${Name}"],\n`;
        }

        if (Code.trim().length>0)
            Html = Html.replace("#COM_LIST", Code.trim());
        else
            Html = Html.replace("#COM_LIST", "// More here");

        // After modifying
        return Html;
    }

    // Write base code to project
    // NOTICE: Most of conditions are 'true', to write latest code base
    async check_and_write_core(Dir){
        const {base_controller,files,ui,cvm,net} = wpower;
        // Project marker file
        var F = await files.dir_path2file(Dir,"webstuo.json"); // JSON
        await files.write_file(F,"{}");

        // Wpower
        var Wpowerjs_File = await files.dir_file_exists(Dir,"src/libs/wpower/wpower.js");
        var Wpowercss_File= await files.dir_file_exists(Dir,"src/libs/wpower/wpower.css");

        if (true || !Wpowerjs_File){
            Wpowerjs_File = await files.dir_path2file(Dir,"src/libs/wpower/wpower.js");
            await files.write_file(Wpowerjs_File,this.Wpowerjs);
        }
        if (true || !Wpowercss_File){
            Wpowercss_File = await files.dir_path2file(Dir,"src/libs/wpower/wpower.css");
            await files.write_file(Wpowercss_File,this.Wpowercss);
        }

        // Main files
        var File_Js  = await files.dir_file_exists(Dir,"src/index.js");
        var File_Html= await files.dir_file_exists(Dir,"src/index.html");
        var File_Css = await files.dir_file_exists(Dir,"src/index.css");

        if (true || !File_Js){
            File_Js = await files.dir_path2file(Dir,"src/index.js");
            await files.write_file(File_Js,await this.add_dyn_items(this.Indexjs));
        }

        // Folders (touch to make them exist)        
        await files.dir_path2file(Dir, "src/img/.gitkeep");
        await files.dir_path2file(Dir, "src/modules/menus/.gitkeep");

        // ⚠️Do not overwrite index.html and index.css (to change by studio user)
        if (!File_Html){
            File_Html = await files.dir_path2file(Dir,"src/index.html");
            await files.write_file(File_Html,this.Indexhtml);
        }
        if (!File_Css){
            File_Css = await files.dir_path2file(Dir,"src/index.css");
            await files.write_file(File_Css,this.Indexcss);
        }

        // Data files
        // ⚠️Do not overwrite (to change by studio user)
        if (!(await files.dir_file_exists(Dir,"src/img/icon.png"))) {
            var Iconpng = await (await fetch("data/app-icon-default.png")).blob();
            var Iconfile= await files.dir_path2file(Dir,"src/img/icon.png");
            await files.write_file(Iconfile, Iconpng);
        }

        // ⚠️Do not overwrite this file, edited by dev using Webstuo
        var Phrases_Js = await files.dir_file_exists(Dir,"src/modules/phrases.js");

        if (!Phrases_Js){
            Phrases_Js = await files.dir_path2file(Dir,"src/modules/phrases.js");
            await files.write_file(Phrases_Js,Phrases);
        }

        // Run files
        var File_Sh  = await files.dir_file_exists(Dir,"run.sh");
        var File_Ps1 = await files.dir_file_exists(Dir,"run.ps1");
        var File_Cmd = await files.dir_file_exists(Dir,"run.cmd");

        if (true || !File_Sh){
            File_Sh = await files.dir_path2file(Dir,"run.sh");
            await files.write_file(File_Sh,this.Run_Cmd+"\n");
        }
        if (true || !File_Ps1){
            File_Ps1 = await files.dir_path2file(Dir,"run.ps1");
            await files.write_file(File_Ps1,this.Run_Cmd+"\n");
        }
        if (true || !File_Cmd){
            File_Cmd = await files.dir_path2file(Dir,"run.cmd");
            await files.write_file(File_Cmd,this.Run_Cmd+"\n");
        }
    }

    _____UI_ACTIONS_____(){}
    _____Top_Ui_____(){}

    // Open proj
    async open_proj(open=true){
        const {base_controller,files,ui,cvm,net} = wpower;
        if (open){
            await ui.alert(`Choose existing Webstuo project folder or 
                create new empty folder in the next dialog.`);
            var Dir = await files.pick_dir();
            this.Proj_Dir = Dir;
        }
        else
            var Dir = this.Proj_Dir;

        ui.notif("Loading project");

        // Check if folder is alright
        var Items      = await files.dir_get_items(Dir);
        var cfg_exists = await files.dir_file_exists(Dir,"webstuo.json");

        if (Items.length>0 && cfg_exists==false){
            ui.alert("Error: The folder is not empty and it is not Webstuo project folder");
            return;
        }
        // Ensure being Webstuo proj dir
        await files.dir_file_touch(Dir,"webstuo.json");

        // Get screen dirs
        var Tmpdir       = await files.dir_path2dir(Dir,"src/modules/screens");
        this.Screen_Dirs = await files.dir_get_subdirs(Tmpdir);

        // Get component dirs
        var Tmpdir    = await files.dir_path2dir(Dir,"src/modules/coms");
        this.Com_Dirs = await files.dir_get_subdirs(Tmpdir);

        // Make screen & com data
        var Screens    = [];
        var Components = [];

        for (let S of this.Screen_Dirs)
            Screens.push({ Name:S.name });
        for (let C of this.Com_Dirs)
            Components.push({ Name:C.name });

        // UI
        Screens.sort((A,B)=>{
            if (A.Name < B.Name) return -1;
            if (A.Name > B.Name) return 1;
            return 0;
        });
        Components.sort((A,B)=>{
            if (A.Name < B.Name) return -1;
            if (A.Name > B.Name) return 1;
            return 0;
        });

        cvm.get_last_com("item-list").rerender({
            Proj_Name:Dir.name, Screens, Components
        });
        ui.notif("Project loaded");
        d$("#Proj-Name").innerHTML = Dir.name;
    }

    // Build app
    async build_app(Ev){
        const {base_controller,files,ui,cvm,net} = wpower;

        if (this.Proj_Dir==null){
            ui.alert("Please load project first");
            return;
        }
        // Deprecated: Studio user to edit index.html
        /* var Name = await ui.prompt("Enter app name:",sessionStorage.App_Name);
        if (Name==null || Name.trim().length==0) return;
        Name = Name.replaceAll("<","&lt;").replaceAll(">","&gt;");
        sessionStorage.App_Name = Name; */

        ui.notif("Writing to project dir...","blue");
        await this.check_and_write_core(this.Proj_Dir);
        ui.alert("Core files written to project folder");
    }

    // Run app (info only)
    run_app(Ev){
        const {ui} = wpower;
        ui.alert(`Open shell <b>in project folder</b> and run either of run.sh, run.ps1, or run.cmd.<br> 
            To view the app, point browser to 
            <a target="_blank" href="http://localhost:1234">http://localhost:1234</a><br>
            Remember to install Python first.`);
    }

    _____Js_Man_____(){}

    // Get js file
    async get_jsfile_code(){
        const {base_controller,files,ui,cvm,net} = wpower;
        var Filejs = await utils.get_jsfile_code(this.Cur_Js_Type, this.Cur_Js_File);
        return Filejs;
    }

    // Get index.html code
    async get_indexhtml_code(){
        const {base_controller,files,ui,cvm,net} = wpower;
        var File    = await files.dir_path2file(this.Proj_Dir, "src/index.html");
        var [_,Html]= await files.read_file(File);
        return Html;
    }

    // Get index.css code
    async get_indexcss_code(){
        const {base_controller,files,ui,cvm,net} = wpower;
        var File    = await files.dir_path2file(this.Proj_Dir, "src/index.css");
        var [_,Css] = await files.read_file(File);
        return Css;
    }

    // Add new method to js file
    async add_new_method(){
        const {base_controller,files,ui,cvm,net} = wpower;
        // No file loaded
        if (this.Cur_Js_File == null){
            ui.alert("No file loaded yet, click Edit JS in centre column");
            return;
        }

        // Input
        var Name = await ui.prompt("Enter new method name:");
        if (Name==null || Name.trim().length==0) return;

        if (Name.match(/^[0-9A-Za-z_]+$/) == null){
            ui.alert("Alphanumeric and lowdashes only");
            return;
        }

        // Check if existing
        var Js      = await this.get_jsfile_code();
        var Methods = utils.get_methods(Js);

        if (Methods.indexOf(Name)>=0){
            ui.alert("Method is existing");
            return;
        }
        var Reserveds = ["constructor", "$", "$$", "remove_self", "init", 
                         "render", "rerender", "load_data"];

        if (Reserveds.indexOf(Name)>=0){
            ui.alert("Can't use these names: "+Reserveds.toString());
            return;
        }

        // Create new node
        var Code    = `class _ { ${Name}(){} }`;
        var Temp    = utils.parse_js(Code);
        var Newnode = Temp.body[0].body.body[0];

        // Find the class in existing code and add to
        var Ast   = utils.parse_js(Js);
        var Class = null;

        for (let Item of Ast.body)
            if (Item.type == "ClassDeclaration"){
                Class = Item;
                break;
            }

        Class.body.body.push(Newnode);
        var Newjs = utils.ast_node_to_js(Ast);
        
        // Save
        utils.write_jsfile_code(this.Cur_Js_Type,this.Cur_Js_File,Newjs);
        ui.notif("Save successfully","green");

        // Reload ui
        this.show_js_methods([...Methods, Name]);
    }

    // Del method
    async del_method(Methodname){
        const {base_controller,files,ui,cvm,net} = wpower;
        var Confirm = await ui.confirm(`Sure to delete method '<b>${Methodname}</b>'?`);
        if (Confirm!="yes") return;

        // No file loaded
        if (this.Cur_Js_File == null){
            ui.alert("No file loaded yet, click Edit JS in centre column");
            return;
        }
        var Name = Methodname;

        // Check if existing
        var Js      = await this.get_jsfile_code();
        var Methods = utils.get_methods(Js);

        if (Methods.indexOf(Name)==-1){
            ui.alert("Method doesn't exist");
            return;
        }

        // Find the class in existing code and look for method inside
        var Ast    = utils.parse_js(Js);
        var Class  = null;
        var met_idx=null;

        for (let Item of Ast.body)
            if (Item.type == "ClassDeclaration"){
                Class = Item;
                break;
            }

        for (let i=0; i<Class.body.body.length; i++)
            if (Class.body.body[i].key.name == Name){
                met_idx = i;
                break;
            }

        // Del and reparse
        Class.body.body.splice(met_idx,1);
        var Newjs = utils.ast_node_to_js(Ast);
        
        // Save
        utils.write_jsfile_code(this.Cur_Js_Type,this.Cur_Js_File,Newjs);
        ui.notif("Save successfully","green");

        // Reload ui
        Methods = Methods.filter(X => X!=Name);
        this.show_js_methods(Methods);
    }

    _____Editor_Uis_____(){}

    // Save to file
    async save_to_file(Ev){
        const {base_controller,files,ui,cvm,net} = wpower;

        if (this.Cur_Special=="index.html"){
            var Html = this.Js_Editor.getValue();
            var File = await files.dir_path2file(this.Proj_Dir, "src/index.html");
            await files.write_file(File,Html);
            ui.notif("Global index.html written","green");
            return;
        }
        if (this.Cur_Special=="index.css"){
            var Css  = this.Js_Editor.getValue();
            var File = await files.dir_path2file(this.Proj_Dir, "src/index.css");
            await files.write_file(File,Css);
            ui.notif("Global index.css written","green");
            return;
        }
        if (this.Cur_Special!=null && this.Cur_Special.indexOf("src/")==0){
            var Value= this.Js_Editor.getValue();
            var File = await files.dir_path2file(this.Proj_Dir, this.Cur_Special);
            await files.write_file(File,Value);
            ui.notif("Written to "+this.Cur_Special);
            return;
        }

        // Normal JS blocks
        try{
            if (this.Cur_Js_Method=="---staticblock---"){
                var Filejs   = await utils.get_jsfile_code(this.Cur_Js_Type, this.Cur_Js_File);
                var Staticjs = this.Js_Editor.getValue();

                // New AST node
                var Progstatic = utils.parse_js( Staticjs );
                var Newnodes   = Progstatic.body;

                // Check validity
                var Prog = utils.parse_js( Filejs );

                if (!utils.has_class_declared(Prog)){
                    ui.alert("Can't find class in file");
                    return;
                }

                // Count number of identifiers to remove at file head
                var count = 0;

                for (let Item of Prog.body)
                    if (Item.type != "ClassDeclaration")
                        count++;
                    else
                        break;

                // Replace static block
                for (let i=0; i<Newnodes.length; i++){
                    Newnodes[i].trailingComments = null;
                }
                Prog.body.splice(0,count, ...Newnodes);

                // Gen js
                var Newfilejs = utils.ast_node_to_js(Prog);
                
                // Write to file
                utils.write_jsfile_code(this.Cur_Js_Type,this.Cur_Js_File,Newfilejs);
                ui.notif("Save successfully","green");
            }
            else
            if (this.Cur_Js_Method=="---propsblock---"){
                var Filejs  = await utils.get_jsfile_code(this.Cur_Js_Type, this.Cur_Js_File);
                var Propsjs = this.Js_Editor.getValue();

                // New AST node
                var Progprops = utils.parse_js(`class _ { ${Propsjs} \n}`);
                var Newnodes  = Progprops.body[0].body.body;

                // Find class
                var Prog  = utils.parse_js( Filejs );
                var Class = null;

                for (let Item of Prog.body)
                    if (Item.type=="ClassDeclaration"){
                        Class = Item;
                        break;
                    }

                // Count number of identifiers to remove after 'class' and
                // before the first method (inc ctor)
                var count = 0;

                for (let Item of Class.body.body)
                    if (Item.type != "ClassMethod")
                        count++;
                    else
                        break;

                // Replace static block
                for (let i=0; i<Newnodes.length; i++){
                    Newnodes[i].trailingComments = null;
                }
                Class.body.body.splice(0,count, ...Newnodes);

                // Gen js
                var Newfilejs = utils.ast_node_to_js(Prog);
                
                // Write to file
                utils.write_jsfile_code(this.Cur_Js_Type,this.Cur_Js_File,Newfilejs);
                ui.notif("Save successfully","green");
            }
            else{
                var Filejs   = await utils.get_jsfile_code(this.Cur_Js_Type, this.Cur_Js_File);
                var Methodjs = this.Js_Editor.getValue();

                // New AST node
                var Newnode = utils.parse_js(
                    "class _ extends base_controller{" + Methodjs + "\n}"
                );
                Newnode = Newnode.body[0].body.body[0];

                // Something wrong edited in editor
                // must be only 1 method in CodeMirror editor
                if (Newnode.key.name != this.Cur_Js_Method){
                    ui.alert("Can't save, only 1 method allowed in editor, and only comments above");
                    return;
                }

                // Replace node
                var Newfilejs = utils.replace_method(Filejs,Newnode);

                if (Newfilejs==null){
                    ui.alert("Failed to place the method back to file");
                    return;
                }
                
                // Write to file
                utils.write_jsfile_code(this.Cur_Js_Type,this.Cur_Js_File,Newfilejs);
                ui.notif("Save successfully","green");
            }
        }
        catch(Err){
            ui.alert(Err);
            return;
        }
    }

    _____Other_Uis_____(){}

    // Get a name
    async prompt_for_dashed_name(){
        const {base_controller,files,ui,cvm,net} = wpower;
        var Name = await ui.prompt("Enter a name:");
        if (Name==null || Name.trim().length==0) return null;
        Name = Name.trim();

        if (Name.match(/^[0-9a-z-]+$/) == null){
            ui.alert("Invalid name, lower-case alphabetic and dash only");
            return null;
        }
        if (Name.match(/^[0-9]+/) != null){
            ui.alert("Can't start with digits");
            return null;
        }
        return Name;
    }

    // Edit static block
    async edit_staticblock(){
        const {base_controller,files,ui,cvm,net} = wpower;
        var Fulljs = await utils.get_jsfile_code(this.Cur_Js_Type,this.Cur_Js_File);
        var Code   = utils.get_staticblock_code(Fulljs);
        if (Code==null) return;

        this.Cur_Js_Method = "---staticblock---";
        this.Cur_Special   = null; // Normal js
        this.show_js_edit(Code);        
    }

    // Edit properties block
    async edit_propsblock(){
        const {base_controller,files,ui,cvm,net} = wpower;
        var Fulljs = await utils.get_jsfile_code(this.Cur_Js_Type,this.Cur_Js_File);
        var Code   = utils.get_propsblock_code(Fulljs);
        if (Code==null) return;

        this.Cur_Js_Method = "---propsblock---";
        this.Cur_Special   = null; // Normal js
        this.show_js_edit(Code);        
    }

    // Edit a method
    async edit_method(Methodname){
        const {base_controller,files,ui,cvm,net} = wpower;
        var Fulljs = await utils.get_jsfile_code(this.Cur_Js_Type,this.Cur_Js_File);
        var Code   = utils.get_method_code(Fulljs,Methodname);
        if (Code==null) return;

        this.Cur_Js_Method = Methodname;
        this.Cur_Special   = null; // Normal js
        this.show_js_edit(Code);        
    }

    // Edit index.html
    async edit_global_html(){
        const {base_controller,files,ui,cvm,net} = wpower;
        var Fullhtml = await this.get_indexhtml_code();
        this.Cur_Special = "index.html";
        this.show_special_edit(Fullhtml);        
    }

    // Edit index.css
    async edit_global_css(){
        const {base_controller,files,ui,cvm,net} = wpower;
        var Fullcss = await this.get_indexcss_code();
        this.Cur_Special = "index.css";
        this.show_special_edit(Fullcss);        
    }

    // Add new module under /modules
    async add_module(){
        const {base_controller,files,ui,cvm,net} = wpower;
        var Name = await this.prompt_for_dashed_name();
        if (Name==null) return;

        var Dir  = this.Proj_Dir;
        const id = thisclass.id;

        // Check module existence
        var Path = `src/modules/${Name}.js`;

        if (await files.dir_file_exists(Dir, Path)){
            ui.alert("Module of such name is existing");
            return;
        }

        // Write new module
        var Code = 
        `class ${id(Name)} {\n}\n\n`+
        `const thisclass = ${id(Name)};\n`+
        `export default thisclass;\n`;

        var File = await files.dir_path2file(Dir, Path);
        await files.write_file(File,Code);
        ui.alert(`Added module '${Name}'`);
    }

    // Edit a .js file under /modules
    async edit_module(){
        const {base_controller,files,ui,cvm,net} = wpower;
        // Get module list
        var Dir   = this.Proj_Dir;
        Dir       = await files.dir_path2dir(Dir,"src/modules");
        var Files = (await files.dir_get_files(Dir)).map(X=>X.name);
        
        if (Files.length==0){
            ui.alert("No modules to edit, add first");
            return;
        }
        Files.sort();

        // Select
        var Obj = {};

        for (let Name of Files) 
            if (Name.match(/\.js$/)!=null) Obj[Name]=Name;

        var Choice = await ui.select("Choose a module to edit:",Obj);
        if (Choice==null) return;

        // Show editor
        var File     = await files.dir_path2file(Dir, Choice);
        var [_,Code] = await files.read_file(File);
        this.Cur_Special = "src/modules/"+Choice;
        this.show_special_edit(Code);        
    }

    // Add new menu file
    async add_menu(){        
        const {base_controller,files,ui,cvm,net} = wpower;
        var Name = await this.prompt_for_dashed_name();
        if (Name==null) return;

        var Dir  = this.Proj_Dir;
        const id = thisclass.id;

        // Check menu existence
        var Path = `src/modules/menus/${Name}.js`;

        if (await files.dir_file_exists(Dir, Path)){
            ui.alert("Menu of such name is existing");
            return;
        }

        // Write new module
        var Code = 
        `export default [\n`+
        `    ["🅰️Item A","method_a"],\n`+
        `    ["🅱️Item B","method_b"]\n`+
        `];`;

        var File = await files.dir_path2file(Dir, Path);
        await files.write_file(File,Code);
        ui.alert(`Added menu '${Name}'`);
    }

    // Edit menu file
    async edit_menu(){
        const {base_controller,files,ui,cvm,net} = wpower;
        // Get menu list
        var Dir   = this.Proj_Dir;
        Dir       = await files.dir_path2dir(Dir,"src/modules/menus");
        var Files = (await files.dir_get_files(Dir)).map(X=>X.name);
        
        if (Files.length==0){
            ui.alert("No menus to edit, add first");
            return;
        }
        Files.sort();

        // Select
        var Obj = {};

        for (let Name of Files) 
            if (Name.match(/\.js$/)!=null) Obj[Name]=Name;

        var Choice = await ui.select("Choose a menu to edit:",Obj);
        if (Choice==null) return;

        // Show editor
        var File         = await files.dir_path2file(Dir, Choice);
        var [_,Code]     = await files.read_file(File);
        this.Cur_Special = "src/modules/menus/"+Choice;
        this.show_special_edit(Code);        
    }

    // Show js of a method to edit
    show_js_methods(Methodnames){
        const {base_controller,files,ui,cvm,net} = wpower;
        cvm.get_last_com("method-list").rerender({
            Methods: Methodnames
        });
    }

    // Show js edit
    show_js_edit(Code){
        const {base_controller,files,ui,cvm,net} = wpower;
        // Remove tailing comments
        var Lines     = Code.trim().split("\n");
        var n         = Lines.length;
        var rem_count = 0;

        for (let i=n-1; i>=0; i--)
            if (Lines[i].trim().indexOf("//")==0 || Lines[i].trim().indexOf("/*")==0)
                rem_count++;
            else
                break;

        Code = Lines.slice(0,n-rem_count).join("\n");

        // Show
        d$("#Js-File-Name").innerHTML = this.Cur_Js_Type+": "+this.Cur_Js_File;
        d$("#Js-Edit-Wrap").removeAttribute("hidden");
        this.Js_Editor.setValue(Code);        
    }

    // Show css edit
    show_special_edit(Anycode){
        const {base_controller,files,ui,cvm,net} = wpower;
        // Show
        d$("#Js-File-Name").innerHTML = this.Cur_Special;
        d$("#Js-Edit-Wrap").removeAttribute("hidden");
        this.Js_Editor.setValue(Anycode);        
    }

    // Hide js edit
    hide_js_edit(Ev){
        d$("#Js-Edit-Wrap").attr("hidden","true");
    }

    _____CORE_____(){}

    // Init
    init(){
        super.init(this);
    }

    // Render
    render(){
        const {base_controller,files,ui,cvm,net} = wpower;
        // JS editor
        this.Js_Editor = CodeMirror.fromTextArea(d$("#Js-Edit"),{
            lineNumbers:true, mode:"javascript", indentUnit:4, tabSize:4,
            indentWithTabs:false, lineWrapping:true, gutter:true
        });

        // Indent wrapped lines: 
        // view-source:codemirror.net/5/demo/indentwrap.html
        var charWidth = this.Js_Editor.defaultCharWidth(), basePadding = 4;
        this.Js_Editor.on("renderLine", function(cm, line, elt) {
            var off = CodeMirror.countColumn(line.text, null, cm.getOption("tabSize")) * charWidth;
            elt.style.textIndent = "-" + off + "px";
            elt.style.paddingLeft = (basePadding + off) + "px";
        });
        this.Js_Editor.refresh();
        window.Cm_Editor = this.Js_Editor;

        // Terminal
        var Term = new Terminal({theme: {
            background:'#eee', foreground:"black"
        }});
        this.Termi = Term;

        Term.open(d$("#Term-Box"));
        Term.write("Terminal for managing servers...");
        Term.onKey(Ev=> {
            const Key = Ev.key;  
            
            if (Key === '\r') { // Enter key
                Term.write('\r\n'); // New line
            } 
            else 
            if (Key === '\u007F') { // Backspace key
                Term.write('\b\x20\b'); // Erase last character
            } 
            else {
                Term.write(Key); // Display typed character
            }
        });
    }

    // Load data
    async load_data(){
        const {net} = wpower;
        // For adding to apps
        this.Wpowerjs  = await net.get("libs/wpower/wpower.js","text/plain");
        this.Wpowercss = await net.get("libs/wpower/wpower.css","text/plain");

        this.Indexjs   = index_template_js;
        this.Indexhtml = await net.get("data/index-template.html","text/plain");
        this.Indexcss  = await net.get("data/index-template.css","text/plain");
    }
}

const thisclass = home;
export default home;
// EOF