import { Router } from "express";
import authService from "../services/authService.js";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('authentication/register', {pageTitle: "Register"});
})

authController.post('/register', async(req, res) => {
    const userData = req.body;

    await authService.register(userData);

    res.redirect('/');
})

authController.get('/login', (req, res) => {
    res.render('authentication/login', {pageTitle: "Login"});
})

authController.post('/login', async(req, res) => {
    const {email, password} = req.body;

    const token = await authService.login(email, password);

    res.cookie('auth', token);

    res.redirect('/');
})

authController.get('/logout', (req, res) => {
    res.clearCookie('auth');
    res.redirect('/');
})

export default authController;