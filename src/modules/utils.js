// Utils

// Class
class utils {

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