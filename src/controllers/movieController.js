import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";

const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create', {pageTitle: "Create Movie"});
});

movieController.post('/create', async(req, res) => {
    const movieData = req.body;

    await movieService.create(movieData);

    res.redirect('/')
});

movieController.get('/:movieId/details', async(req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    if (movie.rating > 10) {
        movie.rating = 10;
    } else if (movie.rating < 0) {
        movie.rating = 0;
    }

    const ratingView = "&#x2605".repeat(Math.trunc(movie.rating));

    res.render('details', { movie, pageTitle: "Movie Details", ratingView })
})

movieController.get('/search', async(req, res) => {
    const filter = req.query;
    const movies = await movieService.getAllMovies(filter);

    res.render('search', { movies, filter, pageTitle: "Search Movies" });
})

movieController.get('/:movieId/attach', async(req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAllCasts();

    res.render('casts/attach', {movie, casts})
})

export default movieController;