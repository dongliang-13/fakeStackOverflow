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
        };
        this.getTags = this.getTags.bind(this);
    }

    componentDidMount() {
        this.getTags(this.props.question.tags);
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
    
    render(){
        return (
            <div className = "bottomBorder">
                <div className = "question" onClick = {async() => {
                    await this.props.updateDataView(this.props.question);
                    await this.props.changePage("answerPage",this.props.question);
                }}>
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
                <div>
                    <button>Upvote Question</button>
                    <button>Downvote Question</button>
                </div>
                <Comments user = {this.props.user} question = {this.props.question} commentData = {this.props.data.comment}/>
            </div>
        );
    }
}
