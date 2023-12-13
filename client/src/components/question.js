import { Component } from "react";
import Tag from "./tag";
import Asker from "./asker";
import axios from "axios";
import Comments from "./comments"

export default class Question extends Component{
    constructor(props){
        super(props);
        this.state = {
            tags: [],
            upvotes: [],
            downvotes: [],
        };
        this.getTags = this.getTags.bind(this);
        this.upvote = this.upvote.bind(this);
        this.downvote = this.downvote.bind(this);
    }

    componentDidMount() {
        this.getTags(this.props.question.tags);
        this.setState({
            upvotes: this.props.question.upvotes,
            downvotes: this.props.question.downvotes
        });
    }

    async getTags(tagsArr) {
        const tagPromises = tagsArr.map(async (tag, index) => {
            const result = await axios.get(`http://127.0.0.1:8000/getTag/${tag}`, {withCredentials:true});
            tag = result.data.name;
            return <Tag key={index} tag={tag}/>
        });
        const tags = await Promise.all(tagPromises);
        this.setState({ tags });
    }

    async upvote(){
        if(this.state.upvotes.includes(this.props.user.username) || this.state.downvotes.includes(this.props.user.username)){
            window.alert("You have already upvoted/downvoted");
        }
        else{
            await axios.post("http://127.0.0.1:8000/upvoteQuestion", {qid:this.props.question._id, uid:this.props.question.askedBy}, {withCredentials:true}).then((res)=>{
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
            await axios.post("http://127.0.0.1:8000/downvoteQuestion", {qid:this.props.question._id, uid:this.props.question.askedBy}, {withCredentials:true}).then((res)=>{
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
    
    render(){
        return (
            <div className = "bottomBorder">
                <div className = "question" onClick = {async() => {
                    await this.props.updateDataView(this.props.question);
                    await this.props.changePage("answerPage",this.props.question);
                }} style ={{backgroundColor:"lightgrey"}}>
                    <div className="question-stat">
                        <div className="question-numOfAnswer">
                            {this.props.question.answers.length} answers
                        </div>
                        <div className="question-numOfView">
                            {this.props.question.views} views
                        </div>
                    </div>
                    <div className="question-info">
                        <div className="question-title">
                            {this.props.question.title}
                        </div>
                        <div className="question-tags">
                            {this.state.tags}
                        </div>
                    </div>
                    <div className="question-asker">
                        <Asker color = "red" name = {this.props.question.askedBy} date = {this.props.question.askedDateTime} action = "asked"/>
                    </div>
                </div>
                <div className = "questionVote">
                    <button onClick = {()=>this.upvote()}>Upvote Question</button>
                    <button onClick = {()=>this.downvote()}>Downvote Question</button>
                </div>
                <Comments user = {this.props.user} question = {this.props.question} commentData = {this.props.data.comment}/>
            </div>
        );
    }
}
