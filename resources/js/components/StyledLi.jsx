import React, { Component } from 'react';
import { Link } from "react-router-dom";

export default class StyledLi extends Component {
    constructor(props){
        super(props);

        this.onClick = this.onClick.bind(this);
    }
    onClick(){
        this.props.onClick(this.props.item);
    }
    render(){
        if(this.props.item === this.props.target){
            return(
                <li className="list-group-item bg-success">
                    <Link to={this.props.linkto} className='text-white'> {this.props.item} </Link>
                </li>
            );
        }
        else {
            return(
                <li className="list-group-item">
                    <Link to={this.props.linkto} onClick={this.onClick}> {this.props.item} </Link>
                </li>
            )
        }
    }
}