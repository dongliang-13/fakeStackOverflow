import React, { useState, useEffect } from 'react';
import Question from "./question";

export default function Questions(props){
    const [number, setNumber] = useState(0);
    const [questionForDisplay, setQuestionForDisplay] = useState([]);
    const [length, setLength] = useState(0);

    useEffect(() => {
        const questions1 = props.data.question.map( (value,index) => (
            <React.Fragment key={index}>
                <Question user = {props.user} question={value} data={props.data} changePage = {props.changePage} updateDataView = {props.updateDataView}/>
            </React.Fragment>
        ));

        setLength(questions1.length);

        let questions = [];
        for(let i = 0; i < 5 && (i + 5*number < length); i++){
            questions.push(questions1[i + 5*number]);
        }

        setQuestionForDisplay(questions);
    }, [number, length, props.data.question, props.changePage, props.updateDataView, props.data, props.user]);

    return (
        <div id = "questions">
            {questionForDisplay}
            <div id = "questionToggle">
                {number > 0 && <button onClick = {()=> setNumber(number-1)}>previous</button>}
                {length > 5*(number+1) && <button onClick = {()=> setNumber(number+1)}>next</button>}
            </div>
        </div>
    );
}
