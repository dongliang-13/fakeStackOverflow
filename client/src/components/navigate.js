import React from 'react';
import SearchParam from './searchParam';
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
        const isLoggedIn = (this.props.user.userType === 'registered' || this.props.user.userType === 'admin');
        return <div id = "navigate" className = "bottomBorder">
            {isLoggedIn ? <span id = "navigate-hi">Hi, {this.props.user.username}</span> : null}
            <button onClick = {()=>{this.props.setPage("home")}}>All Questions</button>
            <button onClick = {()=>{this.props.setPage("tagsPage")}}>All Tags</button>
            {isLoggedIn ? <button onClick = {()=>{this.props.setPage("profile")}}>Profile</button> : null}
            <SearchParam 
                changeSearchResult = {this.props.changeSearchResult}
            />
            {isLoggedIn ? <button onClick = {()=>this.logout()}>Logout</button> : null}
        </div>
    }
    
}