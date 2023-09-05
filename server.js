const express = require('express');
const app = express();
const bodyParser = require('body-parser');


app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send("<h1> Hello, World </h1>");
});
   
app.listen(3000, () => {
    console.log("Server listening on port 3000");
});