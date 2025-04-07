export default 
`import wpower from "../../../libs/wpower/wpower.js";

class #NAME extends wpower.base_controller {

    // Ctor 
    constructor(){
        super();
    }

    // Init (before making DOM)
    init(){
        super.init(this);
    }

    // Render (after making DOM, for events,etc.)
    render(){
    }

    // Load data (after render, extra data beside this.Data)
    async load_data(){
    }
}

export default #NAME;
// EOF`;
// EOF