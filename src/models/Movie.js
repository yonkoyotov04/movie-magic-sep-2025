import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, "A movie title is required"]
    },
    category: {
        type: String,
        required: [true, "A movie categoty is required"]
    },
    genre: {
        type: String,
        required: [true, "A movie genre is required"]
    },
    director: {
        type: String,
        required: [true, "A movie director is required"]
    },
    year: {
        type: Number,
        required: [true, "A movie release date is required"],
    },
    imageUrl: {
        type: String,
        required: [true, "A movie poster is required"]
    },
    rating: {
        type: Number,
        required: [true, "A movie rating is required"]
    },
    description: {
        type: String,
        required: [true, "A movie description is required"]
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }]
})

const Movie = model('Movie', movieSchema);

export default Movie;