import React, {useState, useEffect} from 'react';
import { setConstantValue } from 'typescript';
import './App.css';

interface IPasteBin {
  id: number,
  title: string,
  description: string,
  language: string
}

function App() {
  const emptyPasteBin: IPasteBin[] = []
  const [pasteBin, setPasteBin] = useState(emptyPasteBin)

  async function handleAddSnippet() {
    const res = await fetch(`http://localhost:4000/`, {
      method: "post",
      headers: { "Content-Type": "application/json" }, //need this to be read by app(express.json())
      body: JSON.stringify({
        //data needs to be SERIALISED to make the journey
        description: , //set the code snippet
      }),
    });

  // }
  
  // async function handleGetSnippet() {
  //   const res = await fetch(`http://localhost:4000/:id`);
  //   setSnippet(await res.json());
  // }
  
  async function handleGetAll() {
        const res = await fetch(`http://localhost:4000/`);
        setPasteBin(await res.json());
        console.log(pasteBin)
        // console.log(res)
        // const res1= await res.json(); //what is this actually doing??
        // console.log(res1) //all we need to know: it's an array of objects!!
  }

  useEffect( () => {
    handleGetAll()
  },[])

  function SeeSnippets(props: IPasteBin) {
    return(
      <ul> {props.id} {props.title} </ul>
    )
  }

  return (
    <div className="App">
      <div className='input_box'> 
      <input
        placeholder='insert title here!'
      ></input>
      <textarea
        placeholder='paste code snippet here!'
        onChange={}
      ></textarea>
      <select> 
        <option value='JS'> JS </option>
        <option value='TS'> TS </option>
        <option value='Python'> Python </option>
      </select>
      <button onClick={() => {handleGetAll(); handleAddSnippet()}}> SUBMIT </button>
      </div>

      <div className='list'>
        <li>
          {pasteBin.map((element, index) => <SeeSnippets {...element} key={index} />)}
        </li>

      </div>
    </div>
  );
}




export default App;
