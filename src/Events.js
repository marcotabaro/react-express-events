import "./App.css";
let eventData = require("./data.json");

export const Events = () => {
    if(eventData.length === 0) return <h1>Nessun evento</h1>
    return (
        <>
            <HomePageHeader />
            <div className='events-container'>
                {eventData.map((data, key) => {
                    return (
                        <div key={key}>
                            <Event key={key}
                            dispositivo={data.dispositivo}
                            IMEI={data.IMEI} 
                            evento={data.evento}
                            timestamp={data.timestamp}/>
                        </div>
                    );
                })}
            </div>
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

//single event passing data with props
const Event = ({ dispositivo, IMEI, evento, timestamp }) => {
    if(!dispositivo) return <h1>Nessun evento da visualizzare</h1>
    return (
        <table>
      <tbody>
        <tr>
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
      </tbody>
    </table>
    );
};