import "./App.css";
import { eventData } from "./data";

export const Events = () => {
    return (
        <div className='events-container'>
            <h1>Eventi dal campo</h1>
            {eventData.map((data, key) => {
                return (
                    <div key={key}>
                        {`${data.company}, ${data.ticket}, ${data.stockPrice}, ${data.timeElapsed}`}
                    </div>
                );
            })}
        </div>
    )
}