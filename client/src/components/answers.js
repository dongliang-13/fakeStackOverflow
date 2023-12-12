import { Component } from "react";
import Answer from "./answer";
import NewAnswerButton from "./newAnswerButton";

export default class Answers extends Component{
    constructor(props){
        super(props);
        this.state = {
            answers: [],
        };
    }

    async componentDidMount() {
        const answers = await this.props.getAnswers();
        this.setState({ answers });
    }

    render(){
        const isLoggedIn = (this.props.user.userType === 'registered' || this.props.user.userType === 'admin');
        const arr = this.state.answers.map( (ans,index) => 
            <Answer 
                question = {this.props.question}
                answer = {ans}
                key = {index}
                index = {index}
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

