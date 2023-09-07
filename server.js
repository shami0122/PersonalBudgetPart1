const express = require('express');
const app = express();
const bodyParser = require('body-parser');



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const envelopeRouter = require('./server/envelope');
app.use('/envelope', envelopeRouter);

app.get('/', (req, res) => {
    res.send('Hello World!')
})

   
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});