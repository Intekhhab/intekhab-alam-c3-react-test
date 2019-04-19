import React from "react";
import axios from 'axios';

import User from "./user";

export class GoogleBoatTest extends React.Component {

  constructor(props) {
    super(props);
    this.getUsers = this.getUsers.bind(this);
    this.state = {
      users: [],
      setTimeout1: 'before',
      setTimeout2: 'before',
      setTimeout3: 'before',
      setTimeout4: 'before',
      setTimeout5: 'before',
    };
  }

  componentDidMount(){
    this.getUsers();
    setTimeout(() => {
      this.setState({setTimeout1: 'after'});
    }, 2000);
    setTimeout(() => {
      this.setState({setTimeout2: 'after'});
    }, 4000);
    setTimeout(() => {
      this.setState({setTimeout3: 'after'});
    }, 6000);
    setTimeout(() => {
      this.setState({setTimeout4: 'after'});
    }, 8000);
    setTimeout(() => {
      this.setState({setTimeout5: 'after'});
    }, 20000);
  }

  getUsers() {
    const url = 'https://reqres.in/api/users?page=1&per_page=10';

    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();
    this.axiosCancelToken = source;
    axios.get(url, {
      cancelToken: source.token
    })
    .then((response) => {
      console.log(response);
      let users = response.data && response.data.data || [];
      this.setState({users: [...this.state.users, ...users]});
    })
    .catch( (error) =>{
      console.log(error);
      //this.setState({users: []});
    });
  }

  render() {
    return (
      <div>
        <h1>{this.state.setTimeout1}</h1>
        <h1>{this.state.setTimeout2}</h1>
        <h1>{this.state.setTimeout3}</h1>
        <h1>{this.state.setTimeout4}</h1>
        <h1>{this.state.setTimeout5}</h1>
        {
            this.state.users.map((u, i) => {
              return (
                <User key={i} user={u} i={i} deleteUser={this.deleteUser} />
              )
            })
          }
      </div>
    );
  }
}