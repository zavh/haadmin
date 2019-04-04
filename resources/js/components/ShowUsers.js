import React, {Component} from 'react';
import { connect } from "react-redux";

function mapStateToProps (state)
{
  return { users: state.users };
}

class ConnectedShowUsers extends Component {
    render(){
        if(typeof this.props.users !== 'undefined'){
            return (
                <ul className="list-group">
                    {this.props.users.map((user,index)=>
                        <li className="list-group-item m-0 p-0" key={index}>{user.name}</li>
                        )}
                    
                </ul>
            );
        }
        else {
            return (<div>Loading ...</div>);
        }
    }
}

const ShowUsers = connect(mapStateToProps)(ConnectedShowUsers);
export default ShowUsers;