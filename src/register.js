import React from 'react';
import { useState , useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

function Register() {

    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [conf_password , setconf_password] = useState("");
    const [message , setmessage] = useState("");

    const navigate = useNavigate();

    const handleRegister = async (e) =>{
        e.preventDefault();
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password" , password);
        formData.append("conf_password" , conf_password);

        const res = await fetch("https://note-taker-api.onrender.com/user/register",
        {
            method : "post",
            body : formData
        })
        const response = await res.json();
        
        setmessage(response.status);
        console.log(message);
    }

    useEffect(() => {
        setTimeout(() => {
            if(message === "Success") {
                console.log(message);
                setmessage("");
                navigate("/");
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
      <h1>NOTE TAKER REGISTRATION</h1>
      <p><b>Email</b></p>
      <input id="email" placeholder="Input Email" onChange={(e) => {setemail(e.target.value)}}></input>
      <br/>
      <br/>
      <p><b>Password</b></p>
      <input id="email" placeholder="Input Password" type="Password" onChange={(e) => {setpassword(e.target.value)}}></input>
      <br/>
      <br/>
      <p><b>Confirm Password</b></p>
      <input id="email" placeholder="Confirm Password " type="Password" onChange={(e) => {setconf_password(e.target.value)}}></input>
      <br/>
      <br/>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
}

export default Register;
