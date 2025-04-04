// Utils

// 
function int(V) {
    try{
        return parseInt(V);
    }
    catch{
        return null;
    }
}

// Class
class utils {

    // Choose template
    static async choose_template(Defaulthtml, Defaultcss){
        var Choice = await ui.select("Choose template to use:",{
            blank: "Empty Template",
            with_left_col: "With Left Column",
            with_right_col: "With Right Column",
            grid: "Grid"
        });

        if (Choice==null || Choice.trim().length==0) 
            return [Defaulthtml,Defaultcss];

        if (Choice=="blank") return [Defaulthtml,Defaultcss];

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

    // Get method list from Wpower controller
    static get_methods(Js){
        try{
            const Ast = acorn.parse(Js, { ecmaVersion:2020, sourceType:"module" });

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
                if (Item.type=="MethodDefinition")
                    Method_Names.push(Item.key.name);

            return Method_Names.sort();
        }
        catch(Err){
            loge("Bad JS, err:",Err);
            ui.alert("Bad JS in screen or component");
            return [];
        }
    }
}

export default utils;
// EOF