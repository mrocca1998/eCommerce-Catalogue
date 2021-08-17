import logo from './logo.svg';
import './App.css';
import {useEffect, useState, Component} from 'react';

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
                    {props.queries.map(query => <Query query = {query} />)}
                  </tbody>
              </table>
          </div>
      </div>
    </div>
  )
}

const Query = (props) => {
  const buttonStyle = {
    borderRadius : '5px',
    borderWidth: '1px',
    textAlign: 'center',
    backgroundColor: 'azure',
  }

  //const [isEditing, setIsEditing] = useState(0);

  return (
      // isEditing ? <tr><QueryForm/></tr> :
        <tr>
          <td><span>{props.query.text}</span></td>
          <td>{props.query.quantity}</td>
          <td>
            <button style = {buttonStyle} >Edit</button>
          </td>
          <td>
              <button style = {buttonStyle}>Delete</button>
          </td> 
        </tr>
  )
}

class QueryForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
        text: "",
        quantity: 0,
    }
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
              isEditing: 0
            })
        })
        .then(this.props.refreshState())
    } catch (e) {
        console.log(e)
    }
  }

  render() {
    return(
      <div class="container">
          <div class="row align-items-center">
              <div class="col-md-6 order-md-1 text-center text-md-left pr-md-5">
                  <h3>Add New Item</h3>
                  <form onSubmit = {this.postQuery}>
                      <div class="input-group mb-3">
                        <input class = "form-control" autoComplete = "off" name = 'text' value = {this.state.text} placeholder = 'Enter New Item and Desired Number of Listings' onChange = {this.changeHandler} required/>
                        <select type="number" name="quantity" value = {this.state.quantity} onChange = {this.changeHandler} required >
                          <option value="1">0</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3</option>
                          <option value="4">4</option>
                          <option value="5">5</option>
                        </select >
                        <div class="input-group-append"><button class="btn btn-primary" type="submit">Save</button></div>
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
      queries: []
    }
    this.getQueries = this.getQueries.bind(this)
    this.refreshState = this.refreshState.bind(this)
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

  componentDidMount() {
    this.refreshState();
  }

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"></link>
        {/* < ContactInfo /> */}
        < Queries queries = {this.state.queries}/>
        < QueryForm refreshState = {this.refreshState} />
      </div>
    );
  }
}

export default App;
