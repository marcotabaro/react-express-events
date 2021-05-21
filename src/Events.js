import "./App.css";
let eventData = require("./data.json");

export const Events = () => {
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
    if(!dispositivo) return <div />
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
            <h4>{evento}</h4>
          </td>
          <td>
            <p>{timestamp}</p>
          </td>
        </tr>
      </tbody>
    </table>
    );
};