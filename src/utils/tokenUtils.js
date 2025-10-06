import jwt from 'jsonwebtoken'
import { JTW_SECRET } from '../config/constants.js';

export function generateAuthToken(user) {
    const payload = {
            id: user.id,
            email: user.email
        }

    const token = jwt.sign(payload, JTW_SECRET, {expiresIn: "2h"});

    return token;
}