import axios from "axios";
import {useState} from "react";

export default function Comment(props){
    const [upvoteLength, setUpvoteLength] = useState(props.upvotes.length)
    const [upvoteUser, setUpvoteUser] = useState(props.upvotes);
    const upvote = () => {
        if(upvoteUser.includes(props.user.username)){
            window.alert("You Already Upvoted This Comment");
        }
        else{
            axios.post("http://127.0.0.1:8000/upvoteComment", {cid : props.id}, {withCredentials:true}).then( (res)=> {
                setUpvoteLength(upvoteLength + 1);
                setUpvoteUser([...upvoteUser, res.data.userAdded]);
            });
        }
    }
    const isLoggedIn = (props.user.userType === 'registered' || props.user.userType === 'admin');
    return (
        <div className = "comment">
            <div className = "comment-header">
                <span>
                    Comment By: {props.commentBy}
                </span>
                <span>
                    Number of Votes: {upvoteLength}
                </span>
            </div>
            <span style = {{margin:"10px 0", backgroundColor:"yellow"}}>{props.text}</span>
            {isLoggedIn ? <button onClick = {()=>upvote()}>Upvote</button> : null}
        </div>
    )
}
