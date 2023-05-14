import React, { useEffect, useState } from 'react'
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Grid,
  IconButton,
  Typography,
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useParams } from 'react-router-dom'
import GeneratedContents from './GeneratedContents'
import ModalCustom from './ModalCustom'

interface IAccordionDetails {
  isExpanded: boolean
  setIsExpanded: any
  id: number

  name: string
  description: string
}

const generatedContents = [
  {
    id: 1,
    avatar: '/aUQKIpZZ31KWbpdHMCmaV76u78T.jpg',
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
  description,
}: IAccordionDetails) => {
  const [scenario, setScenario] = useState<any[]>([])

  const [open, setOpen] = useState(false)
  const handleOpen = () => setOpen(true)
  const handleClose = () => setOpen(false)

  useEffect(() => {
    const getGeneratedContents = async () => {
      const response = await fetch(`http://localhost:4000/scenario/${id}`)
      const responseData = await response.json()
      setScenario(responseData)
    }
    getGeneratedContents()
  }, [])

  if (!scenario) return null

  return (
    <>
      <ModalCustom isOpen={open} handleClose={handleClose} seasonId={id} />

      <Accordion
        sx={{ width: '80%' }}
        expanded={isExpanded}
        onChange={() => setIsExpanded(id)}
      >
        <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
          <Grid
            container
            sx={{
              alignItems: 'center',
            }}
            width="100%"
          >
            <Grid item xs={1}>
              <Typography>S0{name}</Typography>
            </Grid>
            <Grid item xs={10} overflow="hidden">
              <Typography noWrap>{description.slice(0, 100)}</Typography>
            </Grid>
            <Grid item xs={1} justifySelf="flex-end" pl={5}>
              <IconButton
                onClick={(event) => {
                  event.stopPropagation()
                  handleOpen()
                }}
              >
                <AddIcon />
              </IconButton>
            </Grid>
          </Grid>
        </AccordionSummary>
        <AccordionDetails>
          <Box display="flex" flexDirection="column" width="100%">
            {scenario.map((contents) => (
              <GeneratedContents
                id={contents.id}
                description={contents.storyName}
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
