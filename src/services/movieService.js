import Movie from "../models/Movie.js"

export default {
    getAllMovies(filter = {}) {
        return Movie.all(filter);
    },

    getOne(movieId) {
        return Movie.findOne({_id: movieId})
    },

    create(movieData) {
        const movie = new Movie(movieData);
        return movie.saveMovie()
    }
}