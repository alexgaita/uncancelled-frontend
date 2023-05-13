import React, { useState } from 'react'
import {
  Box,
  Checkbox,
  IconButton,
  MenuItem,
  Modal,
  Select,
  Slider,
  Typography,
} from '@mui/material'
import MovieOutlinedIcon from '@mui/icons-material/MovieOutlined'

interface IModalCustom {
  isOpen: boolean
  handleClose: () => void
  seasonId: number
}

const marks = [
  {
    value: 0,
    label: 'Less',
  },
  {
    value: 1,
    label: 'Normal',
  },
  {
    value: 2,
    label: 'More',
  },
]
const ModalCustom = ({ isOpen, handleClose, seasonId }: IModalCustom) => {
  const [violence, setViolence] = useState<number>(0)
  const [dramatic, setDramatic] = useState<number>(0)
  const [funny, setFunny] = useState<number>(0)
  const [instructional, setInstructional] = useState<boolean>(false)
  const [pixelArt, setPixelArt] = useState<boolean>(false)
  const [language, setLanguage] = useState<string>('romanian')
  const [speakingStyle, setSpeakingStyle] = useState<string>('british man')

  const handlePost = () => {
    fetch('https://localhost:4000/newCreate', {
      method: 'POST',
      body: JSON.stringify({
        seasonId,
        violence,
        dramatic,
        funny,
        instructional,
        isPixelArt: pixelArt,
        language,
        speakingStyle,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
  }

  return (
    <Modal open={isOpen} onClose={handleClose}>
      <Box
        sx={{
          width: '50%',
          height: '70%',
          backgroundColor: 'white',
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '20px',
          display: 'flex',
          flexDirection: 'column',
          p: 5,
          gap: 3,
        }}
      >
        <Typography fontWeight={700} variant="h4">
          Create New Content
        </Typography>
        <Box display="grid" gridTemplateColumns="1fr 2fr">
          <Typography alignSelf="flex-start">Violence</Typography>
          <Slider
            marks={marks}
            value={violence}
            onChange={(event, newValue) => {
              setViolence(newValue as number)
            }}
            step={1}
            min={-1}
            max={1}
          />
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 2fr">
          {' '}
          <Typography fontWeight={500} alignSelf="flex-start">
            Dramatic
          </Typography>
          <Slider
            marks={marks}
            step={1}
            min={-1}
            max={1}
            value={dramatic}
            onChange={(event, newValue) => {
              setDramatic(newValue as number)
            }}
          />
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 2fr">
          {' '}
          <Typography>Funny</Typography>
          <Slider
            marks={marks}
            value={funny}
            onChange={(event, newValue) => {
              setFunny(newValue as number)
            }}
            step={1}
            min={-1}
            max={1}
          />
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 1fr" justifyItems="center">
          <Box display="flex" alignItems="center">
            <Checkbox
              value={instructional}
              onChange={(event, checked) => setInstructional(checked)}
            />
            <Typography>Instructional</Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <Checkbox
              value={pixelArt}
              onChange={(event, checked) => setPixelArt(checked)}
            />
            <Typography>PixelArt</Typography>
          </Box>
        </Box>
        <Box display="grid" gridTemplateColumns="1fr 1fr" justifyItems="center">
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Language</Typography>
            <Select
              sx={{ minWidth: 120 }}
              size="small"
              value={language}
              onChange={(event) => setLanguage(event.target.value)}
            >
              <MenuItem value="romanian">Romanian</MenuItem>
              <MenuItem value="english">English</MenuItem>
            </Select>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <Typography>Style</Typography>
            <Select
              sx={{ minWidth: 130 }}
              size="small"
              value={speakingStyle}
              onChange={(event) => setSpeakingStyle(event.target.value)}
            >
              <MenuItem value="default">Default</MenuItem>
              <MenuItem value="snoop">Snoop</MenuItem>
              <MenuItem value="british man">British Man</MenuItem>
              <MenuItem value="female">Female</MenuItem>
            </Select>
          </Box>
        </Box>
        <Box alignSelf="center" pt={2}>
          <IconButton
            sx={{ borderRadius: '10px', gap: 1 }}
            onClick={handlePost}
          >
            <MovieOutlinedIcon fontSize="large" />
            <Typography>Action</Typography>
          </IconButton>
        </Box>
      </Box>
    </Modal>
  )
}

export default ModalCustom
