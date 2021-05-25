import React from "react";
import "./App.css";
let eventData = require("./data.json");

export const Events = () => {
    //if(eventData.length === 0) return <h1>Nessun evento</h1>
    return (
        <>
          <HomePageHeader />
              <table>
                <TableHeader />
                  <tbody>
                    {eventData.map((data, key) => {
                    return (
                          <TableBody key={key}
                          dispositivo={data.dispositivo}
                          IMEI={data.IMEI} 
                          evento={data.evento}
                          timestamp= {data.timestamp}/>
                        )
                    })}
                  </tbody>
              </table>
        </>
    );
};

//my header
class HomePageHeader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      read: false
    };
    this.HandleReadBtn = this.HandleReadBtn.bind(this);
  }
  HandleReadBtn = () => {
    console.log(`clicked ` + this.state.read)
    this.setState(state => ({
      read: !state.read
    }));
  }
  render() {
    return <header className="header">
    <h2>Eventi dal campo</h2>
    <button onClick={this.HandleReadBtn}>Segna come già letto</button>
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
class TableBody extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  dateConversion(time) {
    return new Date(time);
  };
  render () {
    return <tr>
    <td>
      <input type="checkbox" className="checkbox[]"></input>
    </td>
    <td>
    {/* Owner creato dinamicamente */} "Questo sara' l'owner"
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