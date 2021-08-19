import logo from './logo.svg';
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
                      {props.queries.map(query => <Query query = {query} refreshState = {props.refreshState} />)}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    )
  }
  
  const buttonStyle = {
    borderRadius : '5px',
    borderWidth: '1px',
    textAlign: 'center',
    backgroundColor: 'azure',
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
      this.sendNewsletter = this.sendNewsletter.bind(this);
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
      event.preventDefault()
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
      this.props.cancelEdit()
    }

    async sendNewsletter(event) {
      event.preventDefault()
      try {
        fetch('http://localhost:3000/' + this.props.user + '/send', {
          method: 'get'
      })
      } catch(e) {
        console.log(e)
      }
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
                    {!this.props.inTable ? <button class="btn btn-primary" onClick = {this.sendNewsletter}>Generate Newsletter</button> : <span/>}
                </div>
            </div>
        </div>
      )
    }
  }

export {Queries, QueryForm}