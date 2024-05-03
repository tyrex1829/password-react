import { useState, useCallback, useEffect } from 'react'

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numAllowed) str += "0123456789"
    if (charAllowed) str += "!@#$%^&*-_=+/~`"

    for (let i = 0; i < length; i++) {
      let char = Math.floor(Math.random() * str.length) + 1;
      pass += str.charAt(char);
    }

    setPassword(pass);

  }, [length, numAllowed, charAllowed, setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, numAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div style={{backgroundColor: "#219ebc"}} className='rounded-lg px-4 py-3 my-8 w-full max-w-md mx-auto shadow-md'>
        <h1 className='text-center my-3 text-white'>Password Generator</h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4'>
          <input type="text" value={password} className='outline-none w-full py-1 px-3' placeholder='password' readOnly />
          <button style={{backgroundColor: "#fb8500"}} className='outline-none text-white px-3 py-0.5 shrink-0'>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" min={8} max={50} value={length} className='cursor-pointer' onChange={(e) => {setLength(e.target.value)}} />
            <label className='text-white'>Length: {length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={numAllowed} id='numInput' onChange={() => {
              setNumAllowed(prev => !prev);
            }} />
            <label className='text-white' htmlFor="numInput">Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
            <input type="checkbox" defaultChecked={charAllowed} id='charInput' onChange={() => {
              setCharAllowed(prev => !prev);
            }} />
            <label className='text-white' htmlFor="charInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
