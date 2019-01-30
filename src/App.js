import React, { Component } from 'react';
import Input from './components/Input';
import GeolocationButton from './components/GeolocationButton';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { appid } from './config';
import DayResults from './components/DayResults';
import './App.css';
import countryData from 'country-region-data';

library.add(faCompass);

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    weatherData: [],
    city: ''
  };

  componentDidUpdate(prevProps, prevState) {
    const { latitude, longitude } = this.state;

    if (prevState.latitude !== latitude || prevState.longitude !== longitude) {
      this.fetchWeatherData(latitude, longitude);
    }
  }

  render() {
    return (
      <div className="App">
        <div className="header">
          <h1>WEATHER APP</h1>
          <Input
            placeholder="enter city"
            type="text"
            handleSubmit={this.handleSubmit}
            countryData={countryData}
          />
          <GeolocationButton id="geolocation" handleClick={this.handleClick} />
        </div>
        <div className="a">
          <DayResults data={this.state.weatherData} city={this.state.city} />
        </div>
      </div>
    );
  }

  handleClick = id => {
    if (id === 'geolocation') {
      navigator.geolocation.getCurrentPosition(position => {
        // console.log(position);
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      });
    }
  };

  handleSubmit = (e, locationInput, countryCode) => {
    e.preventDefault();
    if (locationInput && countryCode) {
      const fullLocation = `${locationInput},${countryCode}`;
      //console.log(fullLocation);
      this.fetchWeatherData(null, null, fullLocation);
    }
  };

  fetchWeatherData = (latitude, longitude, location) => {
    const url = latitude
      ? `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${appid}&units=metric`
      : `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${appid}&units=metric`;

    axios
      .get(url)
      .then(res => {
        this.setState({
          weatherData: Object.entries(res.data.main),
          city: res.data.name
        });
      })
      .catch(err => {
        console.log(err.message);
      });
  };
}

export default App;
