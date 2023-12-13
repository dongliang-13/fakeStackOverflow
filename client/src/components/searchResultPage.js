import { Component } from "react";
import AllQuestionHeader from "./allQuestionHeader";
import Questions from "./questions";

export default class SearchResultPage extends Component{
    render(){
        this.copyData = this.props.getDisplayQuestions();
        return (
        <div id="allQuestion">
            <AllQuestionHeader 
                user = {this.props.user}
                numQuestions = {this.copyData.question.length} 
                headerText = "Search Results"
                changePage = {this.props.changePage}
                changefilterMode = {this.props.changefilterMode}
            />
            <Questions data = {this.copyData} changePage = {this.props.changePage} updateDataView = {this.props.updateDataView} user = {this.props.user}/>
        </div>
        );
    }
}