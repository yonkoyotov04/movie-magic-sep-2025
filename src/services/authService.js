import User from "../models/User.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken'

const JTW_SECRET = 'sdasd3uhovs74u23hjsad79b3ikrnsanbc'

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