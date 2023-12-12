import AskQuestionButton from "./askQuestionButton";
import FilterQuestion from "./filterQuestion";

export default function AllQuestionHeader(props){
    const isLoggedIn = (props.user.userType === 'registered' || props.user.userType === 'admin');
    return (
    <div id = "allQuestionHeader" className = "bottomBorder">
        <div id = "allQuestionHeaderSection">{props.headerText}</div>
        { isLoggedIn ? <AskQuestionButton 
            changePage = {props.changePage}
        /> : null }
        <div id="totalQuestion">{props.numQuestions} questions</div>
        <FilterQuestion 
            changefilterMode = {props.changefilterMode}
        />
    </div>
    );
}