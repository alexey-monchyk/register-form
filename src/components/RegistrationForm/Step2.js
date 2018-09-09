import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchSecondInfo } from '../../actions';
import ProgressBar from './ProgressBar';

class Step2 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      day: '',
      month: '',
      year: '',
      gender: 'male',
      about: '',
      dateError: '',
      dayValid: false,
      monthValid: false,
      yearValid: false,
      formValid: false,
      showError: false
    }
  }

  validateField = (fieldName, value) => {
    let dateValidationErrors = this.state.dateError;
    let dayValid = this.state.dayValid;
    let monthValid = this.state.monthValid;
    let yearValid = this.state.yearValid;

    switch (fieldName) {
      case 'day':
        dayValid = value >= 1 && value <= 31;
        dateValidationErrors = dayValid ? '' : ' is incorrect';
        break;

      case 'month':
        monthValid = value >= 1 && value <= 12;
        dateValidationErrors = monthValid ? '' : ' is incorrect';
        break;

      case 'year':
        yearValid = typeof Number.parseInt(value) === 'number' && 2018 - value >=18;
        dateValidationErrors = yearValid ? '' : ' is incorrect';  
        break;

      default:
        break;
    }

    this.setState({
      dateError: dateValidationErrors,
      dayValid,
      monthValid,
      yearValid
    }, this.validateForm);
  }

  validateForm = () => {
    const { dayValid, monthValid, yearValid } = this.state;
    this.setState({ formValid: dayValid && monthValid && yearValid });
  }

  onDateChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  onGenderChange = (e) => {
    this.setState({
      gender: e.target.value
    });
  }

  onAboutChange = (e) => {
    this.setState({
      about: e.target.value
    });
  }

  emptyValidateForm = () => {
    let fieldValidationErrors = this.state.formErrors;

    if (!this.state.day || !this.state.month || !this.state.year) {
      fieldValidationErrors = ' required';
    }

    this.setState({
      formErrors: fieldValidationErrors
    });
  }

  onSubmit = (e) => {
    e.preventDefault();

    this.emptyValidateForm();

    if (!this.state.formValid) {
      this.validateForm();
      this.setState({
        showError: true
      });
    } else {
      this.props.fetchSecondInfo({
        date: Date.parse(`${this.state.year}.${this.state.month - 1}.${this.state.day}`),
        gender: this.state.gender,
        about: this.state.about
      });
      this.props.history.push('/step3');
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit} className="form">
          <ProgressBar 
            width={"66%"}
          />
          <label>Date of birth { this.state.showError && this.state.dateError }</label>
          <input 
            type="text"
            autoFocus
            className="date-input"
            value={this.state.day}
            onChange={this.onDateChange}
            placeholder="DD"
            name="day"
          />
          <input 
            type='text'
            className="date-input"
            value={this.state.month}
            onChange={this.onDateChange}
            placeholder="MM"
            name="month"
          />
          <input 
            type="text"
            className="date-input"
            value={this.state.year}
            onChange={this.onDateChange}
            placeholder="YYYY"
            name="year"
          />
          <input 
            type="radio"
            value="male"
            checked={this.state.gender === "male"}
            onChange={this.onGenderChange}
          />Male
          <input 
            type="radio"
            value="female"
            checked={this.state.gender === "female"}
            onChange={this.onGenderChange}
          />Female
          <input 
            type="radio"
            value="unspecified"
            checked={this.state.gender === "unspecified"}
            onChange={this.onGenderChange}
          />Unspecified
          <label>Where did you hear about?</label>
          <select onChange={this.onAboutChange}>
            <option></option>
            <option value="from_friends">From friends</option>
            <option value="from_social">From social networks</option>
            <option value="from_university">From university</option>
          </select>
          <Link to="/">Back</Link>
          <button type="submit">Next</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, { fetchSecondInfo })(Step2);