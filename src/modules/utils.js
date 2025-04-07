// Utils
// Libs
import wpower from "../libs/wpower/wpower.js";

function _____UTILS_____(){}

// 
function int(V) {
    try{
        return parseInt(V);
    }
    catch{
        return null;
    }
}

function _____CLASS_____(){}

// Class
class utils {
    static JS_KEYWORDS = [
        "abstract","arguments","await","boolean","break",
        "byte","case","catch","char","class","const","continue","debugger",
        "default","delete","do","double","else","enum","eval","export","extends",
        "false","final","finally","float","for","function","goto","if","implements",
        "import","in","instanceof","int","interface","let","long","native",
        "new","null","package","private","protected","public","return","short",
        "static","super","switch","synchronized","this","throw","throws",
        "transient","true","try","typeof","var","void","volatile","while",
        "with","yield"
    ];

    // Choose template
    static async choose_template(Defaulthtml, Defaultcss){
        const {ut,ui,cvm,base_controller,files} = wpower;
        var Choice = await ui.select("Choose template to use:",{
            blank: "Empty Template",
            with_both_sides: "With Both Sides",
            with_left_col: "With Left Column",
            with_right_col: "With Right Column",
            grid: "Grid"
        });

        if (Choice==null || Choice.trim().length==0) 
            return [Defaulthtml,Defaultcss];

        if (Choice=="blank") return [Defaulthtml,Defaultcss];

        if (Choice=="with_both_sides"){
            let Html = await net.get("data/with-both-sides.html","text/plain");
            let Css  = await net.get("data/with-both-sides.css","text/plain");
            return [Html,Css];
        }
        if (Choice=="with_left_col"){
            let Html = await net.get("data/with-left-col.html","text/plain");
            let Css  = await net.get("data/with-left-col.css","text/plain");
            return [Html,Css];
        }
        if (Choice=="with_right_col"){
            let Html = await net.get("data/with-right-col.html","text/plain");
            let Css  = await net.get("data/with-right-col.css","text/plain");
            return [Html,Css];
        }

        if (Choice=="grid"){
            let rows = int(await ui.prompt("Enter number of rows:",1));
            if (rows==null || rows<1) return [Defaulthtml,Defaultcss];

            let cols = int(await ui.prompt("Enter number of columns:",2));
            if (cols==null || cols<1) return [Defaulthtml,Defaultcss];
            
            let colpct = 100/cols;
            let Html = "<table style='width:100%;'>";

            for (let i=0; i<rows; i++){
                Html += "<tr>";

                for (let j=0; j<cols; j++)
                    Html += `<td style="width:${colpct}%; background:#eee; `+
                    `border:1px solid white;">--</td>`;

                Html += "</tr>";
            }
            Html += "</table>";
            return [Html,"/* EOF */"];
        }
    }

    _____FILE_OPS_____(){}

    // Get js
    static async get_jsfile_code(Type,Name){
        const {ut,ui,cvm,base_controller,files} = wpower;
        var Dir = cvm.get_screen("home").Proj_Dir;

        if (Type=="screen"){
            let File = await files.dir_path2file(Dir,`src/modules/screens/${Name}/${Name}.js`);
            var [Handle,Js] = await files.read_file(File);
        }
        else{
            let File = await files.dir_path2file(Dir,`src/modules/coms/${Name}/${Name}.js`);
            var [Handle,Js] = await files.read_file(File);
        }
        return Js;
    }

    // Write js
    static async write_jsfile_code(Type,Name, Jscode){
        const {ut,ui,cvm,base_controller,files} = wpower;
        var Dir = cvm.get_screen("home").Proj_Dir;

        if (Type=="screen"){
            let File = await files.dir_path2file(Dir,`src/modules/screens/${Name}/${Name}.js`);
            await files.write_file(File,Jscode);   
        }
        else{
            let File = await files.dir_path2file(Dir,`src/modules/coms/${Name}/${Name}.js`);
            await files.write_file(File,Jscode);   
        }
    }

    _____JS_PARSING_____(){}

    // Get method list from Wpower controller
    static get_methods(Js){
        const {ut,ui,cvm,base_controller,files} = wpower;
        try{
            // Acorn is old, can't parse fields and static fields in class
            // as properties of class.
            // const Ast = acorn.parse(Js, { ecmaVersion:2020, sourceType:"module" });
            var Ast = thisclass.parse_js(Js);

            if (Ast.body.length==0){
                ui.alert("Empty screen or component");
                return [];
            }
            var Class = null;

            for (let Item of Ast.body)
                if (Item.type=="ClassDeclaration"){
                    Class = Item;
                    break;
                }

            if (Class==null){
                ui.alert("Class not found in screen or component");
                return [];
            }
            if (Class.body.body.length==0){
                ui.alert("Empty class in screen or component");
                return [];
            }
            var Method_Names = [];

            for (let Item of Class.body.body)
                if (Item.type=="ClassMethod")
                    Method_Names.push(Item.key.name);

            return Method_Names.sort();
        }
        catch(Err){
            loge("Bad JS, err:",Err);
            ui.alert("Bad JS in screen or component");
            return [];
        }
    }

    // Parse code to AST with comments in place (.leadingComments, .trailingComments)
    static parse_js(Code){
        const {ut,ui,cvm,base_controller,files} = wpower;
        return Babel.packages.parser.parse(Code,{ 
            attachComment: true, comments:true, sourceType:"module"
        }).program;
    }

    // Ast_Node can be .program, or any body[i] which is parsed by utils.parse_js 
    static ast_node_to_js(Ast_Node){
        const {ut,ui,cvm,base_controller,files} = wpower;
        var Code = Babel.packages.generator.generate(Ast_Node,{
            comments:true
        }).code;
        var Lines = Code.split("\n");

        // Babel makes 2-space indents, change to 4
        for (let i=0; i<Lines.length; i++)
            if (Lines[i].trim().length>0 && Lines[i].match(/^[\s]+/g) != null){
                let Indent = Lines[i].match(/^[\s]+/g)[0];
                Indent     = Indent+Indent; // 2spaces -> 4spaces
                Lines[i]   = Lines[i].replace(/^[\s]+/, Indent);
            }

        return Lines.join("\n");
    }

    //
    static get_staticblock_code(Fulljs){
        const {ut,ui,cvm,base_controller,files} = wpower;
        try{
            var Prog  = thisclass.parse_js(Fulljs);
            var Nodes = [];

            // Find class
            for (let Item of Prog.body)
                if (Item.type == "ClassDeclaration")
                    break;
                else{
                    Item.trailingComments = [];
                    Nodes.push(Item);
                }

            // Make js code
            var Code = "";

            for (let Node of Nodes)
                Code += thisclass.ast_node_to_js(Node).trim()+"\n";

            return Code;
        }
        catch(Err){
            ui.alert(Err);
            return;
        }
    }

    //
    static get_propsblock_code(Fulljs){
        const {ut,ui,cvm,base_controller,files} = wpower;
        try{
            var Prog  = thisclass.parse_js(Fulljs);
            var Nodes = [];            
            var Class = null;

            // Find class
            for (let Item of Prog.body)
                if (Item.type == "ClassDeclaration"){
                    Class = Item;
                    break;
                }

            // Take nodes before first method (inc constructor)
            for (let Item of Class.body.body){
                if (Item.type == "ClassMethod") break;
                Item.trailingComments = [];
                Nodes.push(Item);
            }

            // Make js code
            var Code = "";

            for (let Node of Nodes)
                Code += thisclass.ast_node_to_js(Node).trim()+"\n";

            return Code;
        }
        catch(Err){
            ui.alert(Err);
            return;
        }
    }

    //
    static has_class_declared(Prog){
        const {ut,ui,cvm,base_controller,files} = wpower;

        for (let Item of Prog.body)
            if (Item.type == "ClassDeclaration")
                return true;

        return false;
    }

    // Get method source code
    static get_method_code(Fulljs, Methodname){
        const {ut,ui,cvm,base_controller,files} = wpower;

        try{
            var Prog = thisclass.parse_js(Fulljs);
            var Class = null;

            // Find class
            for (let Item of Prog.body)
                if (Item.type == "ClassDeclaration"){
                    Class = Item;
                    break;
                }

            if (Class==null){
                ui.alert("Can't find JS class in file");
                return;
            }

            // Find method
            var Methods = Class.body.body;
            var Methodobj = null;

            for (let Item of Methods)
                if (Item.key.name == Methodname){
                    Methodobj = Item;
                    break;
                }

            if (Methodobj==null){
                ui.alert(`Can't find method '${Methodname}'`);
                return;
            }

            // Make js code
            var Code = thisclass.ast_node_to_js(Methodobj);

            // Remove tailing comment (doesn't belong to method)
            var Lines = Code.split("\n");
            var n     = Lines.length;

            if (Lines[n-1].trim().indexOf("//")==0 || Lines[n-1].trim().indexOf("/*")==0)
                Lines = Lines.slice(0,n-1);

            return Lines.join("\n");
        }
        catch(Err){
            ui.alert(Err);
            return;
        }
    }

    //
    static replace_method(Filejs,Newnode){
        const {ut,ui,cvm,base_controller,files} = wpower;
        
        try{
            var Prog = thisclass.parse_js(Filejs);
            var Class = null;

            // Find class
            for (let Item of Prog.body)
                if (Item.type == "ClassDeclaration"){
                    Class = Item;
                    break;
                }

            if (Class==null){
                log("Can't find JS class in file");
                return;
            }

            // Find method
            var Methods = Class.body.body;
            var Methodobj = null;
            var i;

            for (i=0; i<Methods.length; i++){
                let Item = Methods[i];

                if (Item.key.name == Newnode.key.name){
                    Methodobj = Item;
                    break;
                }
            }
            if (Methodobj==null){
                log(`Can't find method '${Newnode.key.name}'`);
                return;
            }
            var methodidx = i;

            // Remove tailing comments of previous guy
            if (Class.body.body[methodidx-1])
                Class.body.body[methodidx-1].trailingComments = [];

            // Replace node
            Newnode.trailingComments = [];
            Class.body.body[methodidx] = Newnode;

            // Turn back to js
            return thisclass.ast_node_to_js(Prog);
        }
        catch(Err){
            log(Err);
            return;
        }
    }
} // Class
window.utils = utils;

const thisclass = utils;
export default utils;
// EOF