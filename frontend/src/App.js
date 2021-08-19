import logo from './logo.svg';
import './App.css';
import {useEffect, useState, Component} from 'react';
import { Queries, QueryForm } from './Query.js';
import ContactInfo from './ContactInfo';


const buttonStyle = {
  borderRadius : '5px',
  borderWidth: '1px',
  textAlign: 'center',
  backgroundColor: 'azure',
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      queries: [],
      user: ""
    }
    this.getQueries = this.getQueries.bind(this)
    this.refreshState = this.refreshState.bind(this)
    this.updateUser = this.updateUser.bind(this)
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

  updateUser(email) {
    this.setState({
      user: email
    })
  }

  componentDidMount() {
    this.refreshState();
    document.title = "eCommerce Catalogue"
  }

  render() {
    return (
      <div className="App">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous"></link>
        < ContactInfo updateUser = {this.updateUser}/>
        {this.state.queries.length > 0 &&
          < Queries queries = {this.state.queries} refreshState = {this.refreshState}/>
        }
        < QueryForm user = {this.state.user} refreshState = {this.refreshState} />
      </div>
    );
  }
}

export default App;
