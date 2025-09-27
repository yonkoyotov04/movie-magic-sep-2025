import Cast from "../models/Cast.js"


export default {
    create(castData) {
        return Cast.create(castData);
    },

    getAllCasts() {
        return Cast.find();
    }
}