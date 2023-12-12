import { useState, useEffect } from 'react';
import axios from "axios";

async function getQuestionsArray(questionArr){
    let result = [];
    for (const questionId of questionArr) {
        let question = await axios.get(`http://127.0.0.1:8000/getQuestion/${questionId}`, {withCredentials:true});
        if(question.data !== ''){
            result.push(question.data);
        }
    }
    return result;
}

export default function ProfileBottom(props){
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        getQuestionsArray(props.user.questions).then(data => setQuestions(data));
    }, [props.user.questions]);

    if(props.user.userType === 'registered'){
        return (
            <>
                <h1 className = "bottomBorder" style = {{margin:"0", padding:"10px"}}>Your Questions:</h1>
                {questions.map((question, index) => (
                    <div key={index} 
                        className = "bottomBorder" 
                        style = {{padding: "10px", cursor:"pointer"}} 
                        onClick = {()=>{
                            props.changePage("editQuestion", null, question);
                        }}>
                        <h2>{question.title}</h2>
                    </div>
                ))}
            </>
        )
    }
    else if(props.user.userType === 'admin'){
        return (
            <>
                admin
            </>
        )
    }
}

