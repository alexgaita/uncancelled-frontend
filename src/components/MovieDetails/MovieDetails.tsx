import React, { useEffect, useState } from 'react'
import { Box, Typography } from '@mui/material'
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import PauseCircleOutlinedIcon from '@mui/icons-material/PauseCircleOutlined'
import { useParams } from 'react-router-dom'
import AccordionCustom from './subcomponents/AccordionDetails'
import { Movie } from '../LandingPage/LandingPage'

const seasons = [
  {
    id: 1,
    name: 'S01',
  },
  {
    id: 2,
    name: 'S02',
  },
  {
    id: 3,
    name: 'S03',
  },
  {
    id: 4,
    name: 'S04',
  },
  {
    id: 5,
    name: 'S05',
  },
]

const mockMovie = {
  id: '1',
  name: 'Piratii din caraibe',
  status: 'ongoing',
  description:
    'A deadly female assassin comes out of hiding to protect the daughter\n' +
    '            that she gave up years before, while on the run from dangerous men.',
  url: '',
  seasons,
}

const MovieDetails = () => {
  const params = useParams()

  const [movie, setMovie] = useState<Movie>(mockMovie)

  useEffect(() => {
    const getResults = async () => {
      const response = await fetch(
        `http://localhost:4000/tvseries/${params.movieId}`
      )
      console.log(response)
    }
    getResults()
  }, [params.movieId])

  const [expanded, setExpanded] = useState<number>(0)

  const computeIcon = (type: any) => {
    switch (type) {
      case 'cancel':
        return (
          <>
            <CancelOutlinedIcon />
            <Typography>Canceled</Typography>
          </>
        )
      case 'ongoing':
        return (
          <>
            <CheckCircleOutlineOutlinedIcon
              sx={{ color: 'green', fontSize: 40 }}
            />
            <Typography>Ongoing</Typography>
          </>
        )

      case 'paused':
        return (
          <>
            <PauseCircleOutlinedIcon />
            <Typography>Paused</Typography>
          </>
        )

      default:
        return null
    }
  }

  if (!movie) return null

  return (
    <Box
      width="100%"
      height="100%"
      sx={{
        backgroundColor: 'whitesmoke',
        flexDirection: 'column',
        alignItems: 'center',
        position: 'fixed',
      }}
      display="flex"
    >
      <Box
        width="100%"
        sx={{
          backgroundColor: '#D2D2CF',
          pl: 6,
          display: 'flex',
          alignItems: 'center',
          gap: 3,
        }}
      >
        <img
          src={movie.url || 'https://picsum.photos/300/425'}
          width="300px"
          height="425px"
          alt="123"
          style={{ borderRadius: '15px', marginTop: 10, marginBottom: 10 }}
        />
        <Box
          alignSelf="flex-start"
          display="flex"
          sx={{
            flexDirection: 'column',
            height: '100%',
            pt: 5,
          }}
        >
          <Typography fontWeight={700} variant="h3">
            {movie.name}
          </Typography>
          <Typography fontWeight={600} variant="h5" sx={{ pt: 5 }}>
            {movie.status}
          </Typography>
          <Box
            display="flex"
            sx={{ gap: 1, alignItems: 'center', fontSize: 50 }}
          >
            {computeIcon('ongoing')}
          </Box>
          <Typography fontWeight={600} variant="h5" sx={{ pt: 5 }}>
            Overview
          </Typography>
          <Typography>{movie.description || ''}</Typography>
        </Box>
      </Box>
      <Box
        pt={5}
        pb={5}
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        overflow="auto"
      >
        {movie.seasons?.map((season) => (
          <AccordionCustom
            name={season.name}
            id={season.id}
            isExpanded={expanded === season.id}
            setIsExpanded={setExpanded}
          />
        ))}
      </Box>
    </Box>
  )
}

export default MovieDetails
