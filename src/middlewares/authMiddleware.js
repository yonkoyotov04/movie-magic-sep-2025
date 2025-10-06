import jtw from 'jsonwebtoken'
import { JTW_SECRET } from '../config/constants.js';

export default function authMiddleware (req, res, next) {
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }

    try {
        const decodedToken = jtw.verify(token, JTW_SECRET);

        req.user = decodedToken;
        req.isAuthenticated = true;
        
        next();
    } catch (error) {
        res.clearCookie('auth')
        res.redirect('/auth/login')
    }
}

export function isAuth (req, res, next) {
    if (!req.isAuthenticated) {
        return res.redirect('/auth/login');
    }

    next()
}