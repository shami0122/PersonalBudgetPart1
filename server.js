let express = require('express');
let app = express = express();

app.get('/', (req, res) => {
    res.send("<h1> Hello, World </h1>");
});

app.listen(3000, () => {
    console.log("Server listening on port 3000");
});