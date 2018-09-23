import React from "react";

export default class User extends React.Component {
	constructor(props) {
		super(props);
		this.deleteUser = this.deleteUser.bind(this);
	}

	deleteUser(i) {
		this.props.deleteUser(i);
	} 

	render() {
		var u = this.props.user || {};
		var i = this.props.i;
		return (
			<div key={i} className="col-sm-12 col-md-6 col-lg-4 text-center">
              <div><img className="img-circle avatar" src={u.avatar}/></div>
              <div className="p20 bgw">
                <div className="name">{u.first_name} {u.last_name}</div>
                <div  className="delete-link text-left"><a href="#" onClick={()=>{this.deleteUser(i)}}>Delete</a></div>
              </div>
            </div>
		);
	}
}