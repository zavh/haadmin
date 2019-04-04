import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import StyledLi from './StyledLi';
import { BrowserRouter as Router, Route, Switch} from "react-router-dom";
import ShowUsers from './ShowUsers';
import Users from './functional/Users';
import Pis from './functional/Pis';
import ShowPis from './ShowPis';
import { Provider } from "react-redux";
import store from "../redux/store/index";
  
  function About() {
    return <h2>About</h2>;
  }
  
export default class MainPanel extends Component {
    constructor(props){
        super(props);
        this.state = {
            panel:'Pi Configuration',
            menuItems: ['Pi Configuration', 'User Management', 'Create a User'],
            links:['pi', 'um', 'cu'],
        }
        this.activeLinkChange = this.activeLinkChange.bind(this);
    }
    activeLinkChange(al){
        this.setState({panel:al});
    }
    render() {
        return (
        <Provider store={store}>
            <Users />
            <Pis />
            <div className="container-fluid">
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="card shadow-sm">
                            <div className="card-header">Admin Panel</div>
                            <div className="card-body">
                                <Router>
                                    <div className="row justify-content-center">
                                        <div className="col-md-4 my-1">
                                            <ul className="list-group">
                                                {this.state.menuItems.map((item,index) =>
                                                    <StyledLi 
                                                        item={item}
                                                        target={this.state.panel}
                                                        key={index}
                                                        linkto={this.state.links[index]}
                                                        onClick={this.activeLinkChange}
                                                        />
                                                )}
                                            </ul>
                                        </div>
                                        <div className="col-md-8 my-1">
                                            <Switch>
                                                <Route path="/home/" component={ShowPis}/>
                                                <Route path="/pi/" component={ShowPis}/>
                                                <Route path="/um/" component={ShowUsers} />
                                                <Route path="/cu/" component={About} />
                                            </Switch>
                                        </div>
                                    </div>
                                </Router>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Provider>
        );
    }
}

if (document.getElementById('root')) {
    ReactDOM.render(<MainPanel />, document.getElementById('root'));
}
