import React from 'react'
import { Box, IconButton, Typography } from '@mui/material'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'

interface IGeneratedContents {
  id: number
  avatar: string

  description: string
  like: number
  dislike: number
}

const GeneratedContents = ({
  id,
  avatar,
  like,
  description,
  dislike,
}: IGeneratedContents) => {
  return (
    <Box
      display="flex"
      sx={{ borderTop: '1px solid grey', overflow: 'hidden' }}
      justifyContent="space-between"
      alignItems="center"
      minHeight={150}
      maxHeight={150}
      pl={5}
    >
      <img style={{ borderRadius: '5px' }} src={avatar} alt="none" />
      <Typography width="50%" alignSelf="flex-start" textOverflow="ellipsis">
        {description}
      </Typography>
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <IconButton sx={{ gap: 1, borderRadius: '10px' }}>
          <ThumbUpOutlinedIcon />
          <Typography>{like} likes</Typography>
        </IconButton>
        <IconButton sx={{ gap: 1, borderRadius: '10px' }}>
          <ThumbDownOutlinedIcon />
          <Typography>{dislike} dislikes</Typography>
        </IconButton>
      </Box>
    </Box>
  )
}

export default GeneratedContents
