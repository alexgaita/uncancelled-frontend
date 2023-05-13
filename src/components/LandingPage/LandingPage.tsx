import React, { useEffect, useState } from 'react'
import {
  Autocomplete,
  Box,
  Grid,
  IconButton,
  Link,
  TextField,
  Typography,
} from '@mui/material'
import SendIcon from '@mui/icons-material/Send'

export type Movie = {
  id: string
  name: string
  status?: string
  description?: string
  url?: string
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

const LandingPage = () => {
  const [movies, setMovies] = useState<Movie[]>(mockMovies)
  const [selectedMovieId, setSelectedMovieId] = useState(undefined)

  useEffect(() => {
    const getMovies = async () => {
      const response = await fetch('http://localhost:4000/tvseries')
      console.log(response)
    }

    getMovies()
  }, [])

  const renderMovies = () => {
    if (!movies) return null
    return movies.slice(0, 6).map((movie) => (
      <Grid key={movie.id} item xs={4} display="flex" justifyContent="center">
        <Link href={`http://localhost:3000/${movie.id}`}>
          <Typography>{movie.name}</Typography>
        </Link>
      </Grid>
    ))
  }

  return (
    <Box
      pt={15}
      width="100%"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      gap={3}
    >
      <Typography letterSpacing={2} fontWeight={700} variant="h2">
        UNCANCELLED
      </Typography>
      <Box display="flex" width="35%" gap={2} ml={7}>
        <Autocomplete
          fullWidth
          renderInput={(params) => (
            <TextField
              {...params}
              inputProps={{
                ...params.inputProps,
              }}
            />
          )}
          getOptionLabel={(option) => option.name}
          options={movies}
        />
        <IconButton>
          <SendIcon />
        </IconButton>
      </Box>
      <Grid
        width="30%"
        container
        alignItems="center"
        justifyContent="center"
        rowGap={2}
      >
        {renderMovies()}
      </Grid>
    </Box>
  )
}

export default LandingPage
