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
                required: false
            },
            city: {
                type: String,
                required: false
            },
            state: {
                type: String,
                required: false
            },
            zipcode: {
                type: Number,
                required: false
            }
        },
        dob: {
            type: Date,
            required: true
        },
        security: {
            question1: {
                type: String,
                required: false
            },
            question2: {
                type: String,
                required: false
            },
            question3: {
                type: String,
                required: false
            },
            answer1: {
                type: String,
                required: false
            },
            answer2: {
                type: String,
                required: false
            },
            answer3: {
                type: String,
                required: false
            }
        }
    },
    {
        timestamps: true
    }
);

userSchema.virtual("fullName").get(function() {
    return `${this.name.first} ${this.name.last}`;
});

module.exports = mongoose.model("User", userSchema);