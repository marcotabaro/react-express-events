const express = require("express");
const cors = require("cors");
const uuid = require("uuid");
const path = require("path");
const fs = require("fs");
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());

app.get("/backend/events", (request, response) => {
  fs.readFile("data.json", "utf8", function (err, data) {
    response.json(JSON.parse(data));
  });
});

app.post("/backend/event", (req, res) => {
  //validation
  if (!req.body.dispositivo) {
    console.error("Missing dispositivo");
    res.status(400).send(`Missing dispositivo`);
    res.end();
  } else if (!req.body.IMEI || req.body.IMEI.length !== 10) {
    console.error("Missing IMEI");
    res.status(400).send(`Missing IMEI`);
    res.end();
  } else if (!req.body.evento) {
    console.error("Missing evento");
    res.status(400).send(`Missing evento`);
    res.end();
  } else if (!req.body.timestamp) {
    console.error("Missing timestamp");
    res.status(400).send(`Missing timestamp`);
    res.end();
  } else {
    fs.readFile("data.json", "utf8", function (err, data) {
      if (err) throw err;
      let json = JSON.parse(data);
      const event = req.body;
      if (!event.id) {
        event.id = uuid.v4();
      }
      json.push(event);
      fs.writeFileSync(
        path.resolve(__dirname, "data.json"),
        JSON.stringify(json)
      );
      res.end();
    });
  }
});

app.put("/backend/event/:id", (req, res) => {
  const eventId = req.params.id || "event";
  if (!req.body.id || req.body.id.length !== 36) {
    console.error('Missing ID')
    res.status(400).send(`Missing ID`);
    res.end();
  } else if (req.body.id !== eventId) {
    console.error('ID doesnt match')
    res.status(400).send(`ID doesn't match`);
    res.end();
  } else if (!req.body.dispositivo) {
    console.error('Missing dispositivo')
    res.status(400).send(`Missing dispositivo`);
    res.end();
  } else if (!req.body.IMEI || req.body.IMEI.length !== 10) {
    console.error('Missing IMEI')
    res.status(400).send(`Missing IMEI`);
    res.end();
  } else if (!req.body.evento) {
    console.error('Missing evento')
    res.status(400).send(`Missing evento`);
    res.end();
  } else if (!req.body.timestamp) {
    console.error('Missing timestamp')
    res.status(400).send(`Missing timestamp`);
    res.end();
  } else {
    fs.readFile("data.json", "utf8", function (err, data) {
      const events = JSON.parse(data);
      for (let i = 0; i < events.length; i++) {
        if (eventId === events[i].id) {
          events[i] = { ...req.body };
          break;
        }
      }
      fs.writeFileSync(
        path.resolve(__dirname, "data.json"),
        JSON.stringify(events)
      );
      res.end();
    });
  }
});

app.listen(port, () => console.log(`Server listening on ${port}`));
