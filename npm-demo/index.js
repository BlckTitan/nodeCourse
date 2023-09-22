const express = require('express');
const app = express();

app.get('/', (req, res ) => {
    res.send('Hello World')
})

app.get('/again', (req, res) => {
    res.send([1, 2, 3, 4, 5])
})
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Listening on port ${port}...`))