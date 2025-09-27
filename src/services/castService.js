import Cast from "../models/Cast.js"


export default {
    create(castData) {
        return Cast.create(castData);
    },

    getAllCasts(filter = {}) {
        let query = Cast.find();

        if (filter.excludes) {
            query = query.nin('_id', filter.excludes);
        }

        return query;
    }
}