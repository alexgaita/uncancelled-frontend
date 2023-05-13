import React, { useEffect, useState } from 'react'
import './App.css'
import { Container } from '@mui/material'
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
  return (
    <Container maxWidth="lg">
      {storyData ? <Story storyData={storyData} /> : null}
    </Container>
  )
}

export default App
