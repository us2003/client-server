import './App.css';
import LongPolling from './LongPolling';
import EventSourcing from './EventSourcing';

function App() {
  return (
    <div className="App">
      {/* <LongPolling /> */}
      <EventSourcing />
    </div>
  );
}

export default App;
