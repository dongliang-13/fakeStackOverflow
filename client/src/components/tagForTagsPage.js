export default function TagForTagsPage(props){
    return (
        <div className = "tagForTagsPage">
            <div className ="tagForTagsPage-name" onClick = {()=>{
                props.changeSearchResult("["+props.tagName+"]");
            }}>
                <u>{props.tagName}</u>
            </div>
            <div className = "tagForTagsPage-amount">
                {props.tagAmount} questions
            </div>
        </div>
    )
}