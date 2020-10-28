import React from 'react';
import Logo1 from "./logo.jpg"


class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading:false
    }
  }

 onlogout =()=>{
  this.setState({loading:true})
  const token = window.sessionStorage.getItem('token');
  if (token) {
    fetch('https://manage-your-task.herokuapp.com/user/logout', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      }
    })
      .then(response => {
        if(response.status===200){
          this.props.onRouteChange('signin')
          this.setState({loading:false})
        }
      })
      .catch(console.log)
  }
 }

  render (){
    return(
      <div>
      <nav className="dt w-100 bg-lightest-blue border-box pa3 ph5-ns">
      <p className="dtc v-mid white link dim" >
      <img src={Logo1} className="dib w4 h3" alt="Site Name"/>
      </p>
     <div className=" nav2 f6 fw7 ttu tracked">
     <p className="link dim dark-blue f6 dib mr2 ml7" >Daily Tasks</p>
     <p onClick={this.onlogout} className=" tr pointer dark-blue f6 mt0 " >Log Out</p>
      </div>
      {this.state.loading?<h1 className=" tr dark-blue f6 mt0 ">loging out...</h1>:""}
    </nav>
  </div>
    )
  }
   
  
}

export default Nav;
