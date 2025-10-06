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

export default authController;