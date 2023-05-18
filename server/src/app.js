const express = require('express');
const { port } = require("./config/index");

const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`App is listeing on PORT ${port}!`);
});