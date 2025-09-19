import Movie from "../models/Movie.js"

export default {
    getAllMovies() {
        return Movie.all();
    },

    getOne(movieId) {
        return Movie.findOne({_id: movieId})
    },

    create(movieData) {
        const movie = new Movie(movieData);
        return movie.saveMovie()
    }
}