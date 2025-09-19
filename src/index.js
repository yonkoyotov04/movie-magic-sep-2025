import express from "express"
import handlebars from 'express-handlebars'
import homeController from "./controllers/homeController.js";
import movieController from "./controllers/movieController.js";

const app = express();

app.engine('hbs', handlebars.engine({
    extname: 'hbs'
}))
app.set('view engine', 'hbs');
app.set('views', 'src/views');

app.use(express.static('src/public'))

app.use(homeController);
app.use(movieController)

app.listen(2406, () => {console.log('Server is listening on port http://localhost:2406....')})