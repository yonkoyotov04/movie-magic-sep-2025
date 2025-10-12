import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, "Cast name is required"],
        minLength: [5, "Cast name is too short"],
        match: [/^[a-zA-Z0-9 ]+$/, "Cast name is invalid"]
    },
    age: {
        type: Number,
        required: [true, "Cast age is required"],
        min: 0,
        max: 120
    },
    born: {
        type: String,
        required: [true, "Cast birthplace is required"],
        minLength: [10, "Cast country is too short"],
        match: [/^[a-zA-Z0-9 ]+$/, "Cast country is invalid"]
    },
    imageUrl: {
        type: String,
        required: [true, "Cast photo is required"],
        match: [/^https?:\/\//, "Image url is invalid"]
    }
})

const Cast = model("Cast", castSchema);

export default Cast;