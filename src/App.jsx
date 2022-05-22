import { useState } from "react";


function App() {
  const [prompt, setPrompt] = useState('')
  const defaultData = {
    prompt: `Write a poem about ${prompt}`,
    temperature: 0.5,
    max_tokens: 64,
    top_p: 1.0,
    frequency_penalty: 0.0,
    presence_penalty: 0.0,
  }

  const handleInput = (e) => {
    setPrompt(e.target.value)
  }

  
  const [resList, setResList] = useState([])

  const handleButton = (e) => {
    e.preventDefault()
    fetch("https://api.openai.com/v1/engines/text-curie-001/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_GPT3_KEY}`,
      },
      body: JSON.stringify(defaultData),
    })
    .then(res => res.json())
    .then(data => {
      setResList([[prompt, data.choices[0].text], ...resList]);
    });
  }
  const resMap = resList?.map((each, key) => {
    return (
      <li key={key} className="w-3/4 bg-blue-400 p-6 rounded text-white list-none mt-4" >
        <p>{each[0]}</p>
        <p className="whitespace-pre-line	">{each[1]}</p>
      </li>
    )
  })
  console.table(resList)

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center w-3/4">
        <h1 className="text-3xl font-bold text-center">Marco Silva's AI</h1>
        <form onSubmit={handleButton} className="flex flex-col w-3/4 items-center">
          <textarea rows="10" onChange={handleInput} value={prompt} placeholder='What shall I do?' className="w-full text-center" />
          <button type='submit'>Submit</button>
        </form>
        <div className="flex flex-col items-center justify-center">
          <h2>Responses</h2>
          {resMap}
        </div>
      </div>
    </div>
  );
}

export default App;
