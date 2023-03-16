import "./App.css";
import Weather from "./Weather";

function App() {
  return (
    <div className="App">
      <div className="container">
        <h1>My Weather Search Engine</h1>
        <Weather defaultCity="Abuja" />
        <br />
        <small className="footer">
          <a
            href="https://github.com/ogeoginni/My-React-Weather-App/"
            target="_blank"
            rel="noreferrer"
          >
            Open-sourced
          </a>
          | by Ogechukwu Oginni
        </small>
      </div>
    </div>
  );
}

export default App;
