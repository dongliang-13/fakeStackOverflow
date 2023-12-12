import { Component } from "react";
import QuestionInfo from "./questionInfo";
import Answers from "./answers";

export default class AnswerPage extends Component{
    componentDidMount(){
        this.props.updateModel();
    }
    render(){
        return(
            <div id = "answerPage">
                <QuestionInfo question = {this.props.question} changePage = {this.props.changePage} user = {this.props.user}/>
                <Answers question = {this.props.question} changePage = {this.props.changePage} answer = {this.props.answer} user = {this.props.user}/>
            </div>
        )
    }
}