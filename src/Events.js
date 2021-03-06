import React from "react";
import "./App.css";
import axios from "axios";

//let eventData = require("./data.json");

export class Events extends React.Component {
  constructor(props) {
    super(props);
    this.putEvents = this.putEvents.bind(this);
    this.getEvents = this.getEvents.bind(this);
    this.state = {
      //"events": eventData,
      events: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount() {
    this.getEvents();
    //this.putEvents();
  }
  //Ajax get
  async getEvents() {
    axios
      .get("http://localhost:5000/backend/events")
      .then((res) => {
        const events = res.data.map((obj) => obj);
        console.log(events);
        this.setState({
          events: events,
          isLoaded: true,
          error: null,
        });
      })
      .catch((err) => {
        this.setState({
          isLoaded: false,
          error: err,
        });
        console.log(err);
      });
  }
  //Ajax Put
  async putEvents(event) {
    return fetch(`http://localhost:5000/backend/event/${event.id}`, {
      headers: { "Content-Type": "application/json" },
      method: "PUT",
      body: JSON.stringify(event),
    });
  }

  handleInputChange() {
    // this.setState({
    //   value: event.target.checked,
    //   id: event.target.name
    // });
    // console.log(this.state);
  }
  handleButtonChange = () => {
    const eventsTable = document.getElementById("events-table");
    const currentState = this.state;
    for (let i = 0; i < eventsTable.rows.length; i++) {
      const pre = currentState.events[i].done || false;
      currentState.events[i].done =
        eventsTable.rows[i].children[0].children[0].checked;

      if (pre !== currentState.events[i].done) {
        // TODO salvalo
      }
      // eventsTable.rows[i].children[0].children[0].checked === true
      // ? currentState.events[i].done = true
      // // fs.readFile('data.json', 'utf8', function (err, data) {
      // //   if (err) throw err;
      // //   let json = JSON.parse(data);
      // //   json.push(currentState.events[i].done = true);
      // //   fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(json));
      // // })
      // : currentState.events[i].done = false
      // // fs.readFileSync('data.json', 'utf8', function(err, data) {
      // //   if (err) throw err;
      // //   let json = JSON.parse(data);
      // //   json.push(currentState.events[i].done = false);
      // //   fs.writeFileSync(path.resolve(__dirname, 'data.json'), JSON.stringify(json));
      // // })
      console.log(currentState.events[i]);
    }
    this.setState(currentState);
  };
  // handleButtonOwner = () => {
  //   const eventsTable = document.getElementById('events-table');
  //   const currentState = this.state;
  //   var owner;
  //   let counter = 0;

  //   for(var i = 0; i < eventsTable.rows.length; i++) {
  //     if(eventsTable.rows[i].children[0].children[0].checked === true){
  //       counter++;
  //       currentState.events[i].proprietario = owner;
  //     }
  //   }
  //   if(counter <= 0) {
  //     alert(`non hai selezionato nessun evento, per favore selezionane uno`);
  //   } else if(!owner){
  //     let myOwner = prompt(`Inserisci proprietario`);
  //     owner = myOwner;
  //     this.setState(currentState);
  //     console.log(owner);
  //     console.log(myOwner);
  //     console.log(currentState.events[0].proprietario);
  //   }
  // }
  handleButtonOwner = async () => {
    const eventsTable = document.getElementById("events-table");
    const currentState = this.state;
    var indexes = [];
    for (var i = 0; i < eventsTable.rows.length; i++) {
      if (eventsTable.rows[i].children[0].children[0].checked === true) {
        indexes.push(i);
      }
    }
    if (indexes.length === 0) {
      alert(`per favore seleziona casella`);
    } else {
      let owner = prompt(`inserisci proprietario`);
      for (const index of indexes) {
        const event = currentState.events[index];
        event.proprietario = owner;
        console.log(`currentState`, event);
        try {
          const response = await this.putEvents({ ...event });
          console.log(`response body frontend ${response.body}`);
          // let json = response.json();
          // console.log(json);
          // this.setState({
          //   isLoaded: true,
          //   events: json })
          // if (!response.ok) {
          //   throw new Error("Network error");
          // }
          // return response.blob();
        } catch (error) {
          console.error("There has been a problem:", error);
        }
      }
    }
    this.setState(currentState);
  };

  handleSelectAll = () => {
    const eventsTable = document.getElementById("events-table");
    for (let i = 0; i < eventsTable.rows.length; i++) {
      eventsTable.rows[i].children[0].children[0].checked =
        !eventsTable.rows[i].children[0].children[0].checked;
    }
  };
  // render() {
  //   return <>
  //     <HomePageHeader
  //     readButton={this.handleButtonChange}
  //     assignOwner={this.handleButtonOwner}/>
  //       <table>
  //         <TableHeader selectAll={this.handleSelectAll}/>
  //           <tbody id="events-table">
  //             {this.state.events.map((data, key) => {
  //             return (
  //                   <TableRow
  //                   className="unchecked"
  //                   owner={data.proprietario || 'none'}
  //                   // handleInputChange={this.handleInputChange}
  //                   done={data.done}
  //                   key={key}
  //                   id={key}
  //                   dispositivo={data.dispositivo}
  //                   IMEI={data.IMEI}
  //                   evento={data.evento}
  //                   timestamp= {data.timestamp}
  //                   />
  //                 )
  //             })}
  //           </tbody>
  //       </table>
  //   </>
  // };

  render() {
    const { error, isLoaded, events } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <>
          <HomePageHeader
            readButton={this.handleButtonChange}
            assignOwner={this.handleButtonOwner}
          />
          <table>
            <TableHeader selectAll={this.handleSelectAll} />
            <tbody id="events-table">
              {events.map((data, key) => {
                return (
                  <TableRow
                    className="unchecked"
                    owner={data.proprietario || "none"}
                    // handleInputChange={this.handleInputChange}
                    done={data.done}
                    key={key}
                    id={key}
                    dispositivo={data.dispositivo}
                    IMEI={data.IMEI}
                    evento={data.evento}
                    timestamp={data.timestamp}
                  />
                );
              })}
            </tbody>
          </table>
        </>
      );
    }
  }
}

//my header
class HomePageHeader extends React.Component {
  Read = (event) => {
    this.props.readButton(event);
  };

  Author = () => {
    this.props.assignOwner();
  };
  render() {
    return (
      <header className="header">
        <h2>Eventi dal campo</h2>
        <button onClick={this.Read}>Segna come gi?? letto</button>
        <button onClick={this.Author}>Assegna responsabile</button>
      </header>
    );
  }
}

//table header
class TableHeader extends React.Component {
  SelectAll = () => {
    this.props.selectAll();
  };
  render() {
    return (
      <>
        <thead>
          <tr>
            <th>
              <input type="checkbox" onChange={this.SelectAll}></input>{" "}
            </th>
            <th>letto/non letto</th>
            <th>Proprietario</th>
            <th>Nome dispositivo</th>
            <th>IMEI</th>
            <th>Evento</th>
            <th>Data</th>
          </tr>
        </thead>
      </>
    );
  }
}

//single event passing data with props to my tbody
class TableRow extends React.Component {
  // handleInputChange = (event) => {
  //   this.props.handleInputChange(event)
  // }
  render() {
    return (
      <tr className={this.props.done ? "checked" : "unchecked"}>
        <td>
          <input
            type="checkbox"
            onChange={this.handleInputChange}
            name={this.props.id}
          ></input>
        </td>
        <td>{this.props.done ? "letto" : "non letto"}</td>
        <td>{this.props.owner}</td>
        <td>
          <h5>{this.props.dispositivo}</h5>
        </td>
        <td>
          <h5>{this.props.IMEI}</h5>
        </td>
        <td>
          <h5>{this.props.evento}</h5>
        </td>
        <td>
          <p>{this.props.timestamp}</p>
        </td>
      </tr>
    );
  }
}
