import { Component } from "react";
import AskQuestionButton from "./askQuestionButton";
import Asker from "./asker";

export default class QuestionInfo extends Component{
    constructor(props){
        super(props);
        this.textConvert = this.textConvert.bind(this);
    }

    textConvert(text) {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        let newText = text;
        let match;
      
        while ((match = regex.exec(text)) !== null) {
          const linkName = match[1];
          const linkUrl = match[2];
          const linkElement = `<a href="${linkUrl}" target="_blank">${linkName}</a>`;
          newText = newText.replace(match[0], linkElement);
        }
      
        return (
          `<div>${newText}</div>`
        );
    }

    componentDidMount(){
        document.getElementById("questionInfo-text").innerHTML = this.textConvert(this.props.question.text);
    }

    render(){
        const isLoggedIn = (this.props.user.userType === 'registered' || this.props.user.userType === 'admin');
        return(
            <div id="questionInfo" className = "bottomBorder">
                <div id = "questionInfo-numAnswer">
                    {this.props.question.answers.length} answers
                </div>
                <div id="questionInfo-title">
                    {this.props.question.title}
                </div>
                <div id="questionInfo-askQuestion">
                    {isLoggedIn ? <AskQuestionButton changePage = {this.props.changePage}/> : null }
                </div>
                <div id="questionInfo-numView">
                    {this.props.question.views} views
                </div>
                <div id="questionInfo-text">
                    
                </div>
                <div id="questionInfo-asker">
                    <Asker color = "red" name = {this.props.question.askedBy} date = {this.props.question.askedDateTime} action = "asked"/>
                </div>
            </div>
        );
    }
}