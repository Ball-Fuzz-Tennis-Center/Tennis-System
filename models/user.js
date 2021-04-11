const mongoose =require("mongoose");


userSchema = mongoose.Schema({
    first: String,
    last: String,
    username: String,
    gender: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    dob: Date,
    email: String,
    password: String,
    sQuestion1: String,
    sQuestion2: String,
    sQuestion3: String,
    sAnswer1: String,
    sAnswer2: String,
    sAnswer3: String
});

module.exports = mongoose.model("User", userSchema);