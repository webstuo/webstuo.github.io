import wpower from "../../../libs/wpower/wpower.js";
const {base_controller,files,ui,cvm,net} = wpower;

// Data
import index_template_js from "../../../data/index-template.js";

//
class home extends base_controller{
    Wpowerjs = "";
    Wpowercss = "";
    Indexjs = "";
    Indexhtml = "";
    Indexcss = "";
    Run_Cmd = "cd src; python -m http.server 1234";
    Proj_Dir;
    Screen_Dirs = [];
    Com_Dirs = [];
    Termi = null;

    // Ctor
    constructor(){
        super();
    }

    _____BUILD_____(){}

    // Add items to dyn_screens, and dyn_coms
    async add_dyn_items(Html){
        // Get screen dirs
        var Dir = this.Proj_Dir;
        var Tmpdir = await files.dir_path2dir(Dir,"src/modules/screens");
        var Screen_Dirs = await files.dir_get_subdirs(Tmpdir);
        var Scr_Names = Screen_Dirs.map(X=>X.name);

        // Get component dirs
        var Tmpdir = await files.dir_path2dir(Dir,"src/modules/coms");
        var Com_Dirs = await files.dir_get_subdirs(Tmpdir);
        var Com_Names = Com_Dirs.map(X=>X.name);

        // Imports of screen
        Scr_Names = Scr_Names.filter(X=>X!="home");
        var Code = "";
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
        var Indent = "\x20".repeat(8);
        var Code = "";

        for (let Name of Scr_Names)
            Code += `${Indent}${id(Name)}: [${id(Name)},"modules/screens/${Name}"],\n`;
        
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
            Code += `${Indent}${id(Name)}: [${id(Name)},"modules/coms/${Name}"],\n`;
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
        if (true || !File_Html){
            File_Html = await files.dir_path2file(Dir,"src/index.html");
            await files.write_file(File_Html,this.Indexhtml);
        }
        if (true || !File_Css){
            File_Css = await files.dir_path2file(Dir,"src/index.css");
            await files.write_file(File_Css,this.Indexcss);
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

    // Open proj
    async open_proj(open=true){
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
        var Tmpdir = await files.dir_path2dir(Dir,"src/modules/screens");
        this.Screen_Dirs = await files.dir_get_subdirs(Tmpdir);

        // Get component dirs
        var Tmpdir = await files.dir_path2dir(Dir,"src/modules/coms");
        this.Com_Dirs = await files.dir_get_subdirs(Tmpdir);

        // Make screen & com data
        var Screens = [];
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
    }

    // Build app
    async build_app(Ev){
        if (this.Proj_Dir==null){
            ui.alert("Please load project first");
            return;
        }
        ui.notif("Writing to project dir...","blue");
        await this.check_and_write_core(this.Proj_Dir);
        ui.alert("Core files written to project folder");
    }

    //
    run_app(Ev){
        ui.alert(`Open shell <b>in project folder</b> and run either of run.sh, run.ps1, or run.cmd.<br> 
            To view the app, point browser to 
            <a target="_blank" href="http://localhost:1234">http://localhost:1234</a><br>
            Remember to install Python first.`);
    }

    _____CORE_____(){}

    // Init
    init(){
        super.init(this);
    }

    // Render
    render(){
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
        // For adding to apps
        this.Wpowerjs  = await net.get("libs/wpower/wpower.js","text/plain");
        this.Wpowercss = await net.get("libs/wpower/wpower.css","text/plain");

        this.Indexjs   = index_template_js;
        this.Indexhtml = await net.get("data/index-template.html","text/plain");
        this.Indexcss  = await net.get("data/index-template.css","text/plain");
    }
}

export default home;
// EOF