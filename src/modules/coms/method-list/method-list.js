//
import wpower from "../../../libs/wpower/wpower.js";
const {cvm,base_controller} = wpower;

function _____CLASS_____(){}

//
class method_list extends base_controller{

    // 
    constructor(){
        super();
    }

    // 
    load_staticblock(Ev){
        cvm.get_screen("home").edit_staticblock();
    }

    //
    load_propsblock(Ev){
        cvm.get_screen("home").edit_propsblock();
    }

    //
    load_method_js(Ev){
        var Methodname = Ev.target.attr("name");
        cvm.get_screen("home").edit_method(Methodname);
    }

    //
    del_method(Ev){
        var Methodname = Ev.target.attr("name");
        cvm.get_screen("home").del_method(Methodname);
    }

    _____CORE_____(){}

    // 
    init(){
        super.init(this);
        touch(this.Data,"Methods",[]);

        this.Data.Methods = this.Data.Methods.filter(X=>
            X!="constructor" && X!="init" && X!="render" && X!="load_data"
        );
        this.Data.Methods.sort();
        this.Data.first_render = true;
    }

    // 
    render(){
        this.Data.first_render = false;
    }

    //
    pre_rerender(){
        this.Data.Methods = this.Data.Methods.filter(X=>
            X!="constructor" && X!="init" && X!="render" && X!="load_data"
        );
        this.Data.Methods.sort();
    }

    // 
    async load_data(){
    }
}

export default method_list;
// EOF