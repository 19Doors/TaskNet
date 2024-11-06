import React, { useState } from 'react';
import {motion} from 'framer-motion';
import { useSelector } from 'react-redux';

function Nav() {
  return (
    <>
      <div className="font-sg flex justify-between">
	  <p className="font-bold text-xl"><a href="/">TaskNet</a></p>
	  <div className="font-barlowCondensed font-medium text-txtn text-sm flex justify-between">
	    <motion.a href={'/signin'} whileHover={{ scale:1.4, textDecoration:"underline" }} className="py-2 px-6">Sign In </motion.a>
	    <motion.a href={'/signup'} className="px-6 py-2 rounded-md" whileHover={{ scale:1.4, textDecoration:"underline" }}>Get Started</motion.a>
	  </div>
	</div>
    </>
  )
}

export default Nav;
