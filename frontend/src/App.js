import logo from './logo.svg';
import './App.css';
import {useEffect, useState, Component} from 'react';


  const buttonStyle = {
    borderRadius : '5px',
    borderWidth: '1px',
    textAlign: 'center',
    backgroundColor: 'azure',
  }

class ContactInfo extends Component {
  constructor(props) {
    super(props)
    this.state = {
        email: "",
        user : "",
        isEditing: "",
        userExists: "",
    }
    this.postUser = this.postUser.bind(this)
    this.putUser = this.putUser.bind(this)  
  }

  changeHandler = (event) => {
      this.setState({[event.target.name]: event.target.value})
  }

  async getUser() {
    await fetch('http://localhost:3000/User')
    .then(res => res.json())
    .then(json => {
      this.setState({ 
        user: json,
        email: json ? json.email : "",
        isEditing: !json,
        userExists: !!json
      })
    },
  )}

  refreshState() {
    this.getUser();
  }

  componentDidMount() {
    this.refreshState();
  }
            
  async postUser(event) {
    event.preventDefault();
    try {
        fetch('http://localhost:3000/User', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-type':'application/json',
            },
            body: JSON.stringify({
              email: this.state.email
            })
        })
        .then(this.refreshState(), 
        this.setState({userExists: true, isEditing: false}),
        this.props.updateEmail(this.state.email))
    } catch (e) {
        console.log(e)
    }
  }

  async putUser(event) {
    event.preventDefault();
    try {
        fetch('http://localhost:3000/User/' + this.state.user.id + '/edit', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-type':'application/json',
            },
            body: JSON.stringify({
              id: this.state.user.id,
              email: this.state.email
            })
        })
        .then(this.refreshState(),
        this.setState({isEditing: false}),
        this.props.updateEmail(this.state.email))      
    } catch (e) {
        console.log(e)
    }
  }

  render() {
    return(
      <div class="container">
          <div class="row align-items-center">
              <div class="col-md-6 order-md-1 text-center text-md-left pr-md-5">
                  <br/>
                    {this.state.isEditing ?
                      <div>
                        <h4>Enter Contact Info</h4>
                        <form onSubmit = {this.state.userExists ? this.putUser : this.postUser}>
                            <div class="input-group mb-3">
                              <input type = "email" class = "form-control" autoComplete = "off" name = 'email' value = {this.state.email} placeholder = 'Enter your email' onChange = {this.changeHandler} required/>
                              <div class="input-group-append"><button class="btn btn-primary" type="submit">Save</button></div>
                              {this.state.userExists ? 
                                <div class="input-group-append"><button class="btn btn-primary" onClick = {() => {this.setState({isEditing : !this.state.isEditing})}}>Cancel</button></div>
                                :
                                <span/>
                              }
                              </div>
                        </form>
                      </div>
                      :
                      <div>
                        <span><h4> Email: {this.state.user ? this.state.user.email : ""}  <button class="btn btn-primary" onClick = {() => {this.setState({isEditing : !this.state.isEditing})}}>Edit</button></h4></span>
                      </div>  
                    }
              </div>
          </div>
      </div>
    )
  }
}

const Queries = (props) => {
  return (
    <div class="container">
      <div class="row align-items-center">
          <div class="col-md-6 order-md-1 text-center text-md-left pr-md-5">
              <h3>Your Items</h3>
              <table class="table">
                  <thead>
                      <tr></tr>
                      <th scope="col">Item</th>
                      <th scope="col">Quantity</th>
                      <th scope="col">Edit</th>
                      <th scope="col">Delete</th>
                      <tr></tr>
                  </thead>
                  <tbody>
                    {props.queries.map(query => <Query query = {query} refreshState = {props.refreshState} />)}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  )
}

class Query extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false
    }
    this.deleteQuery = this.deleteQuery.bind(this)
  }

  toggleIsEditing = () => {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  async deleteQuery() {
    try { await fetch('http://localhost:3000/Query/' + this.props.query.id + '/delete', {
      method: 'post',
      headers: {
          'Accept': 'application/json',
          'Content-type':'application/json',
      }
    })
    .then(this.props.refreshState())
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
        this.state.isEditing ? <tr><td  colSpan = {8}><QueryForm query = {this.props.query} cancelEdit = {() => {this.setState({isEditing : !this.state.isEditing})}} inTable = {true}/></td></tr> :
          <tr>
            <td colSpan = "1"><span>{this.props.query.text}</span></td>
            <td colSpan = "1">{this.props.query.quantity}</td>
            <td colSpan = "1">
              <button style = {buttonStyle} onClick = {this.toggleIsEditing} >Edit</button>
            </td>
            <td colSpan = "1">
                <button style = {buttonStyle} onClick = {this.deleteQuery} >Delete</button>
            </td> 
          </tr>
    )
  }
}

class QueryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        text: "",
        quantity: 0
    }
    this.putQuery = this.putQuery.bind(this)
    this.postQuery = this.postQuery.bind(this)
  }

  changeHandler = (event) => {
      this.setState({[event.target.name]: event.target.value})
  }
            
  async postQuery(event) {
    event.preventDefault();
    try {
        fetch('http://localhost:3000/Query', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-type':'application/json',
            },
            body: JSON.stringify({
              text: this.state.text,
              quantity: this.state.quantity,
            })
        })
        .then(this.props.refreshState())
    } catch (e) {
        console.log(e)
    }
  }

  async putQuery(event) {
    event.preventDefault();
    try {
        fetch('http://localhost:3000/Query/' + this.props.query.id + '/edit', {
            method: 'post',
            headers: {
              'Accept': 'application/json',
              'Content-type':'application/json',
            },
            body: JSON.stringify({
              text: this.state.text,
              quantity: this.state.quantity,
            })
        })
        .then(this.props.cancelEdit(), this.props.refreshState())
    } catch (e) {
        console.log(e)
    }
    this.props.cancelEdit();
  }

  componentDidMount() {
    if (this.props.inTable) {
      this.setState({
        text: this.props.query.text,
        quantity: this.props.query.quantity
      })
    }
  }

  render() {
    return(
      <div class="container">
          <div class="row align-items-center">
              <div class="col-md-6 order-md-1 text-center text-md-left pr-md-5">
                  {this.props.inTable ? <span/> : <h3>Add New Item</h3>}
                  <form onSubmit = {this.props.inTable ? this.putQuery : this.postQuery}>
                      <div class="input-group mb-3">
                        <input class = "form-control" autoComplete = "off" name = 'text' value = {this.state.text} placeholder = 'Enter New Item and Desired Number of Listings' onChange = {this.changeHandler} required/>
                        <select type="number" name="quantity" value = {this.state.quantity} onChange = {this.changeHandler} required >
                          <option value="0">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select >
                        <div class="input-group-append"><button class="btn btn-primary" type="submit">Save</button></div>
                        {this.props.inTable ? 
                                <div class="input-group-append"><button class="btn btn-primary" onClick = {this.props.cancelEdit}>Cancel</button></div>
                                :
                                <span/>
                              }
                      </div>
                  </form>
              </div>
          </div>
      </div>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queries: [],
      email: ""
    }
    this.getQueries = this.getQueries.bind(this)
    this.refreshState = this.refreshState.bind(this)
    this.refreshState();
  }
  
  async getQueries() {
    await fetch('http://localhost:3000/Queries')
    .then(res => res.json())
    .then(json => {
      this.setState({ queries: json })
    },
  )}

  refreshState() {
    this.getQueries();
  }

  updateEmail(email) {
    this.setState({
      email: email
    })
  }

  componentDidMount() {
    this.refreshState();
  }

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"></link>
        < ContactInfo updateEmail = {this.updateEmail}/>
        {this.state.queries.length > 0 &&
          < Queries queries = {this.state.queries} refreshState = {this.refreshState}/>
        }
        < QueryForm refreshState = {this.refreshState} />
      </div>
    );
  }
}

export default App;
