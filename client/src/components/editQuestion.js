import {useState} from "react";
import axios from "axios";

export default function EditQuestion(props){
    let [title,setTitle] = useState(props.editQuestion.title);
    let [summary,setSummary] = useState(props.editQuestion.summary);
    let [text,setText] = useState(props.editQuestion.text);
    let [tag,setTag] = useState("");
    let [errorMsg, setErrorMsg] = useState("");

    const editQ = (e) => {
        e.preventDefault();
        const question = {
            _id: props.editQuestion._id,
            title: title,
            text: text,
            tags: tag.trim().split(" "),
            summary: summary,
        };
        if(question.title.length>50){
            setErrorMsg("Title over 50 characters");
            return;
        }
        else if (question.summary.length>140){
            setErrorMsg("Summary over 140 characters");
            return;
        }
        axios.post("http://127.0.0.1:8000/editQuestion", question, {withCredentials:true}).then(res=>{
            if(res.data.success){
                props.changePage("profile");
            }
            else{
                setErrorMsg(res.data.errorMsg);
            }
        });
    }

    return <div>
    <form id="editQuestion" onSubmit={editQ}>
      <label htmlFor="editQuestion-title">Question Title*</label>
      <p>
        <i>&nbsp;&nbsp;&nbsp;Limit title to 50 characters or less</i>
      </p>
      <input type="text" id = "editQuestion-title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      
      <label htmlFor="editQuestion-summary">Summary*</label>
      <p>
        <i>&nbsp;&nbsp;&nbsp;Limit summary to 140 characters or less</i>
      </p>
      <input type="text" id = "editQuestion-summary" value = {summary} onChange = {(e) => setSummary(e.target.value)} required />

      <label htmlFor="editQuestion-text">Question Text*</label>
      <p>
        <i>&nbsp;&nbsp;&nbsp;Add details</i>
      </p>
      <textarea id="editQuestion-text" value = {text} onChange = {(e) => setText(e.target.value)} required />

      <label htmlFor="editQuestion-tags">Tags*</label>
      <p>
        <i>&nbsp;&nbsp;&nbsp;Add keywords separated by whitespace</i>
      </p>
      <input type="text" id="editQuestion-tags" value = {tag} onChange = {(e) => setTag(e.target.value)} required />
      <span style ={{color:'red', fontSize:'20px'}}>{errorMsg}</span>
      <div id="newQuestionPage-finalLine">
        <button type = "submit" id="newQuestionPage-submitForm">Edit Question</button>
        <span style={{ color: 'red' }}>* indicates mandatory fields</span>
      </div>
    </form>
  </div>
}