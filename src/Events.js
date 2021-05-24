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
                          timestamp={data.timestamp}/>
                    );
                })};
                </tbody>
                </table>
        </>
    );
};

//my header
const HomePageHeader = () => {
    return (
      <header className="header">
        <h2>Eventi del campo</h2>
      </header>
    );
  };

//table header
const TableHeader = () => {
  return (
    <>
      <thead>
        <tr>
          <th></th>
          <th>Assegnatario</th>
          <th>Nome dispositivo</th>
          <th>IMEI</th>
          <th>Data</th>
        </tr>
      </thead>
    </>
  );
};

//single event passing data with props to my tbody
const TableBody = ({ dispositivo, IMEI, evento, timestamp }) => {
    if(!dispositivo) return <h1>Nessun evento da visualizzare</h1>
    return (
          <tr>
            <td>
              <input type="checkbox" className="checkbox"></input>
            </td>
            <td>
              
            </td>
            <td>
              <h5>{dispositivo}</h5>
            </td>
            <td>
              <h5>{IMEI}</h5>
            </td>
            <td>
              <h5>{evento}</h5>
            </td>
            <td>
              <p>{timestamp}</p>
            </td>
          </tr>
    );
};