const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on ${port}`));

//Get
app.get('/backend', (req, res) => {
    res.send({ express: "Testing if backend is connected to React"});
});
