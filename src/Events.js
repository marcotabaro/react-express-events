import React from "react";
import "./App.css";
let eventData = require("./data.json");

export class Events extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        read: false,
        select: false
      };
    }
    handleInputChange = () => {

    }
    render() {
      return <>
        <HomePageHeader readButton={this.handleInputChange}/>
          <table>
            <TableHeader />
              <tbody>
                {eventData.map((data, key) => {
                return (
                      <TableRow handleChange={this.handleInputChange}
                      key={key}
                      id={key}
                      dispositivo={data.dispositivo}
                      IMEI={data.IMEI} 
                      evento={data.evento}
                      timestamp= {data.timestamp}/>
                    )
                })}
              </tbody>
          </table>
      </>
    };
};

//my header
class HomePageHeader extends React.Component {
  Read = () =>{
    this.props.readButton()
  }
  render() {
    return <header className="header">
    <h2>Eventi dal campo</h2>
    <button onClick={this.Read}>Segna come già letto</button>
    <button>Assegna responsabile</button>
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
  handleChange = () => {
    this.props.handleChange()
  }
  render () {
    return <tr>
    <td>
      <input type="checkbox" onChange={this.handleChange} id={this.props.id}></input>
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