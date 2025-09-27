import { Schema, model } from "mongoose";

const castSchema = new Schema({
    name: {
        type: String,
        required: [true, "Cast name is required"]
    },
    age: {
        type: Number,
        required: [true, "Cast age is required"],
        min: 0,
        max: 120
    },
    born: {
        type: String,
        required: [true, "Cast birthplace is required"]
    },
    imageUrl: {
        type: String,
        required: [true, "Cast photo is required"]
    }
})

const Cast = model("Cast", castSchema);

export default Cast;