const mongoose =require("mongoose"),
{ Schema } = require("mongoose");


userSchema = new Schema(
    {
        name: {
            first: {
                type: String,
                required: true
            },
            last: {
                type: String,
                required: true
            }
        },
        account: {
            username: {
                type: String,
                required: true
            },
            email: {
                type: String,
                required: true
            },
            password: {
                type: String,
                required: true
            }
        },
        gender: {
            type: String,
            required: true
        },
        address: {
            street: {
                type: String,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            state: {
                type: String,
                required: true
            },
            zipcode: {
                type: Number,
                required: true
            }
        },
        dob: {
            type: Date,
            required: true
        },
        security: {
            question1: {
                type: String,
                required: true
            },
            question2: {
                type: String,
                required: true
            },
            question3: {
                type: String,
                required: true
            },
            answer1: {
                type: String,
                required: true
            },
            answer2: {
                type: String,
                required: true
            },
            answer3: {
                type: String,
                required: true
            }
        }
    }
);

module.exports = mongoose.model("User", userSchema);