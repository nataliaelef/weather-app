import React, { Component } from 'react';

class Input extends Component {
  state = {
    locationInput: '',
    countryCode: null
  };
  render() {
    const {
      placeholder,
      type,
      handleSubmit,
      countryData
    } = this.props;

    return (
      <form
        onSubmit={e => {
          handleSubmit(e, this.state.locationInput, this.state.countryCode);
        }}
      >
        <select name="countryCode" onChange={this.handleInput}>
          <option>Please select country</option>
          {countryData.map(country => {
            return (
              <option
                key={country.countryShortCode}
                value={country.countryShortCode}
              >
                {country.countryName}
              </option>
            );
          })}
        </select>
        <input
          name="locationInput"
          className="inputBox"
          placeholder={placeholder}
          type={type}
          onChange={this.handleInput}
        />

        <button>Submit</button>
      </form>
    );
  }

  handleInput = e => {
    const { name, value } = e.target;
    //console.log(name, value);
    this.setState({ [name]: value });
  };
}

export default Input;
