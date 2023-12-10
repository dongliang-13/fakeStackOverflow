import axios from 'axios';
import React from 'react';

export default class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
        }
        this.changePage = this.changePage.bind(this);
        this.login = this.login.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    changePage(page){
        this.props.setPage(page);
    }

    login(e){
        e.preventDefault();
        const loginInfo = {
            email : this.state.email,
            password : this.state.password,
        }
        axios.post("http://127.0.0.1:8000/login", loginInfo, { withCredentials: true }).then(response=>{
            this.changePage('home');
            alert(response.data);
        }).catch(error => {
            console.log(error);
        })
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value,
        });
    }

    handlePasswordChange(e){
        this.setState({
            password: e.target.value,
        });
    }
    
    render(){
        if(this.props.user == null){
            return (
                <div>Loading</div>
            )
        }
        else if (this.props.user.userType === 'guest') {
            return(
                <div>
                    <h1>Welcome to Fake Stack Overflow</h1>
                    <button>Home</button><br /><br />
                    <form onSubmit = {this.login} style={{border:'1px solid black', padding:'10px'}}>
                    <label htmlFor="email">Email:</label><br />
                    <input type="text" id="email" name="email" value = {this.state.email} onChange={this.handleEmailChange} required/><br />
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" value = {this.state.password} onChange={this.handlePasswordChange} required/><br /><br />
                    <input type="submit" value="Login" /><br />
                    </form> <br />
                    <h1 id = "register-info">{this.props.registerInfo}</h1>
                    <button onClick = {()=>this.changePage('register')}>Register</button>
                </div>
            )
        } 
        else {
            return(
                <div>
                    <h1>Welcome back, {this.props.user.username}</h1>
                    <button>Logout</button>
                    <button onClick = {()=>this.changePage('home')}>Home Page</button>
                    <button onClick = {()=>this.changePage('profile')}>Profile Page</button>
                </div>
            )
        }
    }
}
