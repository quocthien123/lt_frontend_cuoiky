import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

return (
  <>
    <div className="flex justify-center gap-8 py-6">
      <a href="https://vite.dev" target="_blank" rel="noreferrer">
        <img src={viteLogo} className="h-16 w-16" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank" rel="noreferrer">
        <img src={reactLogo} className="h-16 w-16" alt="React logo" />
      </a>
    </div>
    <h1 className="text-3xl font-bold text-center mb-6 text-red-500">Vite + React</h1>
    <div className="card bg-white border border-gray-200 rounded-lg p-6 max-w-md mx-auto shadow-md">
      <button
        onClick={() => setCount((count) => count + 1)}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded mb-4 transition"
      >
        count is {count}
      </button>
      <p className="text-gray-700 text-sm">
        Edit <code className="bg-gray-100 px-1 rounded">src/App.tsx</code> and save to test HMR
      </p>
    </div>
    <p className="text-center text-gray-500 text-sm mt-8">
      Click on the Vite and React logos to learn more
    </p>
  </>
);
}

export default App
