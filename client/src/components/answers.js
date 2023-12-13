import { Component } from "react";
import Answer from "./answer";
import NewAnswerButton from "./newAnswerButton";

export default class Answers extends Component{
    constructor(props) {
        super(props);
        this.state = {
            answerPage: 0,
        };
    }

    render(){
        const isLoggedIn = (this.props.user.userType === 'registered' || this.props.user.userType === 'admin');
        const arr = this.props.question.answers.slice().reverse().slice(this.state.answerPage*5, (this.state.answerPage+1)*5).map( (ans,index) => 
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
                <div style = {{display:"flex", justifyContent:"center", marginTop:"20px"}} className = "answer-button">
                    {this.state.answerPage > 0 && <button onClick = {()=> this.setState({answerPage: this.state.answerPage-1})}>prev</button>}
                    {this.props.question.answers.length > 5*(this.state.answerPage+1) && <button onClick = {()=> this.setState({answerPage: this.state.answerPage+1})}>next</button>}
                </div>
                {isLoggedIn ? <NewAnswerButton key = {"newAnswerButton"} changePage = {this.props.changePage} question = {this.props.question}/> : null}
            </div>
        );
    }
}
