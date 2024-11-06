import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {signToken } from "./jwt.js"
import userModel from './schemas.js';
import Coo from 'js-cookie';
import cookieSession from "cookie-session";

const uri = "mongodb+srv://19Doors:Doors@doors.4pvth.mongodb.net/?retryWrites=true&w=majority&appName=Doors";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
let l1 = false;


async function signInDB(user,res, app) {
  try {
    await mongoose.connect(uri,clientOptions);
    console.log(user);
    let {email, password} = user;
    const person = await userModel.findOne({'email':email},'password');
    if(person==undefined) {
      console.log("NOT THERE!");
      res.status(401).end();
      throw () => {};
    }
    console.log(person.password);
    const match = bcrypt.compareSync(password,person.password);
    if(match) {
      console.log("Confirmed!");
      const token = signToken({"password":person.password, "isAuth": person.isAuth},{expiresIn:"1hr"});
      res.cookie("jwtToken", token, {maxAge: 5*60*1000})
      res.status(201).end();
    }else {
      res.status(401).end();
      console.log("NOOOO!!!!");
    }
  }
  finally {
    await mongoose.disconnect();
  }
}

async function signUpDB(user,res) {
  try {
    await mongoose.connect(uri,clientOptions);
    let {fullname, email, password} = user;
    const person = await userModel.findOne({'email':email},'password');
    if(person!=null) {
      console.log("Same Email");
      console.error("ASD");
      res.redirect("/signup");
      return;
    }
    password = bcrypt.hashSync(password,10);
    await userModel.create({full_name:fullname, email:email, password:password, isAuth: true});
    res.redirect("/signin");
  }
  finally {
    await mongoose.disconnect();
  }
}

export {signInDB, signUpDB};
