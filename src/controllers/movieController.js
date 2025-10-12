import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import getErrorMessage from "../utils/errorUtils.js";
import getCategoryViewData from "../utils/generalUtils.js";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    const categories = getCategoryViewData();
    res.render('movies/create', {categories});
});

movieController.post('/create', isAuth, async(req, res) => {
    const movieData = req.body;
    const creatorId = req.user.id;

    try {
        await movieService.create(movieData, creatorId);
        res.redirect('/');
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        const categories = getCategoryViewData(movieData.category);
        res.status(400).render('movies/create', {error: errorMessage, data: movieData, categories});
    }

    
});

movieController.get('/:movieId/details', async(req, res) => {

    try {
        const movieId = req.params.movieId;
        const movie = await movieService.getOneDetailed(movieId);
        const ratingView = "&#x2605".repeat(Math.trunc(movie.rating));
        const isCreator = movie.ownerId && movie.ownerId.equals(req.user?.id);

        res.render('movies/details', { movie, ratingView, isCreator })
    } catch (error) {
        res.render('404', {error: "Movie not found"});
    }
    
})

movieController.get('/search', async(req, res) => {
    const filter = req.query;
    const movies = await movieService.getAllMovies(filter);

    res.render('search', { movies, filter});
})

movieController.get('/:movieId/attach', isAuth, async(req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAllCasts({excludes: movie.casts});

    if (!movie.ownerId?.equals(req.user.id)) {
        return res.redirect('/');
    }

    res.render('casts/attach', {movie, casts})
})

movieController.post('/:movieId/attach', isAuth, async(req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId)

    res.redirect(`/movies/${movieId}/details`);
})

movieController.get('/:movieId/delete', isAuth, async(req, res) => {
    try {
        const movieId = req.params.movieId;
        const movie = await movieService.getOne(movieId);

        if (!movie.ownerId?.equals(req.user.id)) {
            return res.status(401).render('404', {error: "Only the creator can delete this movie"})
        }

        await movieService.delete(movieId);
        res.redirect('/');
    } catch (err) {
        res.status(400).render('404', {error: "Movie not found"});
    }
    
})

movieController.get('/:movieId/edit', isAuth, async(req, res) => {

    try {
        const movieId = req.params.movieId;
        const movie = await movieService.getOne(movieId);
        const categoryViewData = getCategoryViewData(movie.category);

        if (!movie.ownerId?.equals(req.user.id)) {
            return res.status(401).render('404', {error: "Only the creator can edit this movie"})
        }

    res.render('movies/edit', { movie, categoryViewData})
    } catch (err) {
        res.status(400).render('404', {error: "Movie not found"})
    }
    
})

movieController.post('/:movieId/edit', isAuth, async(req, res) => {
    const movieId = req.params.movieId;
    const movie = req.body;
    
    try {
        await movieService.edit(movieId, movie);
        res.redirect(`/movies/${movieId}/details`);
    } catch (err) {
        const errorMessage = getErrorMessage(err);
        const categoryViewData = getCategoryViewData(movie.category);
        res.status(400).render('movies/edit', {error: errorMessage, categoryViewData, movie})
    }

    
})

export default movieController;