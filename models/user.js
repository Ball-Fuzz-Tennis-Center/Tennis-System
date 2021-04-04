const mongoose =require("mongoose");


userSchema = mongoose.Schema({
    first: String,
    last: String,
    username: String,
    gender: String,
    Street: String,
    City: String,
    State: String,
    zipCode: String,
    DOB: Date,
    email: String,
    password: String,
    conpassword: String,
    SQuestion1: String,
    SQuestion2: String,
    SQuestion3: String,
    Question1: String,
    Question2: String,
    Question3: String
});

module.exports = mongoose.model("User", userSchema);



