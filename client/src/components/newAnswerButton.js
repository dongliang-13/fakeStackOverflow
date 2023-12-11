export default function NewAnswerButton(props){
    return (
        <button id = "newAnswerButton" onClick = {()=>{props.changePage("newAnswerPage", props.question)}}>Answer Question</button>
    )
}