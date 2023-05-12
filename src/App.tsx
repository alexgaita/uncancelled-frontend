import React, { useEffect, useState } from 'react'
import './App.css'
import Story from './components/Story'

function App() {
  const [storyData, setStoryData] = useState()

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetch('https://picsum.photos/v2/list').then((resp) =>
        resp.json()
      )
      console.log(result)
      setStoryData(result)
    }

    fetchData()
  }, [])
  return storyData ? <Story storyData={storyData} /> : null
}

export default App
