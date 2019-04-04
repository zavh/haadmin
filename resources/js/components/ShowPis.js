import React, {Component} from 'react';
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Link} from "react-router-dom";
import PiAllocForm from "./PiAllocForm";

function mapStateToProps (state)
{
  return { pis: state.pis };
}

const OrigOwner = (props)=> <span>{props.ownerId}</span>

class ConnectedShowPis extends Component {
    constructor(props){
        super(props);
        this.state={
            viewConfig:'all',
        }
        this.viewConfigChange = this.viewConfigChange.bind(this);
    }

    viewConfigChange(e){
        this.setState({viewConfig:e.target.value});
        e.target.checked = true;
        console.log(e.target.value);
    }

    render(){
            if(typeof this.props.pis !== 'undefined'){
                return (
                    <div>
                        <div className='small row'>
                            <div className='col-6'>
                                <div className="input-group input-group-sm mb-3">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" id="basic-addon1">Search</span>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Search for Pi ID" />
                                </div>
                            </div>
                            <div className='col-6'>
                                <div className="input-group input-group-sm mb-3">
                                    <div className="input-group-prepend">
                                        <div className="input-group-text">
                                            <input type="radio" name='pi_type' value='all' defaultChecked onChange={this.viewConfigChange}/>
                                        </div>
                                    </div>
                                    <div className="input-group-append">
                                        <span className="input-group-text" >All</span>
                                    </div>
                                    <div className="input-group-append">
                                        <div className="input-group-text">
                                            <input type="radio" name='pi_type' value='unconfigured' onChange={this.viewConfigChange}/>
                                        </div>
                                    </div>
                                    <div className="input-group-append">
                                        <span className="input-group-text" >Unconfigured</span>
                                    </div>
                                </div>                
                            </div>
                        </div>
                        <Router>
                        <table className='table table-sm table-striped table-dark'>
                            <tbody className='small'>
                            <tr className='text-center text-warning'><th>Pi ID</th><th>Customer ID</th><th>Customer Name</th><th>Status</th><th>Action</th></tr>
                            {this.props.pis.map((pi,index)=>
                                <tr key={index} className='small text-center'>
                                    <td>{pi.pi_id}</td>
                                    <td>
                                        <Switch>
                                            <Route path="/home" render={(props) => <OrigOwner {...props} ownerId={pi.customer_id} />} exact={true} />
                                            <Route path="/pi" render={(props) => <OrigOwner {...props} ownerId={pi.customer_id} />} exact={true} />
                                            <Route path={`/${index}/:id/edit`} render={(props) => <PiAllocForm {...props} pi_id={pi.id} pi_index={index} />} exact={true} />
                                            <Route render={(props) => <OrigOwner {...props} ownerId={pi.customer_id} />} exact={true} />
                                        </Switch>
                                    </td>
                                    <td>{pi.owner_name}</td>
                                    <td>{pi.status}</td>
                                    <td><Link to={`/${index}/${pi.id}/edit`} className='text-white'> Change Allocation </Link></td>
                                </tr>
                                )}
                            </tbody>
                        </table>
                        </Router>
                    </div>
                );
            }
            else {
                return (<div>Loading ...</div>);
            }
    }
}
const ShowPis = connect(mapStateToProps)(ConnectedShowPis);
export default ShowPis;