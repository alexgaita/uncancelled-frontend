import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import MovieDetails from './components/MovieDetails/MovieDetails'
import StoryContainer from './components/StoryContainer/StoryContainer'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Box>Merge</Box>} />
        <Route path="/:movieId" element={<MovieDetails />} />
        <Route path="/story/:id" element={<StoryContainer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
