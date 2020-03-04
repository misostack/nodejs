import React, { Component } from 'react'
import { connect } from 'react-redux'
import { doLogin, doLogout } from '../store/actions'

function mapDispatchToProps(dispatch) {
  return {
    doLogin: user => dispatch(doLogin(user))
  };
}

class AuthForm extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }  

  handleChange(event) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(event) {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.doLogin({ email: email, password: password });
  }

  render() {
    const { email, password } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <div>
          <label htmlFor="title">Email</label>
          <input
            type="text"
            id="email"
            value={email}
            onChange={this.handleChange}
          />
        </div>
        <div>
          <label htmlFor="title">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={this.handleChange}
          />
        </div>        
        <button type="submit">SAVE</button>
      </form>      
    )
  }
}

const AuthFormContainer = connect(
  null,
  mapDispatchToProps
)(AuthForm);

export default AuthFormContainer;