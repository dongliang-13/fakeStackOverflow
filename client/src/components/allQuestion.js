import { Component } from "react";
import AllQuestionHeader from "./allQuestionHeader";
import Questions from "./questions";

export default class AllQuestion extends Component {
    render(){
        this.copyData = this.props.getDisplayQuestions();
        return (
            <div id="allQuestion">
                <AllQuestionHeader 
                    headerText = "All Questions"
                    numQuestions = {this.copyData.question.length}
                    changefilterMode = {this.props.changefilterMode}
                    changePage = {this.props.setPage}
                    user = {this.props.user}/>
                <Questions data = {this.copyData} changePage = {this.props.setPage} updateDataView = {this.props.updateDataView}/>
            </div>
        );
    }
}