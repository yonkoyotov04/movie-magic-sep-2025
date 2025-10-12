import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";
import getErrorMessage from "../utils/errorUtils.js";

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('authentication/register', {pageTitle: "Register"});
})

authController.post('/register', isGuest, async(req, res) => {
        const userData = req.body;
    try {
        const token = await authService.register(userData);

        res.cookie('auth', token);

        res.redirect('/');
    } catch (err) {
        let errorMessage = getErrorMessage(err);
        res.status(400).render('authentication/register', {error: errorMessage, email: userData.email});
    }
        
    
})

authController.get('/login', isGuest, (req, res) => {
    res.render('authentication/login', {pageTitle: "Login"});
})

authController.post('/login', isGuest, async(req, res) => {
    const {email, password} = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie('auth', token);

        res.redirect('/');  
    } catch (err) {
        let errorMessage = getErrorMessage(err);
        res.status(400).render('authentication/login', {error: errorMessage, email: email})
    }

    
})

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default authController;