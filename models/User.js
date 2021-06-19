const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

const saltRounds = 10;


const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true }

})

UserSchema.pre("save", async function(next){
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(saltRounds)
        this.password = await bcrypt.hash(this.password, salt);
        return next();
    }
    catch (err)
    {
        return next(err);
    }
})

UserSchema.methods.verifyPassword = async function (submittedPassword) {
    let savedPassword = this.password;
    return await bcrypt.compare(submittedPassword, savedPassword)
}

module.exports = mongoose.model('User', UserSchema)