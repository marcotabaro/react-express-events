const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;



app.use(express.json());


app.get('/backend', (request, response) => {
  response.send(console.log(`Connection established`));
});


app.post('/backend', (req, res) => {
  fs.readFile('data.json', 'utf8' ,function (err, data) {
    if (err) throw err;
    //Da aggiungere il caso in cui il file è vuoto
    let json = JSON.parse(data);
    let index = (json.length-1);
    console.log(`json.length: ` + index);
    let myDate = new Date(json[index].timestamp);
    console.log(`Data convertita: ` + myDate);
    json.push(req.body);
    fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(json));
    res.end();
  });
});

app.listen(port, () => console.log(`Server listening on ${port}`));


