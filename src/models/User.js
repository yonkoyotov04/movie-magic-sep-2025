import { Schema, model } from "mongoose";

const userSchema = new Schema({
    email: {
        type: String,
        required: [true, "An email is required"]
    },

    password: {
        type: String,
        required: [true, "A password is required"]
    }

})

const User = model("User", userSchema);

export default User;