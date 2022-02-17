class ParamMustBeNumber extends Error {
    constructor(message){
        super(message)
        this.name = "ParamMustBeNumber"
    }
}

module.exports = ParamMustBeNumber