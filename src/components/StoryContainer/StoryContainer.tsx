import React, { useEffect, useState } from 'react'
import { Container } from '@mui/material'
import Story from '../Story'

const StoryContainer = () => {
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

export default StoryContainer
