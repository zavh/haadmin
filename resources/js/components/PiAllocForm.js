import React, {Component} from 'react';
import { connect } from "react-redux";
import { editPi } from "../redux/actions/index";
import axios from 'axios';

function mapStateToProps (state)
{
  return { 
      users: state.users,
      pis: state.pis,
     };
}

function mapDispatchToProps(dispatch) {
    return {
      editPi: pis=> dispatch(editPi(pis))
    };
  }

class ConnectedPiAllocForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            cus_id:0,
            cus_index:-1,
        };
        
        this.handleCusChange = this.handleCusChange.bind(this);
        this.cancelForm = this.cancelForm.bind(this);
        this.submitForm = this.submitForm.bind(this);
    }
    cancelForm(){
        this.props.history.push('/pi');
    }
    submitForm(){
        let pi_id = this.props.pi_id;
        let target_pi = this.props.pis[this.props.pi_index];
        if(this.state.cus_id === 0){
            alert("Customer change hasn't been made");
            return;
        }

        if(target_pi.cus_id == this.state.cus_id ){
            alert('Nothing to change!');
            return;
        }
        axios
        .put(`/pis/${this.props.match.params.id}`, {
            user_id: this.state.cus_id
        })
        .then(response => {
            console.log(response);
        })
        const payload = {
                index: this.props.pi_index,
                cus_id: this.props.users[this.state.cus_index].id,
                id: pi_id,
                customer_id: this.props.users[this.state.cus_index].customer_id,
                owner_name: this.props.users[this.state.cus_index].name,
                status: 'Allocated',
            };
        this.props.editPi(payload);
        this.props.history.push('/pi');
    }

    handleCusChange(e){
        this.setState(
            {
                cus_id:e.target.value,
                cus_index:e.target.selectedIndex,
            });
    }

    render(){
        return(
            <div className="d-flex justify-content-center">
                <select onChange={this.handleCusChange}>
                    {this.props.users.map((user, index)=>
                        <option key={index} value={user.id}>{user.customer_id}</option>
                        )
                    }
                </select>
                <span className='mx-2'>
                    <button className="badge badge-pill badge-success mx-1" onClick={this.submitForm}>✔</button>
                    <button className="badge badge-pill badge-danger mx-1" onClick={this.cancelForm}>✘</button>
                </span>

            </div>
        );
    }
}

const PiAllocForm = connect(mapStateToProps, mapDispatchToProps)(ConnectedPiAllocForm);
export default PiAllocForm;