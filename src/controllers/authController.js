import { Router } from "express";
import authService from "../services/authService.js";
import { isAuth, isGuest } from "../middlewares/authMiddleware.js";

const authController = Router();

authController.get('/register', isGuest, (req, res) => {
    res.render('authentication/register', {pageTitle: "Register"});
})

authController.post('/register', isGuest, async(req, res) => {
    const userData = req.body;

    await authService.register(userData);

    res.redirect('/');
})

authController.get('/login', isGuest, (req, res) => {
    res.render('authentication/login', {pageTitle: "Login"});
})

authController.post('/login', isGuest, async(req, res) => {
    const {email, password} = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token);

    res.redirect('/');
})

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default authController;