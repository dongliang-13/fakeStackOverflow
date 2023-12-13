import React, { useState, useEffect } from 'react';
import AnswerComment from "./answerComment";
import axios from "axios";

export default function Comments(props){
    const [commentPage, setCommentPage] = useState(0);
    const [html,setHtml] = useState([]);
    const [totalComment, setTotalComment] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let htmlArray = [];
        let currentAnswer = props.answer.find( (a) => {
            return a._id === props.answerId;
        });
        currentAnswer.comments.slice().reverse().forEach( (comment, index) => {
            let commentD = props.commentData.find( (c) => {
                return c._id === comment;
            })
            htmlArray.push(<AnswerComment key = {index} id = {comment} text = {commentD.text} upvotes = {commentD.upvotes} commentBy = {commentD.commentBy} user = {props.user}/>);
        });
        setTotalComment(htmlArray.length);
        setHtml(htmlArray.slice(commentPage*3, (commentPage+1)*3));
    }, [ props.commentData, props.user, commentPage, props.answer , props.answerId]);

    const addComment = async (e) => {
        e.preventDefault();
        const has50Reputation = (await axios.get("http://127.0.0.1:8000/getReputation", {withCredentials:true})).data.reputation;
        if(!has50Reputation && props.user.userType !== "admin"){
            window.alert("You Have Less Than 50 Reputation");
        }
        else if(comment.length > 140){
            window.alert("Comment Length Must Not Be Greater Than 140 Characters")
        }
        else{
            await axios.post("http://127.0.0.1:8000/addCommentAnswer", {comment: comment, aid: props.answerId}, {withCredentials:true})
            .then(res => {
                if(res.data.success){
                    let newComment = <AnswerComment key = {totalComment} id = {res.data.cid} text = {comment} upvotes = {[]} commentBy = {props.user.username} user = {props.user}/>;
                    setHtml(prevHtml => [newComment, ...prevHtml,]);
                    setTotalComment(prevTotal => prevTotal + 1);
                }
            });
        }
        setComment('');
    }

    const handleInputChange = (e) => {
        setComment(e.target.value);
    }

    const isLoggedIn = (props.user.userType === 'registered' || props.user.userType === 'admin');

    return (
        <div style={{textAlign:"center"}}>
            <span style = {{fontWeight:"bold", fontSize: "25px"}}>Total Comments : {totalComment}</span>
            {html}
            {commentPage > 0 && <button className = "comment-button" onClick = {()=> setCommentPage(commentPage-1)}>prev</button>}
            {totalComment > 3*(commentPage+1) && <button className = "comment-button" onClick = {()=> setCommentPage(commentPage+1)}>next</button>}
            {isLoggedIn ? 
                <div className = "addComment">
                    <form onSubmit = {(e) => addComment(e)}>
                        <input placeholder="Add Comment Here" type = "text" value={comment} onChange={handleInputChange} required/>
                        <input type = "submit" value = "Add Comment" />
                    </form>
                </div> : null
            }
        </div>
    )
}