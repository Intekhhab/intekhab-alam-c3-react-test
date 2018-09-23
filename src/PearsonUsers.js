import React, { Component } from "react";

import axios from 'axios';

import User from "./user";

export class PearsonUsers extends Component {
  constructor(props) {
    super(props);

    this.getUsers = this.getUsers.bind(this);
    this.removeDuplicateUsers = this.removeDuplicateUsers.bind(this);
    this.deleteUser = this.deleteUser.bind(this);
    this.showInTable = this.showInTable.bind(this);
    this.getTable = this.getTable.bind(this);

    this.state = {
      users: [
        {
          id: 4,
          first_name: "Eve",
          last_name: "Holt",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/marcoramires/128.jpg"
        },
        {
          id: 5,
          first_name: "Charles",
          last_name: "Morris",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/stephenmoon/128.jpg"
        },
        {
          id: 6,
          first_name: "Tracey",
          last_name: "Ramos",
          avatar:
            "https://s3.amazonaws.com/uifaces/faces/twitter/bigmancho/128.jpg"
        }
      ],
      showInTable: false
    };
  }

  componentDidMount(){
    //this.getUsers();
  }

  removeDuplicateUsers() {
      // I have considered combination of first_name and last_name is unique for each user
      var obj = {};
      var users = this.state.users;

      for ( var i=0; i < users.length; i++ ) {
          let name = users[i].first_name + users[i].first_name;
          obj[name] = users[i];
      }
      //console.log(obj);
      users = new Array();
      for ( var key in obj )
          users.push(obj[key]);
      this.setState({users});
  }

  deleteUser(index) {
    this.state.users.splice(index, 1);
    this.setState({users: this.state.users});
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

  getTable() {
    var users = [...this.state.users];
    var html = (<table className="table table-hover">
              <thead>
                <tr>
                  <th>Avatar</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                
                {
                  users.map((u, i) => {
                    return (
                      <tr key={i} 
                      className="cursor-pointer">

                        <td><img src={u.avatar}/></td>
                        <td>{u.first_name}</td>
                        <td>{u.last_name}</td>
                        <td>
                            <button type="button" onClick={()=>{this.deleteUser(i)}} className="btn btn-danger">Delete</button>
                        </td>
                      </tr>
                    )
                  })
                }

              </tbody>
            </table>
        )
    return html;
  }


  showInTable() {
    this.setState({showInTable: !this.state.showInTable});
  }
  

  render() {
    let users = this.state.users || [];
    return (
      <div className="container">
        
        <div className="pearon-users">
          <h1>Pearson User Management</h1>
          <div className="row mb20 action-btn">
            <div className="col-6 col-sm-5">
              <button type="button" onClick={this.getUsers} className="btn btn-primary">Get User from service</button>
            </div>
            <div className="col-6 col-sm-5 text-right">
              <button type="button" onClick={this.removeDuplicateUsers} className="btn btn-success">Remove Duplicate Users</button>
            </div>
            <div className="col-6 col-sm-5">
              <button type="button" className="btn btn-info">Total Users {users.length}</button>
            </div>
            <div className="col-6 col-sm-5 text-right">
              <button type="button" onClick={this.showInTable} className="btn btn-primary">
                {!this.state.showInTable ? "Show in Table" : "Show in Grid"}
              </button>
            </div>
          </div>

          <div className="row" id="userList">
          {
            !this.state.showInTable && users.map((u, i) => {
              return (
                <User key={i} user={u} i={i} deleteUser={this.deleteUser} />
              )
            })
          }
          </div>

          {this.state.showInTable && this.getTable()}

        </div>
      </div>
    );
  }
}

/*

*/
