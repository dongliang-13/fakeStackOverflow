import { Component } from "react";
import Asker from "./asker";
import axios from "axios";
import AnswerComments from "./answerComments";

export default class Answer extends Component{
    constructor(props){
        super(props);
        this.state = {
            upvotes: [],
            downvotes: [],
            answerBy: "",
        }
        this.textConvert = this.textConvert.bind(this);
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    componentDidMount(){
        const answer = this.props.answer.find( (a) => {
            return a._id === this.props.answerId;
        });
        this.setState({
            upvotes : answer.upvotes,
            downvotes : answer.downvotes,
            answerBy: answer.answerBy
        });
    }

    async upvote(){
        if(this.state.upvotes.includes(this.props.user.username) || this.state.downvotes.includes(this.props.user.username)){
            window.alert("You have already upvoted/downvoted");
        }
        else{
            await axios.post("http://127.0.0.1:8000/upvoteAnswer", {aid:this.props.answerId, uid:this.state.answerBy}, {withCredentials:true}).then((res)=>{
                if(res.data.success){
                    this.setState({
                        upvotes: [...this.state.upvotes, this.props.user.username],
                    });
                    window.alert("Upvote Success!!");
                }
                else{
                    window.alert("You Must Have 50 or More Reputation to Vote");
                }
            })
        }
    }

    async downvote(){
        if(this.state.upvotes.includes(this.props.user.username) || this.state.downvotes.includes(this.props.user.username)){
            window.alert("You have already upvoted/downvoted");
        }
        else{
            await axios.post("http://127.0.0.1:8000/downvoteAnswer", {aid:this.props.answerId, uid:this.state.answerBy}, {withCredentials:true}).then((res)=>{
                if(res.data.success){
                    this.setState({
                        downvotes: [...this.state.downvotes, this.props.user.username],
                    });
                    window.alert("Downvote Success!!");
                }
                else{
                    window.alert("You Must Have 50 or More Reputation to Vote");
                }
            })
        }
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
        console.log(this.props);
        const currentAnswer = this.props.answer.find( (val) => {
            return val._id === this.props.answerId;
        });
        return (
            <div className = "bottomBorder">
                <div className = "answer">
                    <div className ="answer-text">
                        {currentAnswer.text}
                    </div>
                    <div className ="answer-answerer">
                        <Asker color = "green" name = {currentAnswer.answerBy} date = {currentAnswer.answerDate} action = "answered"/>
                    </div>
                </div>
                <div className = "questionVote">
                    <button onClick = {()=>this.upvote()}>Upvote Question</button>
                    <button onClick = {()=>this.downvote()}>Downvote Question</button>
                </div>
                <AnswerComments
                    user = {this.props.user}
                    answer = {this.props.answer}
                    answerId = {this.props.answerId}
                    commentData = {this.props.commentData}
                    />
            </div>
        );
    }
}