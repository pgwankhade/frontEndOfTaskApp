import React from 'react';
import { Link } from 'react-router-dom';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      name: '',
      age:'',
      loading:false,
      error:false
    }
  }

  onNameChange = (event) => {
    this.setState({name: event.target.value})
  }

  onEmailChange = (event) => {
    this.setState({email: event.target.value})
  }

  onPasswordChange = (event) => {
    this.setState({password: event.target.value})
  }

  onAgeChange = (event) => {
    this.setState({age: event.target.value})
  }

  saveAuthTokenInSessions = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmitSignIn = () => {

    this.setState({loading:true})
    fetch('https://manage-your-task.herokuapp.com/user', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
        name: this.state.name,
        age:this.state.age
      })
    })
    .then(response => response.json())
    .then(user => {
      if (user.token) {
        console.log(user)
        this.saveAuthTokenInSessions(user.token)
        this.props.onRouteChange('home');
        this.setState({loading:false})
      }else{
        this.setState({error:true})
        this.setState({loading:false})
      }
    })
    .catch(error => {
      console.log("error")
    })
  }

  render() {
    return (

      <div>
        {this.state.loading?<h1>Wellcome.. Please wait...</h1>:""}
      <div className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 fw6 ph0 mh0">Join Us Here</legend>
               <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Name</label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="text"
                  name="name"
                  id="name"
                  required
                />
              </div>
               <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Age</label>
                <input
                  onChange={this.onAgeChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="number"
                  name="age"
                  id="age"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                <input
                  onChange={this.onEmailChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                <input
                   onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </fieldset>
            <div className="">
              <input
                onClick={this.onSubmitSignIn}
                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
            {this.state.error?<h1 className="f6 red">ooopppss..All fields are required, make sure password length is min 7 and Password cannot contain "password"...</h1>:""}
            <div className="lh-copy mt3">
           <Link to='/'><p className="f6 link dim black db pointer">Log In</p></Link>  
            </div>
          </div>
        </main>
      </div>
      </div>
      
        );
  }}


export default Register;