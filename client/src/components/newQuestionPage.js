import { Component } from "react";
import axios from "axios";

export default class NewQuestionPage extends Component{
    constructor(props){
        super(props);
        this.state = {
            title : "",
            summary : "",
            text : "",
            tags : "",
            errorMsg : "",
        }
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    handleInputChange(name, value){
        if(name==="title"){
            this.setState({ title : value });
        }
        else if (name==="text"){
            this.setState({ text : value });
        }
        else if (name==="tag")
        {
            this.setState({ tags : value });
        }
        else{
            this.setState({ summary : value });
        }
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const question = {
            title: this.state.title,
            text: this.state.text,
            tags: this.state.tags.trim().split(" "),
            summary: this.state.summary,
        };
        if(question.title.length>50){
            this.setState({
                errorMsg: "Title over 50 characters"
            });
            return;
        }
        else if (question.summary.length>140){
            this.setState({
                errorMsg: "Summary over 140 characters"
            });
            return;
        }
        axios.post("http://127.0.0.1:8000/newQuestion", question, {withCredentials:true}).then(res=>{
            if(res.data.success){
                this.props.updateDataView();
                this.props.changePage("home");
            }
            else{
                this.setState({
                    errorMsg: res.data.errorMsg
                });
            }
        });
    }

    render() {
        return (
        <div>
          <form id="newQuestionPage" onSubmit={this.handleSubmit}>
            <label htmlFor="newQuestionPage-title">Question Title*</label>
            <p>
              <i>&nbsp;&nbsp;&nbsp;Limit title to 50 characters or less</i>
            </p>
            <input type="text" id="newQuestionPage-title" value = {this.state.questionTitle} onChange = {(e)=>{this.handleInputChange("title",e.target.value)}} required />
            
            <label htmlFor="newQuestionPage-summary">Summary*</label>
            <p>
              <i>&nbsp;&nbsp;&nbsp;Limit summary to 140 characters or less</i>
            </p>
            <input type="text" id="newQuestionPage-summary"  value = {this.state.username} onChange = {(e)=>{this.handleInputChange("summary",e.target.value)}} required />

            <label htmlFor="newQuestionPage-questionText">Question Text*</label>
            <p>
              <i>&nbsp;&nbsp;&nbsp;Add details</i>
            </p>
            <textarea id="newQuestionPage-questionText" value = {this.state.questionText} onChange = {(e)=>{this.handleInputChange("text",e.target.value)}} required />
    
            <label htmlFor="newQuestionPage-questionTags">Tags*</label>
            <p>
              <i>&nbsp;&nbsp;&nbsp;Add keywords separated by whitespace</i>
            </p>
            <input type="text" id="newQuestionPage-questionTags" value = {this.state.questionTag} onChange = {(e)=>{this.handleInputChange("tag",e.target.value)}} required />
            <span style ={{color:'red', fontSize:'20px'}}>{this.state.errorMsg}</span>
            <div id="newQuestionPage-finalLine">
              <button type = "submit" id="newQuestionPage-submitForm">Post Question</button>
              <span style={{ color: 'red' }}>* indicates mandatory fields</span>
            </div>
          </form>
        </div>
        );
      }
}