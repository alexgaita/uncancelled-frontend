import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Chip,
  Grid,
  IconButton,
  Link,
  Paper,
  TextField,
  Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'
import { useNavigate } from 'react-router-dom'

export type Movie = {
  id: string
  name: string
  status?: string
  description?: string
  wallpaper?: string
  seasons?: any[]
}

const mockMovies = [
  {
    id: '1',
    name: 'Piratii din caraibe',
  },
  {
    id: '2',
    name: 'Stapanul inelelor',
  },
  {
    id: '3',
    name: 'Piratii din caraibe',
  },
  {
    id: '4',
    name: 'Stapanul inelelor',
  },
  // {
  //   id: '5',
  //   name: 'Piratii din caraibe',
  // },
  // {
  //   id: '6',
  //   name: 'Stapanul inelelor',
  // },
]
const CustomPaper = (props: any) => {
  return <Paper sx={{ backgroundColor: '#8b877b' }} elevation={8} {...props} />
}

const LandingPage = () => {
  const [movies, setMovies] = useState<Movie[]>(mockMovies)
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null)

  const navigate = useNavigate()

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch('http://localhost:4000/tvseries')
      const responseData = await response.json()
      console.log(responseData)
      setMovies(responseData)
    }

    getMovies()
  }, [])

  const renderMovies = () => {
    if (!movies) return null
    return movies.slice(0, 6).map((movie) => (
      <Grid key={movie.id} item xs={4} display="flex" justifyContent="center">
        <Chip
          label={<Typography>{movie.name}</Typography>}
          component="a"
          href={`http://localhost:3000/${movie.id}`}
          variant="outlined"
          clickable
          sx={{ border: '1px solid black' }}
        />
      </Grid>
    ))
  }

  return (
    // <Box
    //   pt={15}
    //   width="100%"
    //   height="100vh"
    //   display="flex"
    //   flexDirection="column"
    //   alignItems="center"
    //   gap={3}
    // >
    <Box>
      <div className="wrapper">
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          gap={2}
          sx={{
            marginLeft: 60,
            width: 550,
            height: 340,
            borderRadius: 6,
            padding: 3,
          }}
        >
          <Typography letterSpacing={2} fontWeight={700} variant="h2">
            UNCANCELLED
          </Typography>
          <Box display="flex" width="100%" gap={2}>
            <Autocomplete
              fullWidth
              value={selectedMovie}
              onChange={(event, value) => setSelectedMovie(value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  inputProps={{
                    ...params.inputProps,
                  }}
                />
              )}
              PaperComponent={CustomPaper}
              getOptionLabel={(option) => option.name}
              options={movies}
            />
            <IconButton
              onClick={() => {
                if (!selectedMovie) return
                navigate(`${selectedMovie.id}`)
              }}
            >
              <SendIcon />
            </IconButton>
          </Box>
          <Grid
            container
            alignItems="center"
            justifyContent="center"
            rowGap={2}
          >
            {renderMovies()}
          </Grid>
        </Box>
      </div>
      <div className="video-container">
        <video style={{ position: 'relative' }} loop autoPlay muted>
          <source src="video.mp4" type="video/mp4" />
        </video>
      </div>
    </Box>
  )
}

export default LandingPage
