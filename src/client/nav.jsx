import React, { useState } from 'react';
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Cookies from 'js-cookie';

function Nav() {
  async function signOutFunc() {
    try {
      await axios.post("/signout_action");
      console.log("Completed Sign out");
    }catch(e) {
      console.error("Sign Out Error: "+e);
    }
  }
  return (
    <>
      <div className="font-sg flex justify-between">
	  <p className="font-bold text-xl"><a href="/">TaskNet</a></p>
	  <div className="font-barlowCondensed font-medium text-txtn text-sm flex justify-between">
	    <motion.p onClick={signOutFunc} whileHover={{ scale:1.4, textDecoration:"underline" }} className="py-2 px-6"><a href="/">Sign Out</a></motion.p>
	  </div>
	</div>
    </>
  )
}

export default Nav;
