import mongoose from 'mongoose';
import bcrypt from 'bcrypt';
import {signToken } from "./jwt.js"
import userModel from './schemas.js';

const uri = "mongodb+srv://19Doors:Doors@doors.4pvth.mongodb.net/?retryWrites=true&w=majority&appName=Doors";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
await mongoose.connect(uri,clientOptions);
async function signInDB(user,res, app) {
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
      const token = signToken({"email":email,"password":person.password,"isAuth": person.isAuth},{expiresIn:"1hr"});
      res.cookie("jwtToken", token, {maxAge: 5*60*1000})
      res.status(201).end();
    }else {
      res.status(401).end();
      console.log("NOOOO!!!!");
    }
}

async function signUpDB(user,res) {
    let {fullname, email, password} = user;
    const person = await userModel.findOne({'email':email},'password');
    if(person!=null) {
      console.log("Same Email");
      console.error("ASD");
      res.redirect("/signup");
      return;
    }
    password = bcrypt.hashSync(password,10);
    await userModel.create({full_name:fullname, email:email, password:password, isAuth: true, tasks:[]});
    res.redirect("/signin");
}

export {signInDB, signUpDB};
