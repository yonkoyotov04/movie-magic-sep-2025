import Movie from "../models/Movie.js"

export default {
    getAllMovies() {
        return Movie.all();
    },

    create(movieData) {
        const movie = new Movie(movieData);
        return movie.saveMovie()
    }
}