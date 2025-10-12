import movieService from "../services/movieService.js";

export async function isMovieCreator(req, res, next) {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    if (!req.isAuthenticated) {
        res.redirect('/auth/login');
    }

    if (movie.ownerId != req.user.id) {
        res.status(404).render('404', {error: "Only the creator can edit this movie"});
    }

    next();
}