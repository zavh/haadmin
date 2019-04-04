import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { addUsers } from "../../redux/actions/index";

function mapDispatchToProps(dispatch) {
    return {
      addUsers: users=> dispatch(addUsers(users))
    };
  }

class ConnectedUsers extends Component {
    componentDidMount(){
        axios
        .get("/users")
        .then(response => {
            return response;
        })
        .then(json => {
            this.props.addUsers(json.data.users);
          });
    }
    render(){
        return (
            null
        );
    }
}

const Users = connect(null, mapDispatchToProps)(ConnectedUsers);
export default Users;