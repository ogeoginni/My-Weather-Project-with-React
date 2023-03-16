import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { MagnifyingGlass } from "react-loader-spinner";
import PresentDate from "./PresentDate";

export default function Weather(props) {
  const [loaded, setLoaded] = useState(false);
  const [answer, setAnswer] = useState("");
  const [city, setCity] = useState("");

  function weatherDetails(response) {
    setLoaded(true);
    setAnswer({
      name: response.data.name,
      date: new Date(response.data.dt * 1000),
      temperature: response.data.main.temp,
      feeling: response.data.main.feels_like,
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
    });
    //console.log(response.data);
  }

  function handleSubmit(event) {
    event.preventDefault();
    let apiKey = "be786a95f466ebdeaee3f262be3e25cd";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${props.defaultCity}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(weatherDetails);
  }

  function updateCity(event) {
    setCity(event.target.value);
  }

  let form = (
    <form onSubmit={handleSubmit}>
      <input
        id="city-input"
        type="search"
        placeholder="Search for a city"
        onChange={updateCity}
      />
      <input id="city-input" type="submit" value="Search" />
    </form>
  );

  let loading = (
    <MagnifyingGlass
      visible={true}
      height="100"
      width="90"
      ariaLabel="MagnifyingGlass-loading"
      wrapperStyle={{}}
      wrapperClass="MagnifyingGlass-wrapper"
      glassColor="#c0efff"
      color="#6d42c7"
    />
  );

  if (loaded) {
    return (
      <div className="temp-description">
        <ul>
          <li>
            {" "}
            <h1>
              <i className="fas fa-map-marker-alt"></i>
            </h1>
            <span className="current-city">{answer.name}</span>
          </li>
          <li>
            <PresentDate date={answer.date} />
          </li>
          <br />
          <li>Temperature: {Math.round(answer.temperature)}°C</li>
          <li>Feels like: {Math.round(answer.feeling)}°C</li>
          <li>Humidity: {answer.humidity}%</li>
          <li>Wind: {Math.round(answer.wind)} km/h</li>
          <li>
            <img src={answer.icon} alt={answer.description} />
          </li>
        </ul>
        <br />
        {form}
      </div>
    );
  } else {
    return [loading, form];
  }
}
