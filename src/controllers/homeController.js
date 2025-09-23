import { Router } from "express";
import movieService from "../services/movieService.js";

const homeController = Router();

homeController.get('/', (req, res) => {
    const movies = movieService.getAllMovies();
    res.render('home', { movies });
})

homeController.get('/about', (req, res) => {
    res.render('about', {pageTitle: "About"});
})

export default homeController;