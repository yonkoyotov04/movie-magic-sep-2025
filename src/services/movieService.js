import Movie from "../models/Movie.js"

export default {
    getAllMovies(filter = {}) {
        return Movie.find(filter);
    },

    getOne(movieId) {
        return Movie.findOne({_id: movieId})
    },

    create(movieData) {
        movieData.rating = Number(movieData.rating);
        
        const movie = new Movie(movieData);
        return movie.saveMovie()
    }
}