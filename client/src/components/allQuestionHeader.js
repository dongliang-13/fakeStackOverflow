import AskQuestionButton from "./askQuestionButton";
import FilterQuestion from "./filterQuestion";

export default function AllQuestionHeader(props){
    return (
    <div id = "allQuestionHeader" className = "bottomBorder">
        <div id = "allQuestionHeaderSection">{props.headerText}</div>
        <AskQuestionButton 
            changePage = {props.changePage}
        />
        <div id="totalQuestion">{props.numQuestions} questions</div>
        <FilterQuestion 
            changefilterMode = {props.changefilterMode}
        />
    </div>
    );
}