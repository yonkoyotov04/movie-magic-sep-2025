import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

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

userSchema.pre('save', async function() {
    this.password = await bcrypt.hash(this.password, 12)
})

const User = model("User", userSchema);

export default User;