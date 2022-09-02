import './App.css';
import LongPolling from './LongPolling';
import EventSourcing from './EventSourcing';
import WebSockets from './WebSockets';

function App() {
  return (
    <div className="App">
      {/* <LongPolling /> */}
      {/* <EventSourcing /> */}
      <WebSockets />
    </div>
  );
}

export default App;
