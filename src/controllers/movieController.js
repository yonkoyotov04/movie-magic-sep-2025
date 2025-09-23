import { Router } from "express";
import movieService from "../services/movieService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create', {pageTitle: "Create Movie"});
});

movieController.post('/create', (req, res) => {
    const movieData = req.body;

    movieService.create(movieData);

    res.redirect('/')
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;
    const movie = movieService.getOne(movieId);

    res.render('details', { movie, pageTitle: "Movie Details" })
})

movieController.get('/search', (req, res) => {
    const filter = req.query;
    const movies = movieService.getAllMovies(filter);

    res.render('search', { movies, filter, pageTitle: "Search Movies" });
});

export default movieController;