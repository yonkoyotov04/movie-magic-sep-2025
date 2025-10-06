import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'
import { JTW_SECRET } from "../config/constants.js"

export default {
    register(userData) {
        User.create(userData)
    },

    async login(email, password) {
        const user = await User.findOne({ email });

        if (!user) {
            throw new Error('Invalid email or password!');
        }

        const passwordIsValid = await bcrypt.compare(password, user.password);

        if (!passwordIsValid) {
            throw new Error("Invalid email or password!");
        }

        const payload = {
            id: user.id,
            email: user.email
        }

        const token = jwt.sign(payload, JTW_SECRET, {expiresIn: "2h"});

        return token;
    }

    
}