import React, { useState, useEffect } from 'react';
import Comment from "./comment";
import axios from "axios";

export default function Comments(props){
    const [html,setHtml] = useState([]);
    const [totalComment, setTotalComment] = useState(0);
    const [comment, setComment] = useState('');

    useEffect(() => {
        let htmlArray = [];
        props.question.comments.forEach( (comment, index) => {
            let commentD = props.commentData.find( (c) => {
                return c._id === comment;
            })
            htmlArray.push(<Comment key = {index} id = {comment} text = {commentD.text} upvotes = {commentD.upvotes} commentBy = {commentD.commentBy} user = {props.user}/>);
        });
        setHtml(htmlArray);
        setTotalComment(htmlArray.length);
    }, [props.question.comments, props.commentData, props.user]);

    const addComment = async (e) => {
        e.preventDefault();
        await axios.post("http://127.0.0.1:8000/addComment", {comment: comment, qid: props.question._id}, {withCredentials:true})
            .then(res => {
                if(res.data.success){
                    let newComment = <Comment key = {totalComment} id = {res.data.cid} text = {comment} upvotes = {[]} commentBy = {props.user.username} user = {props.user}/>;
                    setHtml(prevHtml => [...prevHtml, newComment]);
                    setTotalComment(prevTotal => prevTotal + 1);
                }
            });
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
            {isLoggedIn ? 
                <div className = "addComment">
                    <form onSubmit = {(e) => addComment(e)}>
                        <input placeholder="Add Comment Here" type = "text" value={comment} onChange={handleInputChange} />
                        <input type = "submit" value = "Add Comment" />
                    </form>
                </div> : null
            }
        </div>
    )
}
