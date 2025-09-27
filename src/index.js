import express from "express"
import handlebars from 'express-handlebars'
import mongoose from "mongoose";

import router from "./routes.js";

const app = express();

const url = 'mongodb://localhost:27017'
try {
    await mongoose.connect(url, {
    dbName: 'movie-magic'
    })
    console.log('Connected to database successfully');
} catch (error) {
    console.error('Cannot connect to database, ', error.message);
}


app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true,
        allowProtoMethodsByDefault: true
    }
}))

app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static('src/public'))
app.use(express.urlencoded());

app.use(router); 

app.listen(2406, () => {console.log('Server is listening on port http://localhost:2406....')})