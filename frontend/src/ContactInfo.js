import logo from './logo.svg';
import {useEffect, useState, Component} from 'react';

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
      this.refreshState = this.refreshState.bind(this);
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

  export default ContactInfo