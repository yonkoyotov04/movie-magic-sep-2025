import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { validate } from "uuid";

const movieController = Router();

movieController.get('/create', isAuth, (req, res) => {
    res.render('movies/create', {pageTitle: "Create Movie"});
});

movieController.post('/create', isAuth, async(req, res) => {
    const movieData = req.body;
    const creatorId = req.user.id;

    await movieService.create(movieData, creatorId);

    res.redirect('/')
});

movieController.get('/:movieId/details', async(req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOneDetailed(movieId);

    if (movie.rating > 10) {
        movie.rating = 10;
    } else if (movie.rating < 0) {
        movie.rating = 0;
    }

    const ratingView = "&#x2605".repeat(Math.trunc(movie.rating));

    const isCreator = movie.ownerId && movie.ownerId.equals(req.user?.id);

    res.render('movies/details', { movie, pageTitle: "Movie Details", ratingView, isCreator })
})

movieController.get('/search', async(req, res) => {
    const filter = req.query;
    const movies = await movieService.getAllMovies(filter);

    res.render('search', { movies, filter, pageTitle: "Search Movies" });
})

movieController.get('/:movieId/attach', isAuth, async(req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAllCasts({excludes: movie.casts});

    res.render('casts/attach', {movie, casts})
})

movieController.post('/:movieId/attach', isAuth, async(req, res) => {
    const movieId = req.params.movieId;
    const castId = req.body.cast;

    await movieService.attach(movieId, castId)

    res.redirect(`/movies/${movieId}/details`);
})

movieController.get('/:movieId/delete', isAuth, async(req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    if (!movie.ownerId?.equals(req.user.id)) {
        return res.redirect('/');
    }

    await movieService.delete(movieId);
    res.redirect('/');
})

movieController.get('/:movieId/edit', isAuth, async(req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    const categoryViewData = getCategoryViewData(movie.category);

    if (!movie.ownerId?.equals(req.user.id)) {
        return res.redirect('/');
    }

    res.render('movies/edit', { movie, categoryViewData, pageTitle: "Edit" })
})

movieController.post('/:movieId/edit', isAuth, async(req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    await movieService.edit(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);
})

function getCategoryViewData (movieCategory) {
    const categories = [
        {value: "tv-show", label: "TV Show"},
        {value: 'animation', label: "Animation"},
        {value: 'movie', label: "Movie"},
        {value: 'documentary', label: "Documentary"},
        {value: 'short-film', label: "Short Film"}
    ]

    const viewData = categories.map(category => ({...category, selected: movieCategory === category.value ? 'selected' : ""}))
    return viewData;
}

export default movieController;