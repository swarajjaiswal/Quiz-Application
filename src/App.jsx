import { useState } from 'react'
import './App.css'
import Quiz1 from './components/Quiz1'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Quiz1/>
    </>
  )
}

export default App
