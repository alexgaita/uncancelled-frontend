import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Box } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import MovieDetails from './components/MovieDetails/MovieDetails'
import StoryContainer from './components/StoryContainer/StoryContainer'
import LandingPage from './components/LandingPage/LandingPage'

const theme = createTheme({
  palette: {
    success: {
      main: '#ff0000',
    },
  },
  components: {
    MuiAutocomplete: {
      styleOverrides: {
        option: {
          padding: 10,
          '.Mui-focused': {
            backgroundColor: '#8b877b',
          },
          '[aria-selected="true"]': {
            backgroundColor: '#8b877b',
          },
        },
      },
    },
  },
})

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/:movieId" element={<MovieDetails />} />
          <Route path="/story/:id" element={<StoryContainer />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
