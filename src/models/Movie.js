import { Schema, model, Types } from "mongoose";

const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, "A movie title is required"],
        minLength: [5, "Movie title is too short"],
        match: [/^[a-zA-Z0-9 ]+$/, "Movie title is invalid"]
        
    },
    category: {
        type: String,
        required: [true, "A movie categoty is required"],
        enum: {
            values: ['tv-show', 'animation', 'movie', 'documentary', 'short-film'],
            message: "Movie category is invalid"
        }
    },
    genre: {
        type: String,
        required: [true, "A movie genre is required"],
        minLength: [5, "Movie genre is too short"],
        match: [/^[a-zA-Z0-9 ]+$/, "Movie genre is invalid"]
    },
    director: {
        type: String,
        required: [true, "A movie director is required"],
        minLength: [5, "Director name is too short"],
        match: [/^[a-zA-Z0-9 ]+$/, "Movei director is invalid"]
    },
    year: {
        type: Number,
        required: [true, "A movie release date is required"],
        min: [1900, "The movie year is too far away"],
        max: [2025, "The movie year is not valid"]
    },
    imageUrl: {
        type: String,
        required: [true, "A movie poster is required"],
        match: [/^https?:\/\//, "Image url is invalid"]

    },
    rating: {
        type: Number,
        required: [true, "A movie rating is required"],
        min: [1, "Movie rating is too low"],
        max: [5, "Movie rating is too high"]
    },
    description: {
        type: String,
        required: [true, "A movie description is required"],
        minLength: [20, "The movie description is too short"],
        match: [/^[a-zA-Z0-9 ]+$/, "Movie description has some invalid characters"]
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    ownerId: {
        type: Types.ObjectId,
        ref: "User",
        required: [true, "The movie should have a creator"]
    }
})

const Movie = model('Movie', movieSchema);

export default Movie;