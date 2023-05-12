import React from 'react'
import { Box } from '@mui/material'
import Carousel from 'react-bootstrap/Carousel'

const NewGeneratedEpisode = () => {
  return (
    <Box
      width="100vw"
      height="100vh"
      sx={{
        backgroundColor: 'whitesmoke',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      display="flex"
    >
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/200/300"
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First slide label</h3>
            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/200/300"
            alt="Second slide"
          />

          <Carousel.Caption>
            <h3>Second slide label</h3>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src="https://picsum.photos/200/300"
            alt="Third slide"
          />

          <Carousel.Caption>
            <h3>Third slide label</h3>
            <p>
              Praesent commodo cursus magna, vel scelerisque nisl consectetur.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Box sx={{ height: 100, width: 100, backgroundColor: 'blue' }} />
    </Box>
  )
}

export default NewGeneratedEpisode
