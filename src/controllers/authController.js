import { Router } from "express";

const authController = Router();

authController.get('/register', (req, res) => {
    res.render('authentication/register', {pageTitle: "Register"});
})

authController.get('/login', (req, res) => {
    res.render('authentication/login', {pageTitle: "Login"});
})

export default authController;