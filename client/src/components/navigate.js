import React from 'react';
import axios from 'axios';

export default class Navigate extends React.Component{
    constructor(props){
        super(props);
        this.logout = this.logout.bind(this);
    }
    
    async logout(){
        await axios.post('http://127.0.0.1:8000/logout', {}, { withCredentials: true });
        this.props.setUser({userType:'guest', username: null});
        this.props.setPage('welcome');
    }

    render(){
        const isLoggedIn = this.props.user.userType === 'registered';
        return <div id = "navigate" className = "bottomBorder">
            {isLoggedIn ? <span id = "navigate-hi">Hi, {this.props.user.username}</span> : null}
            <button onClick = {()=>{this.props.setPage("home")}}>All Questions</button>
            <button onClick = {()=>{this.props.setPage("tag")}}>All Tags</button>
            <input type = "text" placeholder='search'></input>
            {isLoggedIn ? <button onClick = {()=>this.logout()}>Logout</button> : null}
        </div>
    }
    
}