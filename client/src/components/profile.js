import ProfileTop from './profileTop';
import ProfileBottom from './profileBottom';
import axios from "axios";
import { useState, useEffect } from 'react';

async function getUser(username){
    let user = await axios.get(`http://127.0.0.1:8000/getUser/${username}`, {withCredentials:true});
    return user.data;
}

export default function Profile(props){
    const [user, setUser] = useState(null);

    useEffect(() => {
        getUser(props.user.username).then(data => setUser(data));
    }, [props.user.username]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <ProfileTop user = {user}/>
            <ProfileBottom user = {user} changePage = {props.changePage}/>
        </>
    )
}