const {response} = require('express');
const express = require('express');

let app = express();


app.use(express.static("public"));
app.use(express.json());








app.listen(8080);
console.log("Server listening at http://localhost:8080");