import React, { Component } from 'react';
import Input from './components/Input';
import GeolocationButton from './components/GeolocationButton';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faCompass } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { appid, client_id } from './config';
import DayResults from './components/DayResults';
import './App.css';
import countryData from 'country-region-data';

library.add(faCompass);

class App extends Component {
  state = {
    latitude: null,
    longitude: null,
    weatherData: [],
    city: '',
    photoData: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { latitude, longitude } = this.state;
    if (prevState.latitude !== latitude || prevState.longitude !== longitude) {
      this.fetchWeatherData(latitude, longitude);
    }
  }

  render() {
    const {city, weatherData, photoData} = this.state;
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
          <DayResults data={weatherData} city={city} photoData={photoData} />
        </div>
      </div>
    );
  }

  handleClick = id => {
    if (id === 'geolocation') {
      navigator.geolocation.getCurrentPosition(position => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      }, err => console.dir(err));
    }
  };

  handleSubmit = (e, locationInput, countryCode) => {
    e.preventDefault();
    if (locationInput && countryCode) {
      const fullLocation = `${locationInput},${countryCode}`;
      this.fetchWeatherData(null, null, fullLocation);
    }
  };

  fetchWeatherData = (latitude, longitude, location) => {
    //Check if info from Geolocate or Text Input
    const url = latitude
      ? `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${appid}&units=metric`
      : `http://api.openweathermap.org/data/2.5/weather?q=${location}&APPID=${appid}&units=metric`;
      let weatherData;
      let city;
    //Make get request for Weather info, then request for photo
    axios
      .get(url)
      .then(res => {
        weatherData = Object.entries(res.data.main);
        city = res.data.name;
        return axios.get(`https://api.unsplash.com/search/photos?query=${city}&client_id=${client_id}`)
      })
      .then(res => {
        this.setState({
          weatherData,
          photoData: res.data.results[0],
          city,
        })
      })
      .catch(err => {
        console.log(err.message);
      });
  };

}
export default App;