import express from "express";
import Cookies from "js-cookie";
import ViteExpress from "vite-express";

import {signUpDB, signInDB} from './auth_be.js';
import cookieParser from "cookie-parser";
import { verifyToken } from "./jwt.js";

const app = express();

/** MiddleWare **/
app.use(express.urlencoded());
app.use(cookieParser())
app.get("/*", (req, res,next) => {
    next();
});

app.get("/", (req,res,next)=>{
  if(req.cookies.jwtToken!=undefined){
    try {
      const cc = verifyToken(req.cookies.jwtToken);
      res.redirect("/homepage");
    }catch(e) {
      console.error(e);
      next();
    }
  }else {
    next();
  }
})

app.get("/homepage", (req,res,next)=> {
  if(req.cookies.jwtToken!=undefined){
    try {
      const cc = verifyToken(req.cookies.jwtToken);
      req.cookies.jwtToken = null;
      next();
    }catch(e) {
      console.error(e);
      res.redirect("/");
    }
  }else {
    res.redirect("/");
  }
})

async function signUp(req,res) {
  console.log(req);
  await signUpDB(req.body,res).catch((e)=>{console.log(e);});
}
async function signIn(req,res) {
  // console.log(req);
  await signInDB(req.body,res,app).catch((e)=>{console.log(e);});
}
app.post('/signup_action', signUp);
app.post('/signin_action', signIn);
app.post('/signout_action', (req,res,next)=> {
  res.status(201).clearCookie('jwtToken');
  next();
});
app.post('/signin_redirect', (req,res,next)=> {
  res.redirect("/homepage");
})

ViteExpress.listen(app, 3000, () =>
  console.log("Server is listening on port 3000..."),
);
