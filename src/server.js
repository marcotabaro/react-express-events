const express = require('express');
const cors = require('cors');
const uuid = require('uuid');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get('/backend/events', (request, response) => {
  fs.readFile('data.json', 'utf8' ,function (err, data) {
    response.json(JSON.parse(data))
  });
});

app.post('/backend/event', (req, res) => {
  
  //validation
  if(!req.body.id && req.body.id.length !== 36){
    res.status(400).send(`Missing ID`);
  } if(!req.body.dispositivo){
    res.status(400).send(`Missing dispositivo`);
  } if(!req.body.IMEI && req.body.IMEI !== 10){
    res.status(400).send(`Missing IMEI`);
  } if(!req.body.evento){
    res.status(400).send(`Missing evento`);
  } if(!req.body.timestamp){
    res.status(400).send(`Missing timestamp`);
  } else {
    fs.readFile('data.json', 'utf8' ,function (err, data) {
      if (err) throw err;
      let json = JSON.parse(data);
      const event = req.body;
      if(event.id === null){
        event.id = uuid.v4();
      }
      json.push(event);
      fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(json));
      res.end();
    });
  }
});

app.put('/backend/event/:id', (req, res) => {
  const eventId = req.params.id || 'event';
  if(!req.body.id && req.body.id.length !== 36){
    res.status(400).send(`Missing ID`);
  } if(!req.body.dispositivo){
    res.status(400).send(`Missing dispositivo`);
  } if(!req.body.IMEI && req.body.IMEI !== 10){
    res.status(400).send(`Missing IMEI`);
  } if(!req.body.evento){
    res.status(400).send(`Missing evento`);
  } if(!req.body.timestamp){
    res.status(400).send(`Missing timestamp`);
  } else {
    fs.readFile('data.json', 'utf8' ,function (err, data) {
      const events = JSON.parse(data);
      const filteredEvents = events.filter((eventEl) => {
        return eventEl.id !== eventId;
      });
      console.log('filteredEvents', filteredEvents);
      filteredEvents.push(req.body);
      fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(filteredEvents));
      res.end();
    });
  }
})

app.listen(port, () => console.log(`Server listening on ${port}`));


