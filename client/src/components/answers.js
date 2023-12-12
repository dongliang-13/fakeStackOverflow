import { Component } from "react";
import Answer from "./answer";
import NewAnswerButton from "./newAnswerButton";

export default class Answers extends Component{
    render(){
        const isLoggedIn = (this.props.user.userType === 'registered' || this.props.user.userType === 'admin');
        const arr = this.props.question.answers.map( (ans,index) => 
            <Answer 
                question = {this.props.question}
                answerId = {ans}
                key = {index}
                index = {index}
                answer = {this.props.answer}
            /> 
        );
        return (
            <div id = "answers">
                {arr}
                {isLoggedIn ? <NewAnswerButton key = {"newAnswerButton"} changePage = {this.props.changePage} question = {this.props.question}/> : null}
            </div>
        );
    }
}

