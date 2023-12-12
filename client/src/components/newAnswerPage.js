import { Component } from "react";
import axios from 'axios';

export default class NewAnswerPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            text : ""
        };
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(value){
        this.setState({ text : value });
    }

    handleSubmit = async (e) => {
        e.preventDefault();
        const newAns = {
            text: this.state.text,
            question: this.props.question
        }
        await axios.post("http://127.0.0.1:8000/newAnswer", {newAns}, {withCredentials:true});
        await this.props.updateModel();
        this.props.changePage("answerPage",this.props.question);
    }
    

    render(){
        return(
        <form id="newAnswerPage" onSubmit={this.handleSubmit}>
            <label htmlFor="newAnswerPage-answerText">Answer Text*</label>
            <textarea id="newAnswerPage-answerText" onChange = {(e)=>{this.handleInputChange(e.target.value)}} required />
    
            <div id="newAnswerPage-finalLine">
              <button type = "submit" id="newAnswerPage-submitForm">Post Answer</button>
              <span style={{ color: 'red' }}>* indicates mandatory fields</span>
            </div>
        </form>
        )
    }
}