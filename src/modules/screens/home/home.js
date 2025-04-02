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

    // Ctor
    constructor(){
        super();
    }

    _____UTILS_____(){}

    //
    async check_and_write_core(Dir){
        // Wpower
        var Wpowerjs_File = await files.dir_file_exists(Dir,"src/libs/wpower/wpower.js");
        var Wpowercss_File= await files.dir_file_exists(Dir,"src/libs/wpower/wpower.css");

        if (!Wpowerjs_File){
            Wpowerjs_File = await files.dir_path2file(Dir,"src/libs/wpower/wpower.js");
            await files.write_file(Wpowerjs_File,this.Wpowerjs);
        }
        if (!Wpowercss_File){
            Wpowercss_File = await files.dir_path2file(Dir,"src/libs/wpower/wpower.css");
            await files.write_file(Wpowercss_File,this.Wpowercss);
        }

        // Main files
        var File_Js  = await files.dir_file_exists(Dir,"src/index.js");
        var File_Html= await files.dir_file_exists(Dir,"src/index.html");
        var File_Css = await files.dir_file_exists(Dir,"src/index.css");

        if (!File_Js){
            File_Js = await files.dir_path2file(Dir,"src/index.js");
            await files.write_file(File_Js,this.Indexjs);
        }
        if (!File_Html){
            File_Html = await files.dir_path2file(Dir,"src/index.html");
            await files.write_file(File_Html,this.Indexhtml);
        }
        if (!File_Css){
            File_Css = await files.dir_path2file(Dir,"src/index.css");
            await files.write_file(File_Css,this.Indexcss);
        }

        // Run files
        var File_Sh  = await files.dir_file_exists(Dir,"run.sh");
        var File_Ps1 = await files.dir_file_exists(Dir,"run.ps1");
        var File_Cmd = await files.dir_file_exists(Dir,"run.cmd");

        if (!File_Sh){
            File_Sh = await files.dir_path2file(Dir,"run.sh");
            await files.write_file(File_Sh,this.Run_Cmd+"\n");
        }
        if (!File_Ps1){
            File_Ps1 = await files.dir_path2file(Dir,"run.ps1");
            await files.write_file(File_Ps1,this.Run_Cmd+"\n");
        }
        if (!File_Cmd){
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

        // Base source code
        if (open){
            await this.check_and_write_core(Dir);
        }

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
    }

    //
    run_app(Ev){
        ui.alert(`Open project folder and run either of run.sh, run.ps1, or run.cmd. 
            Remember to install Python first.`);
    }

    _____CORE_____(){}

    // Init
    init(){
        super.init(this);
    }

    // Render
    render(){
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