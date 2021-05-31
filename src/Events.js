import React from "react";
import "./App.css";

let eventData = require("./data.json");

export class Events extends React.Component {
    constructor(props) {
      super(props);
      this.state = {events: []};
      setTimeout(() => {
        console.log(eventData);
        // this.state = {"events": eventData} //load mock data
        this.setState({"events": eventData})
      }, 1000)
      this.handleInputChange = this.handleInputChange.bind(this);
    }
    handleInputChange(event) {
      // this.setState({
      //   value: event.target.checked,
      //   id: event.target.name
      // });
      // console.log(this.state);
    }
    handleButtonChange = () => {
      const eventsTable = document.getElementById('events-table');
      const currentState = this.state;
      for(let i = 0; i < eventsTable.rows.length; i++) {
        if(eventsTable.rows[i].children[0].children[0].checked === true) {
          currentState.events[i].done = true;
        } else {
          currentState.events[i].done = false;
        }
        console.log(eventsTable.rows[i].children[0].children[0].checked);
      }
      setTimeout(() => {
        for(let i = 0; i < eventsTable.rows.length; i++) {
          eventsTable.rows[i].children[0].children[0].checked = false;
        }
      }, 1000)
      this.setState(currentState);
    }
    handleButtonOwner = () => {

    }
    render() {
      return <>
        <HomePageHeader
        readButton={this.handleButtonChange} 
        assignOwner={this.handleButtonOwner}/>
          <table>
            <TableHeader />
              <tbody id="events-table">
                {this.state.events.map((data, key) => {
                return (
                      <TableRow
                      className="unchecked"
                      handleInputChange={this.handleInputChange}
                      done={data.done}
                      key={key}
                      id={key}
                      dispositivo={data.dispositivo}
                      IMEI={data.IMEI} 
                      evento={data.evento}
                      timestamp= {data.timestamp}
                      />
                    )
                })}
              </tbody>
          </table>
      </>
    };
};

//my header
class HomePageHeader extends React.Component {
  Read = (event) => {
    this.props.readButton(event)
  }

  Author = () => {
    this.props.assignOwner()
  }
  render() {
    return <header className="header">
    <h2>Eventi dal campo</h2>
    <button onClick={this.Read}>Segna come già letto</button>
    <button onClick={this.Author}>Assegna responsabile</button>
  </header>
  };
};

//table header
const TableHeader = () => {
  return (
    <>
      <thead>
        <tr>
          <th></th>
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
};

//single event passing data with props to my tbody
class TableRow extends React.Component {
  handleInputChange = (event) => {
    this.props.handleInputChange(event)
  }
  render () {
    return <tr className={this.props.done ? "checked" : "unchecked"}>
    <td>
      <input
      type="checkbox"
      onChange={this.handleInputChange}
      name={this.props.id}></input>
    </td>
    <td>
      {this.props.done ? "letto" : "non letto"}
    </td>
    <td>
    {/* Owner creato dinamicamente */}
    </td>
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
  };
};