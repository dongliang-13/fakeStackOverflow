import {useState, useEffect} from 'react';
import axios from 'axios';
import Welcome from './welcome';
import Home from './home';
import Register from './register';

export default function FakeStackoverflow(){
  const [page, setPage] = useState('welcome');
  const [user, setUser] = useState(null);
  const [registerInfo, setRegisterInfo] = useState('');
  
  useEffect(() => {
    axios.get('http://127.0.0.1:8000',{ withCredentials: true })
      .then(response => {
        setUser(response.data);
      });
  }, []);

  if(page === 'welcome'){
    return <Welcome 
      registerInfo = {registerInfo}
      user = {user}
      setPage = {setPage}
      setUser = {setUser}/>;
  }
  else if(page === 'home'){
    return <Home
      user = {user}
      setPage = {setPage}
      setUser = {setUser}/>
  }
  else if(page === 'register'){
    return <Register
      setPage = {setPage}
      setRegisterInfo = {setRegisterInfo}/>
  }
  else{
    return <div>default</div>
  }
}
