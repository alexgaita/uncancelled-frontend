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

const MovieDetails = () => {
  const params = useParams()

  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    const getResults = async () => {
      const response = await fetch(
        `http://localhost:4000/tvseries/${params.movieId}`
      )
      const responseData = await response.json()
      const seasonData = await fetch(
        `http://localhost:4000/seasons/${params.movieId}`
      )
      const seasonsData = await seasonData.json()
      setMovie({ ...responseData, seasons: seasonsData })
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
      case 'finished':
        return (
          <>
            <CancelOutlinedIcon sx={{ color: 'yellow', fontSize: 40 }} />
            <Typography>Finished</Typography>
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
          src={`https://www.themoviedb.org/t/p/w440_and_h660_face${movie.wallpaper}`}
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
            Status
          </Typography>
          <Box
            display="flex"
            sx={{ gap: 1, alignItems: 'center', fontSize: 50 }}
          >
            {computeIcon(movie.status)}
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
        {movie.seasons
          ?.sort((movieA, movieB) => {
            return movieB.seasonNumber - movieA.seasonNumber
          })
          .map((season) => (
            <AccordionCustom
              name={season.seasonNumber}
              id={season.id}
              isExpanded={expanded === season.id}
              setIsExpanded={setExpanded}
              description={season.description}
            />
          ))}
      </Box>
    </Box>
  )
}

export default MovieDetails
