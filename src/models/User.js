import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new Schema({
    email: {
        type: String,
        unique: [true, "User already exists"],
        required: [true, "An email is required"],
        minLength: [10, "Email is too short"],
        match: [/@[a-zA-Z0-9]+\.[a-zA-Z0-9]+$/, "Email is invalid"]
    },

    password: {
        type: String,
        required: [true, "A password is required"],
        minLength: [6, "Password is too short"],
        match: [/^[a-zA-Z0-9]+$/]
    }

})

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12)
})

const User = model("User", userSchema);

export default User;




// Alternative way to validate if an email already exists in the database
// userSchema.pre('validate', async function() {
//     if (this.isNew) {
//         const userExists = await model("User").exists({email: this.email});
//         if (userExists) {
//             throw new Error('User already exists')
//         }
//     }
// })