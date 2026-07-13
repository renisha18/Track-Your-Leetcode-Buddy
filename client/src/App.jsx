import { useEffect, useState } from 'react'

function App() {
  const [status, setStatus] = useState('checking...')

  useEffect(() => {
    fetch('http://localhost:5003/api/health')
      .then(res => res.json())
      .then(data => setStatus(data.status))
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EAC891]">
      <h1 className="text-3xl font-bold text-[#D06224]">
        Server status: {status}
      </h1>
    </div>
  )
}

export default App