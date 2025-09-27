import { Router } from "express";
import movieService from "../services/movieService.js";

const homeController = Router();

homeController.get('/', async(req, res) => {
    const movies = await movieService.getAllMovies();
    res.render('home', { movies });
})

homeController.get('/about', (req, res) => {
    res.render('about', {pageTitle: "About"});
})

export default homeController;