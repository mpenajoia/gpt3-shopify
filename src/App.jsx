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
  const engineOptions = {
    0: "text-ada-001",
    1: "text-babbage-001",
    2: "text-curie-001",
    3: "text-davinci-002"
  }
  const engineIQ = ['Simple', 'Average', 'Moderate', 'Profound']
  const [currentEngine, setCurrentEngine] = useState('Moderate')
  const handleEngines = (e) => {
    setSelectedEngine(engineOptions[engineIQ.indexOf(e.target.value)])
    setCurrentEngine(e.target.value)
  }
  const engineIQMap = engineIQ.map((item, key) => {
    return (
      <button key={key} onClick={handleEngines} value={item}>{item}</button>
    )
  })

  const [selectedEngine, setSelectedEngine] = useState(engineOptions[2])
  

  const [resList, setResList] = useState([])
  const handleButton = (e) => {
    e.preventDefault()
    fetch(`https://api.openai.com/v1/engines/${selectedEngine}/completions`, {
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
        <p>Prompt:</p>
        <p>{each[0]}</p>
        <p className="whitespace-pre-line	">Response: {each[1]}</p>
      </li>
    )
  })
  console.table(resList)

  return (
    <div className="flex justify-center items-center w-full">
      <div className="flex flex-col items-center w-3/4">
        <h1 className="text-3xl font-bold text-center">How about a poem?</h1>
        <div>
          <h3>AI Engine Options</h3>
          <div className="flex gap-3">
            {engineIQMap}
          </div>
          <div>
            <p>Current Engine Option: {currentEngine}</p>
          </div>
        </div>
        <form onSubmit={handleButton} className="flex flex-col w-3/4 items-center">
          <textarea rows="7" onChange={handleInput} value={prompt} placeholder='What shall I do?' className="w-full text-center" />
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
