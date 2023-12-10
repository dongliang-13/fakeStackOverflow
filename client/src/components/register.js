import React from 'react';
import axios from 'axios';

export default class Register extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            confirmPw: '',
            errorMsg: '',
        }
        this.changePage = this.changePage.bind(this);
        this.register = this.register.bind(this);
        this.handleUsernameChange = this.handleUsernameChange.bind(this);
        this.handleEmailChange = this.handleEmailChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
        this.handleConfirmPwChange = this.handleConfirmPwChange.bind(this);
    }

    changePage(page){
        this.props.setPage(page);
    }

    async register(e){
        e.preventDefault();
        const {email, username, password, confirmPw} = this.state;
        if(password !== confirmPw){
            this.setState({
                errorMsg: `Passwords don't match`,
            });
        }
        else if (password.includes(email)){
            this.setState({
                errorMsg: `Password shouldn't include your email`,
            });
        }
        else if (password.includes(username)){
            this.setState({
                errorMsg: `Password shouldn't include your username`,
            });
        }
        else{
            const newUser = {
                email: email,
                username: username,
                password: password
            }
            axios.post('http://127.0.0.1:8000/register', newUser, { withCredentials: true })
                .then(response => {
                    if(response.data === 'successful'){
                        this.changePage('welcome');
                        this.props.setRegisterInfo("Registration Successful");
                        setTimeout(()=>{this.props.setRegisterInfo("")}, 5000)
                    }
                    else{
                        this.setState({
                            errorMsg: response.data,
                        });
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }
    }

    handleUsernameChange(e){
        this.setState({
            username: e.target.value,
        })
    }

    handleEmailChange(e){
        this.setState({
            email: e.target.value,
        })
    }

    handlePasswordChange(e){
        this.setState({
            password: e.target.value,
        })
    }

    handleConfirmPwChange(e){
        this.setState({
            confirmPw: e.target.value,
        })
    }

    render(){
        return (
            <div>
                <h1>Register Form</h1>
                <form onSubmit = {this.register} style={{border:'1px solid black', padding:'10px'}}>
                    <label htmlFor="username">Username:</label><br />
                    <input type="text" id="username" name="username" value = {this.state.username} onChange={this.handleUsernameChange} required/><br />
                    <label htmlFor="email">Email:</label><br />
                    <input type="text" id="email" name="email" value = {this.state.email} onChange={this.handleEmailChange} required/><br />
                    <label htmlFor="password">Password:</label><br />
                    <input type="password" id="password" name="password" value = {this.state.password} onChange={this.handlePasswordChange} required/><br />
                    <label htmlFor="confirmPw">Confirm Password:</label><br />
                    <input type="password" id="confirmPw" name="confirmPw" value = {this.state.confirmPw} onChange = {this.handleConfirmPwChange} required/><br /><br />
                    <input type="submit" value="Register" /><br />
                    <div id = 'errorMessage'>{this.state.errorMsg}</div>
                </form> <br />
                <button onClick = {()=>this.changePage('welcome')}>Back</button>
            </div>
        )
    }
}