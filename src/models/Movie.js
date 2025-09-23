import {v4 as uuid} from 'uuid'
import fs from 'fs/promises'

let dbSerialized = await fs.readFile('./src/db.json', {encoding: "utf-8"});
let db = JSON.parse(dbSerialized)
    

class Movie {
    constructor(data) {
        Object.assign(this, data)

        this._id = uuid();
    }

    static all(filter = {}) {
        let result = db.movies.slice();

        if (filter.title) {
          result = result.filter(movie => movie.title.toLowerCase().includes(filter.title.toLowerCase()));
        }

        if (filter.genre) {
          result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
        }

        if (filter.year) {
          result = result.filter(movie => movie.year === filter.year);
        }

        return result;
    }

    static findOne(filter = {}) {
        let result = db.movies[0];

        if (filter._id) {
            result = db.movies.find(movie => filter._id === movie._id)
        }

        return result;
    }

    async saveMovie() {
        db.movies.push(this);

        const dbSerialized = JSON.stringify(db, null, 2);

        await fs.writeFile('./src/db.json', dbSerialized);

        return this;
    }

    get id() {
        return this._id;
    }
}

export default Movie;