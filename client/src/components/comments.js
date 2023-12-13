import React, { useState, useEffect } from 'react';
import Comment from "./comment";
import axios from "axios";

export default function Comments(props){
    const [commentPage, setCommentPage] = useState(0);
    const [html,setHtml] = useState([]);
    const [totalComment, setTotalComment] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let htmlArray = [];
        props.question.comments.slice().reverse().forEach( (comment, index) => {
            let commentD = props.commentData.find( (c) => {
                return c._id === comment;
            })
            htmlArray.push(<Comment key = {index} id = {comment} text = {commentD.text} upvotes = {commentD.upvotes} commentBy = {commentD.commentBy} user = {props.user}/>);
        });
        setTotalComment(htmlArray.length);
        setHtml(htmlArray.slice(commentPage*3, (commentPage+1)*3));
    }, [props.question.comments, props.commentData, props.user, commentPage]);

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
            await axios.post("http://127.0.0.1:8000/addComment", {comment: comment, qid: props.question._id}, {withCredentials:true})
            .then(res => {
                if(res.data.success){
                    let newComment = <Comment key = {totalComment} id = {res.data.cid} text = {comment} upvotes = {[]} commentBy = {props.user.username} user = {props.user}/>;
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
            Total Comments : {totalComment}
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