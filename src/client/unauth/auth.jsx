import React, { useState } from 'react';
import Nav from './nav.jsx';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState('');
  const [auth, setAuth] = useState(true);

  const dPassword = (p) => {
    setPassword(p.target.value);
  };

  const dEmail = (p) => {
    setEmail(p.target.value);
  };

  const nav = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    const formData = new URLSearchParams();
    formData.append('email', email);
    formData.append('password', password);
    try{
      const res = await axios.post('/signin_action', formData);
      if(res.status==201){
	setAuth(true);
	nav('/homepage');
      }
    }catch(e) {
      if(e.response.status==401) {
	setAuth(false);
      }
    }
  }

  let content;
  if(auth==false) {
    content=(<>Wrong Email or Password</>);
  }

  return(
    <>
    {content}
    <div className="font-barlowCondensed flex justify-center items-center">
      <div className="mt-8 p-4 flex flex-col justify-around">
	<h1 className="text-3xl font-medium mb-10 mr-50">Sign In</h1>
	<form className="flex flex-col justify-between" onSubmit={handleSubmit}>
	  <label className="font-medium">Email</label>
	  <input value={email} onChange={dEmail} className="bg-bgg mb-5 p-2 border-b-2 border-txtn rounded border-solid" type="email" name="email"></input>
	  <label className="font-medium">Password</label>
	  <input value={password} onChange={dPassword} className="bg-bgg mb-5 p-2 border-b-2 border-txtn rounded border-solid" type="password" name="password"></input>
	  <input className="p-4 bg-txtn text-bgg rounded-md" type="submit" value="Sign In"></input>
	</form>
      </div>
    </div>
    </>
  )
}
function SignUp() {
  return(
    <>
    <div className="font-barlowCondensed flex justify-center items-center">
      <div className="mt-8 p-4 flex flex-col justify-around">
	<h1 className="text-3xl font-medium mb-10 mr-50">Sign Up</h1>
	<form className="flex flex-col justify-between" action="/signup_action" method="post">
	  <label className="font-medium">Full Name</label>
	  <input className="bg-bgg mb-5 p-2 border-b-2 border-txtn rounded border-solid" type="text" name="fullname"></input>
	  <label className="font-medium">Email</label>
	  <input className="bg-bgg mb-5 p-2 border-b-2 border-txtn rounded border-solid" type="email" name="email"></input>
	  <label className="font-medium">Password</label>
	  <input className="bg-bgg mb-5 p-2 border-b-2 border-txtn rounded border-solid" type="password" name="password"></input>
	  <input className="p-4 bg-txtn text-bgg rounded-md" type="submit" value="Sign Up"></input>
	</form>
      </div>
    </div>
    </>
  )
}
function SignUpP() {
  return(
    <div className="h-screen w-screen bg-bgg px-24 py-6">
      <Nav />
      <SignUp />
    </div>
  );
}

function SignInP() {
  return(
    <div className="h-screen w-screen bg-bgg px-24 py-6">
      <Nav />
      <SignIn />
    </div>
  );
}

export{SignInP, SignUpP};
