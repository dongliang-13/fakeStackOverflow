export default function AskQuestionButton(props){
    return (
        <div id = "askQuestion">
            <button id = "askQuestionButton" onClick = {()=>{props.changePage("newQuestionPage")}}>Ask Question</button>
        </div>
    );
}