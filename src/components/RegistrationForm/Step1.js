import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchFirstInfo } from '../../actions';
import ProgressBar from './ProgressBar';

class Step1 extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirm: '',
      formErrors: { email: '', password: '', confirm: '' },
      emailValid: false,
      passwordValid: false,
      confirmValid: false,
      formValid: false,
      showError: false
    }
  }

  validateField = (fieldName, value) => {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let passwordValid = this.state.passwordValid;
    let confirmValid = this.state.confirmValid;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? <p className="correct">{'email'}</p> : 'email is invalid';
        break;

      case 'password':
        passwordValid = value.length >= 6;
        fieldValidationErrors.password = passwordValid ? <p className="correct">{'password'}</p> : 'password is too short';
        break;

      case 'confirm':
        confirmValid = value === this.state.password;
        fieldValidationErrors.confirm = confirmValid ? <p className="correct">{'confirm password'}</p> : 'confirmation is invalid';
        break;

      default:
        break;
    }

    this.setState({
      formErrors: fieldValidationErrors,
      emailValid,
      passwordValid,
      confirmValid
    }, this.validateForm);
  }

  validateForm = () => {
    const { emailValid, passwordValid, confirmValid } = this.state;
    this.setState({ formValid: emailValid && passwordValid && confirmValid });
  }

  onUserInput = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value }, () => {
      this.validateField(name, value);
    });
  }

  emptyValidateForm = () => {
    let fieldValidationErrors = this.state.formErrors;
    if (!this.state.email) {
      fieldValidationErrors.email = 'email is required';
    }
    if (!this.state.password) {
      fieldValidationErrors.password = 'password is required';
    }
    if (!this.state.confirm) {
      fieldValidationErrors.confirm = 'confirmation is required';
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
      const { email, password, confirm } = this.state;
      this.props.fetchFirstInfo({
        email,
        password,
        confirm
      });
      this.props.history.push('/step2');
    }
  }

  render() {
    const { formErrors } = this.state;

    return (
      <div>
        
        <form className="form" onSubmit={this.onSubmit}>
        <ProgressBar 
          width={"33%"}
        />
        <label>{this.state.showError ? <p className="danger">{formErrors.email}</p> : 'email'}</label>
          <input
            type="text"
            autoFocus
            className="text-input"
            value={this.state.email}
            onChange={this.onUserInput}
            name="email"
            autoComplete="off"
          />
          <label>{this.state.showError ? <p className="danger">{formErrors.password}</p> : 'password'}</label>
          <input
            type="password"
            className="text-input"
            value={this.state.password}
            onChange={this.onUserInput}
            name="password"
          />
          <label>{this.state.showError ? <p className="danger">{formErrors.confirm}</p> : 'confirm password'}</label>
          <input
            type="password"
            className="text-input"
            value={this.state.confirm}
            onChange={this.onUserInput}
            name="confirm"
          />
          <hr className="bottom-line"></hr>
          <div className="btn">
          <button
            className="next-btn"
            type="submit"
          >Next</button>
          <img src="./images/right-arrow.png" alt="right-arrow" />
          </div>
        </form>
      </div>
    )
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps, { fetchFirstInfo })(Step1);
