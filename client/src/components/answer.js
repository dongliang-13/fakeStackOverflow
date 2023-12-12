import { Component } from "react";
import Asker from "./asker";

export default class Answer extends Component{
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

    render(){
        const currentAnswer = this.props.answer.find( (val) => {
            return val._id === this.props.answerId;
        });
        return (
            <div className = "answer bottomBorder">
                <div className ="answer-text">
                    {currentAnswer.text}
                </div>
                <div className ="answer-answerer">
                    <Asker color = "green" name = {currentAnswer.answerBy} date = {currentAnswer.answerDate} action = "answered"/>
                </div>
            </div>
        );
    }
}