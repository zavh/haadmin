import React, {Component} from 'react';
import axios from 'axios';
import { connect } from "react-redux";
import { getPis } from "../../redux/actions/index";

function mapDispatchToProps(dispatch) {
    return {
      getPis: pis=> dispatch(getPis(pis))
    };
  }

class ConnectedPis extends Component {
    componentDidMount(){
        axios
        .get("/pis")
        .then(response => {
            return response;
        })
        .then(json => {
            this.props.getPis(json.data.pis);
          });
    }
    render(){
        return (
            null
        );
    }
}

const Pis = connect(null, mapDispatchToProps)(ConnectedPis);
export default Pis;