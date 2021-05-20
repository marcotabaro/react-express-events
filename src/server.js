const express = require('express');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());

app.listen(port, () => console.log(`Server listening on ${port}`));

app.get('/backend', (req, res) => {
    res.send({ express: "Testing if backend is connected to React"});
});


app.post('/backend', (req, res) => {
    const body = req.data;
    res.send('event received from Postman');
    console.log(body);
    //fetch('./data.json')
    //.then(res => res.json())
    //.then(data => {
  //});
    // let rawData = fs.readFileSync('data.json');
    // let eventArray = JSON.parse(rawData);
    // eventArray[]
});

fs.writeFile('data.json', JSON.stringify(this.body));
