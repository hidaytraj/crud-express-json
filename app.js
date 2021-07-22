const express = require("express");
const PORT = 3030;

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("<h1>Welcome</h1>")
});

const _router = require('./src/router/Router');
_router(app);

app.listen(PORT, () => {
    console.log('App is running on port '+ PORT)
});