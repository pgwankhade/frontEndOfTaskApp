import React from 'react';
import { Link } from 'react-router-dom';

class LogIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading:false,
      error:false
    }
  }

  emailChange = (event) => {
    this.setState({email: event.target.value})
  }

  passwordChange = (event) => {
    this.setState({password: event.target.value})
  }

  saveAuthTokenInSessions = (token) => {
    window.sessionStorage.setItem('token', token);
  }
 
  onSubmit = () => {
    this.setState({loading:true})

      fetch('https://manage-your-task.herokuapp.com/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        email: this.state.email,
        password: this.state.password
      })
      })
        .then(response => response.json())
        .then(user => {
          if (user.token) {
            this.saveAuthTokenInSessions(user.token)
            this.props.onRouteChange('home');
            this.setState({loading:false})
          }
        })
        .catch(error => {
          if (error) {
            this.setState({error:true})
            this.setState({loading:false})
          }
        })
    }
  

  render() {
    return (
      <div>
        {this.state.loading?<h1>Signing In...</h1>:""}
        <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  onChange={this.emailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                   onChange={this.passwordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmit}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
              />
              {this.state.error?<h1 className="f6 red">ooopppss please check ur username password...</h1>:""}
            </div>
            <div className="lh-copy mt3">
           <Link to='/register'><p  className="f6 link dim black db pointer">Register</p> </Link>  
            </div>
          </div>
        </main>
      </article>
      </div>
      
    );
  }
}

export default LogIn;