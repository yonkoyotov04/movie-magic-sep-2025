import Movie from "../models/Movie.js"

export default {
    getAllMovies(filter = {}) {
        let query = Movie.find();

        if (filter.title) {
          query = query.find({title: { $regex: filter.title, $options: 'i'} });
        }

        if (filter.genre) {
          query = query.find({genre: { $regex: new RegExp(`^${filter.genre}$`), $options: 'i' } })
        }

        if (filter.year) {
          query = query.where('year').equals(filter.year);
        }

        return query;
    },

    getOne(movieId) {
        return Movie.findById(movieId);
    },

    getOneDetailed(movieId) {
        return Movie.findById(movieId).populate('casts');
    },

    create(movieData, creatorId) {
        return Movie.create({
          ...movieData,
          rating: Number(movieData.rating),
          ownerId: creatorId
        });
    },

    async attach(movieId, castId) {
        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } })
    },

    delete(movieId) {
        return Movie.findByIdAndDelete(movieId)
    },

    edit(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData);
    }
}