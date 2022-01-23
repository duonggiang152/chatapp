class StringShouldContainOnlyNumber extends Error {
    constructor(message){
        super(message)
        this.name = "StringShouldContainOnlyNumber"
    }
}

module.exports = StringShouldContainOnlyNumber