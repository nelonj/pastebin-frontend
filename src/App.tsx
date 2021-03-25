import React, { useState, useEffect } from 'react';
import './App.css';

interface IPasteBin {
  id: number,
  title: string,
  description: string,
  language: string
}

function App() {
  const emptyPasteBin: IPasteBin[] = []
  const emptyChosenSnippet = {} as IPasteBin
  // const emptySnippet: string
  const [pasteBin, setPasteBin] = useState(emptyPasteBin)
  const [newDescription, setNewDescription] = useState("")
  const [newTitle, setNewTitle] = useState("")
  const [newLanguage, setNewLanguage] = useState("")
  const [chosenSnippet, setChosenSnippet] = useState(emptyChosenSnippet)
  const [id, setId] = useState<number>()

  async function handleAddSnippet() {
    await fetch(`https://mighty-citadel-67078.herokuapp.com/`, {
      method: "post",
      headers: { "Content-Type": "application/json" }, //need this to be read by app(express.json())
      body: JSON.stringify({
        //data needs to be SERIALISED to make the journey
        description: newDescription, //set the code snippet
        title: newTitle,
        language: newLanguage,
      }),
    })
    handleGetAll()
    setNewTitle("")
    setNewLanguage("")
  };

  // }

  // async function handleGetSnippet() {
  //   const res = await fetch(`http://localhost:4000/:id`);
  //   setSnippet(await res.json());
  // }

  async function handleGetAll() {
    const res = await fetch(`https://mighty-citadel-67078.herokuapp.com/`);
    setPasteBin(await res.json());
    console.log(pasteBin)
    // console.log(res)
    // const res1= await res.json(); //what is this actually doing??
    // console.log(res1) //all we need to know: it's an array of objects!!
  }

  useEffect(() => {
    handleGetAll()
  }, [])

  async function handleDeleteSnippet(props: IPasteBin) {
    await fetch(`https://mighty-citadel-67078.herokuapp.com/` + props.id.toString(), {
      method: "delete",
      headers: { "Content-Type": "application/json" }, //need this to be read by app(express.json())
      body: JSON.stringify({
        //data needs to be SERIALISED to make the journey
        id: props.id
      }),
    })
    handleGetAll()
  };

  function handleEditAutocompleteSnippet(props: IPasteBin) {
    //set state to selected id
    setNewTitle(props.title)
    setNewDescription(props.description)
    setNewLanguage(props.language)
    setId(props.id)

  };

  async function handleSubmitEdit() {
    if (id) {
      await fetch(`https://mighty-citadel-67078.herokuapp.com/` + id.toString(), {
        method: "put",
        headers: { "Content-Type": "application/json" }, //need this to be read by app(express.json())
        body: JSON.stringify({
          id: id,
          title: newTitle,
          description: newDescription,
          language: newLanguage
        }),
      })
    };
    handleGetAll();
  }
  function SeeSnippets(props: IPasteBin) {

    return (
      <li> {props.id} {props.description}
        <button onClick={() => { handleDeleteSnippet(props) }}>Delete</button>
        <button onClick={() => { setChosenSnippet(props) }}>See</button>
        <button onClick={() => { handleEditAutocompleteSnippet(props) }}>Edit</button>
      </li>
    )

  }


  return (
    <div className="App">
      <div className='input_box'>
        <input
          className='title'
          value={newTitle}
          placeholder='insert title here!'
          onChange={e => setNewTitle(e.target.value)}
        ></input>
        <textarea
          className='textarea'
          value={newDescription}
          placeholder='paste code snippet here!'
          onChange={e => setNewDescription(e.target.value)}

        ></textarea>
        <select value={newLanguage} onChange={e => setNewLanguage(e.target.value)}>
          <option value='JS'> JS </option>
          <option value='TS'> TS </option>
          <option value='Python'> Python </option>
        </select>
        <button onClick={() => { handleGetAll(); handleAddSnippet() }}> SUBMIT </button>
        <button onClick={handleSubmitEdit}> SUBMIT EDIT</button>
      </div>

      <div className='list'>
        <ul>
          {pasteBin.map((element, index) => <SeeSnippets {...element} key={index} />)}
        </ul>

      </div>
      <div className='chosenSnippet'>
        <h1>{chosenSnippet.title}</h1>
        <p>{chosenSnippet.description}</p>
        <p>{chosenSnippet.language}</p>
        <button> X</button>
      </div>
    </div>
  );
}





export default App;
