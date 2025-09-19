import express from "express"

const app = express();

app.get('/', (req, res) => {
    res.send('Server Active');
})

app.listen(2406, () => {console.log('Server is listening on port http://localhost:2406....')})