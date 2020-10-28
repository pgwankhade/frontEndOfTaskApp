import React from 'react';
import './Dailytask.css'

class Dailytask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
     addtask:'',
     task:[]
    }
  }

  componentDidMount() {
    
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('https://manage-your-task.herokuapp.com/task', {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(tasks => {
          this.setState({ task: tasks})
        })
        .catch(console.log)
    }
  }

  deletetask =(taskid)=>{

    const token = window.sessionStorage.getItem('token');
    this.setState({addtask:''})
    if (token) {
      fetch('https://manage-your-task.herokuapp.com/task/'+taskid, {
        method: 'delete',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          if(data){
            fetch('https://manage-your-task.herokuapp.com/task/', {
              method: 'get',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
              .then(response => response.json())
              .then(tasks => {
                this.setState({ task: tasks})
                
            })
              .catch(console.log)
          }
        })
        .catch(console.log)
    }
    
  }

  onTaskchange = (event) => {
    this.setState({addtask: event.target.value})
    event.preventDefault();
  }

onSubmit =(event)=>{
  console.log('working add')
  const token = window.sessionStorage.getItem('token');
  if (token) {
    fetch('https://manage-your-task.herokuapp.com/task/', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token
      },
      body: JSON.stringify({
        description : this.state.addtask
      })
    })
      .then(response => response.json())
      .then(data => {
        if(data){
          fetch('https://manage-your-task.herokuapp.com/task/', {
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': token
            }
          })
            .then(response => response.json())
            .then(tasks => {this.setState({ task: tasks})})
            .catch(console.log)
        }
      })
      .catch(console.log)
  }
  this.setState({addtask:''})
  event.preventDefault();
}

  render() {
    return (
          <div> 
             <div  className="App flex items-center mt3 mw5 mw7-ns center bg-light-gray pa2 ph5-ns ">
                <input
                  onChange={this.onTaskchange}
                  placeholder="add task.."
                  className="center pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100"
                  value={this.state.addtask}
                  type="text"
                  name="name"
                  id="name"
                />
                <button 
                onClick={this.onSubmit}
                className="ml2 mt2 f6 link dim ph3 pv2 mb2 dib white bg-dark-blue"
                >Add</button>
              </div>
      <div className="App3">
              {
                this.state.task.map((item,i) =>(
              <div className="App2">
                  <ul className="list pl0 mt0 measure center">
                  <li className="flex items-center lh-copy pa3 ph0-l bb b--black-10">
                  <div className="pl3 flex-auto">
                <span className="f6 db black-70">{this.state.task[i].description}</span>
                  </div>
                  <div>
                  <button onClick={()=>this.deletetask(this.state.task[i]._id)} className="mr6 f6 pointer link dim ph3 pv2 mb2 dib white bg-dark-blue" type="button" id={i} value="task">Done</button>
                  </div>
                 </li>
                 </ul>
             </div>
                ))
              }
       </div>
    </div>
    );
  }
}

export default Dailytask;
