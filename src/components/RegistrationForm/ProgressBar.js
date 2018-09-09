import React, { Component } from 'react'

export default class ProgressBar extends Component {
  state = {
    width: this.props.width
  }

  render() {
    return (
      <div>
        <h3 className="sign-up">Signup</h3>
        <div className="progress-round">
          <hr className="progress-bar" style={this.state}></hr>
        </div>
      </div>
    )
  }
}
