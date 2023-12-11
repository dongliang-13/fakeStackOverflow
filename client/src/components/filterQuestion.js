export default function FilterQuestion(props){
    return (
        <div id = "filterQuestion">
            <div id = "filterQuestion-newest" onClick = {()=>{props.changefilterMode("newest")}}>
                Newest
            </div>
            <div id="filterQuestion-active" onClick = {()=>{props.changefilterMode("active")}}>
                Active
            </div>
            <div id="filterQuestion-unanswered" onClick = {()=>{props.changefilterMode("unanswered")}}>
                Unanswered
            </div>
        </div>
    )
}