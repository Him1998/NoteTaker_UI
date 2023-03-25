import React from 'react';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Login() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [token , settoken] = useState("");
    const [message , setmessage] = useState("");

    const navigate = useNavigate();

    const handleLogin = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password" , password);

        const res = await fetch("https://note-taker-api.onrender.com/user/login",
        {
            method : "post",
            body : formData
        })
        const response = await res.json();
        if(response.token){
            settoken(response.token);
            sessionStorage.setItem("token" , response.token);
        }
        setmessage(response.message);
        console.log(message);
    }

    useEffect(() => {
        setTimeout(() => {
            if(token) {
                console.log(token);
                console.log(message);
                setmessage("");
                navigate("/note");
            }
            else {
                setmessage("");
                setemail("");
                setpassword("");
            }
        },2000)
    }, [message])

  return (
    <div>
      <h1>NOTE TAKER LOGIN</h1>
      <p><b>Email</b></p>
      <input id="email" placeholder="Input Email" onChange={(e) => {setemail(e.target.value)}}></input>
      <br/>
      <br/>
      <p><b>Password</b></p>
      <input id="email" placeholder="Input Password" type="Password" onChange={(e) => {setpassword(e.target.value)}}></input>
      <br/>
      <br/>
      <button onClick={handleLogin}>Login</button>

      <h2>Don't Have An Account <span onClick={() => {navigate("/register")}}><u>Register</u></span></h2>
    </div>
  );
}

export default Login;
