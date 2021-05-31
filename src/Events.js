import React from "react";
import "./App.css";
let eventData = require("./data.json");

export class Events extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        read: false,
        checked: false
      };
    }
    handleInputChange = () => {
      console.log(TableRow.id.value);
    }
    handleButtonChange = () => {
      
    }
    render() {
      return <>
        <HomePageHeader readButton={this.handleButtonChange}/>
          <table>
            <TableHeader />
              <tbody>
                {eventData.map((data, key) => {
                return (
                      <TableRow className="unchecked"
                      handleInputChange={this.handleInputChange}
                      checked={this.state.checked}
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
  handleInputChange = () => {
    this.props.handleInputChange()
  }
  render () {
    return <tr style={this.props.key === this.props.id ? {backgroundColor: "red"} : {backgroundColor: "blue"}}>
    <td>
      <input type="checkbox" onChange={this.handleInputChange} value={this.props.checked} id={this.props.id}></input>
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