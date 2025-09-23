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
    
    if (movie.rating > 10) {
        movie.rating = 10;
    } else if (movie.rating < 0) {
        movie.rating = 0;
    }

    const ratingView = "&#x2605".repeat(Math.trunc(movie.rating));

    res.render('details', { movie, pageTitle: "Movie Details", ratingView })
})

movieController.get('/search', (req, res) => {
    const filter = req.query;
    const movies = movieService.getAllMovies(filter);

    res.render('search', { movies, filter, pageTitle: "Search Movies" });
});

export default movieController;