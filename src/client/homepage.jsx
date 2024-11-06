import React, { useEffect, useState } from 'react'
import Nav from './nav.jsx';
import { motion } from 'framer-motion';
import axios from 'axios';

/* CSS */
const tasksCSS = "ml-5 p-4 active:cursor-grabbing border-lbgg border-2 rounded overflow-auto resize"
const addtasksCSS = "ml-5 p-4 active:cursor-pointer border-dashed border-lbgg border-2 rounded"
const tasksHeadCSS = "font-bold"
const taskBoardCss = "flex items-start"
const subTasksCss = "bg-red p-1 mb-2";


const Task = ({x}) => {
  const [hover,setHover] = useState(false);
  const onHover = () => {
    setHover(true)
  }
  const onHoverEnd = () => {
    setHover(false)
  }
  const resi = () => {
    setHover(hover);
  }
  const SubExpanded = ({y}) => {
    return(
      <motion.div key={y}>
	<motion.p className={subTasksCss}>{y}</motion.p>
      </motion.div>
    )
  }
  return(
    <motion.div key={x.id} whileHover={{scale:1.05, transition:{type:"spring",stiffness:300}}} onMouseEnter={onHover} onMouseLeave={onHoverEnd} draggable="true" className={tasksCSS} onResize={resi}>
      <motion.h1 className={tasksHeadCSS}>{x.title}</motion.h1>
      {hover ? (x.id!=0 ? x.subTasks.map((y) => {
	<SubExpanded y={y} />
      }): ""):""}
    </motion.div>
  )
}

const AddTask = ({cards,setCards}) => {
  const [hit,fhit] = useState(false);
  const [text,setText] = useState("");
  function handleSubmit(e) {
    e.preventDefault();
    let max = 1000;
    let min = 1;
    axios.post('/api/set/tasks',[...cards, {id:Math.floor(Math.random() * (max - min + 1)) + min, title:text, subTasks:[]}]).then(console.log("TASK ADDED!"));
    setCards([...cards, {id:Math.floor(Math.random() * (max - min + 1)) + min, title:text, subTasks:[]}]);
    setText("");
    fhit(false);
  }
  const FillForm = () => {
    return (
      <motion.form onSubmit={handleSubmit}>
	<motion.input value={text} type="text" onChange={(e)=>{console.log(text);setText(e.target.value)}} placeholder="Add New Task" autoFocus className="h-10 bg-bgg resize-none outline-none"></motion.input>
	<div className="flex item-center justify-end">
	  <motion.button type="submit" className="border-2 rounded border-lbgg font-bold p-1">Add Task</motion.button>
	</div>
      </motion.form>
    );
  }
  return (
    <motion.div className={addtasksCSS} >
      {!hit ? <motion.h1 onClick={()=>{fhit(!hit)}} className="font-bold cursor-pointer">Add Task</motion.h1> : <FillForm/>}
    </motion.div>
  );
}

const TaskBoard = ({cards, setCards}) => {
  return(
    <motion.div className={taskBoardCss}>
      {cards.map((x) => {
	return(<Task key={x.id} x={x}/>)
      })}
      <AddTask cards={cards} setCards={setCards}/>
    </motion.div>
  );
}

function Homepage() {
  const [cards,setCards] = useState([]);
  useEffect(()=>{
    axios.post('/api/fetch/tasks').then((e)=>{setCards(e.data);}).catch((e)=>{console.error(e)});
  },[]);
  return (
    <div className="h-screen w-full bg-bgg px-24 py-6">
      <Nav />
      <TaskBoard cards={cards} setCards={setCards}/>
    </div>
  );
}

export default Homepage;
