import Question from "./question";

export default function Questions(props){
    const questions = props.data.question.map( (value,index) => (
        <Question key={index} question={value} data={props.data} changePage = {props.changePage} updateDataView = {props.updateDataView}/>
    ));

    return (
        <div id = "questions">
            {questions}
        </div>
    );
}