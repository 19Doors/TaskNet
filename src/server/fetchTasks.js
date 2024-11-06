import mongoose from 'mongoose';
import {signToken, verifyToken } from "./jwt.js"
import userModel from './schemas.js';

const uri = "mongodb+srv://19Doors:Doors@doors.4pvth.mongodb.net/?retryWrites=true&w=majority&appName=Doors";
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function fetchtasks(req,res, app) {
  try {
    let person = verifyToken(req.cookies.jwtToken);
    const p = await userModel.findOne({'email':person.email},'tasks');
    res.status(200).json(p.tasks);
  }catch(e) {
    console.error(e);
  }
}

async function setTasks(req,res,t) {
  try {
    let person = verifyToken(req.cookies.jwtToken);
    console.log(t);
    await userModel.updateOne({'email':person.email},{'tasks':t});
    res.status(200);
  }catch(e) {
    console.error(e);
  }
}
export {fetchtasks, setTasks}
