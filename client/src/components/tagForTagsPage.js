export default function TagForTagsPage(props){
    return (
        <div className = "tagForTagsPage">
            <div className ="tagForTagsPage-name" onClick = {()=>{
                props.changeSearchResult("["+props.tagName+"]");
                props.changePage("searchResultPage");
            }}>
                <u>{props.tagName}</u>
            </div>
            <div className = "tagForTagsPage-amount">
                {props.tagAmount} questions
            </div>
        </div>
    )
}