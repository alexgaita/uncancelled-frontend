import React, { useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import GeneratedContents from './GeneratedContents'
import ModalCustom from './ModalCustom'

interface IAccordionDetails {
  isExpanded: boolean
  setIsExpanded: any
  id: number

  name: string
}

const generatedContents = [
  {
    id: 1,
    avatar: 'https://i.pravatar.cc/100',
    like: 20,
    description:
      'There were other things in the stocking, nuts and oranges and a toy\n' +
      '        engine, and chocolate almonds and a clockwork mouse, but the Rabbit was\n' +
      '        quite the best of all. For at least two hours the Boy loved him, and\n' +
      '        then Aunts and Uncles came to dinner, and there was a great rustling of\n' +
      'There were other things in the stocking, nuts and oranges and a toy\n' +
      '        engine, and chocolate almonds and a clockwork mouse, but the Rabbit was\n' +
      '        quite the best of all. For at least two hours the Boy loved him, and\n' +
      '        then Aunts and Uncles came to dinner, and there was a great rustling of\n' +
      '        tissue paper and unwrapping of parcels, and in the excitement of looking\n' +
      '        at all the new presents the Velveteen Rabbit was forgotten.',
    dislike: 10,
  },
]

const AccordionCustom = ({
  name,
  setIsExpanded,
  isExpanded,
  id,
}: IAccordionDetails) => {
  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  return (
    <>
      <ModalCustom isOpen={open} handleClose={handleClose} seasonId={id} />

      <Accordion
        sx={{ width: '80%' }}
        expanded={isExpanded}
        onChange={() => setIsExpanded(id)}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Box
            display="flex"
            sx={{ justifyContent: 'space-between', alignItems: 'center' }}
            width="100%"
          >
            <Typography>{name}</Typography>
            <Box display="flex" flexGrow={1} pl={10} overflow="clip">
              <Typography noWrap>
                Bored with being the Lord of Hell, the devil relocates to Los
                Angeles, where he opens a nightclub and forms a connection with
                a homicide detective.
              </Typography>
            </Box>
            <Box>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation()
                  handleOpen()
                }}
              >
                <AddIcon />
              </IconButton>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" width="100%">
            {generatedContents.map((contents) => (
              <GeneratedContents
                id={contents.id}
                description={contents.description || ''}
                avatar={contents.avatar}
                like={contents.like}
                dislike={contents.dislike}
              />
            ))}
          </Box>
        </AccordionDetails>
      </Accordion>
    </>
  )
}

export default AccordionCustom
