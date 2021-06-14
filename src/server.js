const express = require('express');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());

app.get('/backend/events', (request, response) => {
  fs.readFile('data.json', 'utf8' ,function (err, data) {
    response.json(JSON.parse(data))
  });
});

app.post('/backend/event', (req, res) => {
  fs.readFile('data.json', 'utf8' ,function (err, data) {
    if (err) throw err;
    //Da aggiungere il caso in cui il file è vuoto
    let json = JSON.parse(data);
    const event = req.body;
    event.id = uuid.v4();
    json.push(event);

    //Date conversion da fixare
    // let index = (json.length-1);
    // let myDate = new Date(json[index].timestamp);
    // json[index]["timestamp"] = myDate;

    // console.log(`var MyDate: ` + myDate);
    // console.log(`timestamp json: ` + json[index].timestamp);
    // console.log(`JSON: ` + json[index].timestamp);
    ////////////////
    fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(json));
    res.end();
  });
});

app.put('/backend/event/:id', (req, res) => {
  //controlli
  const eventId = req.params.id || 'event';
  if(req.body.id && req.body.id.length === 36){
    fs.readFile('data.json', 'utf8' ,function (err, data) {
      const events = JSON.parse(data);
      const filteredEvents = events.filter((eventEl) => {
        return eventEl.id !== eventId;
      });
      filteredEvents.push(req.body);
      fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(filteredEvents));
      res.end();
    });
  } else {
    res.status(400).send(`Missing ID`);
  }
})

app.listen(port, () => console.log(`Server listening on ${port}`));


