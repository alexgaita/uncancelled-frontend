import React, { useEffect, useRef, useState } from 'react'

// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide, useSwiper } from 'swiper/react'
import { EffectFade, Navigation, Pagination } from 'swiper'

// Import Swiper styles
import 'swiper/css'
import 'swiper/css/effect-fade'
import { Box, IconButton, Modal, Typography } from '@mui/material'
import './styles.css'

import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined'
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined'
import { useNavigate } from 'react-router-dom'

type StoryProps = {
  storyData: any
}

const images = [
  './../assets/img/GameOfThrones/1.png',
  './../assets/img/GameOfThrones/3.png',
  './../assets/img/GameOfThrones/4.png',
  './../assets/img/GameOfThrones/2.png',
]
const videos = [
  './../assets/audio/GameOfThrones/1.mp3',
  './../assets/audio/GameOfThrones/2.mp3',
  './../assets/audio/GameOfThrones/3.mp3',
  './../assets/audio/GameOfThrones/4.mp3',
]

const texts = [
  'After Bran was crowned as the King of the Six Kingdoms, peace had finally returned to Westeros. However, it was not meant to last. A new threat emerged from beyond the Wall, a powerful and mysterious force that threatened to destroy everything that the people of Westeros had fought so hard to protect.\n',
  'Bran, with his powers as the Three-Eyed Raven, saw the danger that was coming and knew that he had to act. He called upon his council and his allies to prepare for war. Among them was Jon Snow, who had been exiled to the Night’s Watch for killing Daenerys Targaryen.\n',
  'The armies of the Six Kingdoms marched north to face the enemy. The battle was fierce and brutal, with both sides suffering heavy losses. In the end, it was Jon Snow who made the ultimate sacrifice. He gave his life to defeat the enemy and save Westeros from certain destruction.\n',
  'With the threat vanquished, Bran honored Jon’s memory by naming him a hero of the realm. The people of Westeros mourned his loss but celebrated his bravery. And so, peace returned once again to the land, but at a great cost',
]
const Story = ({ storyData }: StoryProps) => {
  const swiperRef = useRef<any>()
  const audioRef = useRef<any>()
  const [index, setIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const navigate = useNavigate()

  console.log(swiperRef ? swiperRef.current : 'no swiper')

  const audioIsVisible = (vIndex: number) => {
    return vIndex === index
  }

  useEffect(() => {
    const audios = document.getElementsByClassName('audio')

    console.log(index)
    console.log(audios)
    console.log(audios[index])
    if (audios[index]) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      audios[index].load()
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      audios[index].autoplay = true
    }
  }, [index])

  useEffect(() => {
    // TODO change this
    console.log('intra aici')
    if (index >= videos.length) {
      console.log('am terminat')
      setIsModalOpen(true)
    }
  }, [index])

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      sx={{
        backgroundImage: 'url(./../book.jpg)',
        objectFit: 'cover',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        height: '100vh',
      }}
      gap={2}
      pt={5}
    >
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            width: '30%',
            height: '20%',
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'white',
            gap: 4,
            p: 2,
          }}
        >
          <Typography fontWeight={700} variant="h5">
            Did you enjoy it?
          </Typography>
          <Box display="grid" gridTemplateColumns="1fr 1fr">
            <IconButton
              onClick={() => navigate('/')}
              sx={{ gap: 1, borderRadius: '10px' }}
            >
              <ThumbUpOutlinedIcon fontSize="large" />
              <Typography>Like</Typography>
            </IconButton>
            <IconButton
              onClick={() => navigate('/')}
              sx={{ gap: 1, borderRadius: '10px' }}
            >
              <ThumbDownOutlinedIcon fontSize="large" />
              <Typography>Dislike</Typography>
            </IconButton>
          </Box>
        </Box>
      </Modal>
      <Box display="grid" gridTemplateColumns="1fr 1fr" width="100%">
        <Swiper
          slidesPerView="auto"
          className="mySwiper"
          effect="fade"
          autoplay={{ delay: 100 }}
          modules={[EffectFade]}
          onSwiper={(swiperEv) => {
            swiperRef.current = swiperEv
          }}
          onEnded={() => console.log('all ended')}
        >
          {images.map((story: any) => {
            return (
              <SwiperSlide key={story}>
                <img
                  style={{ borderRadius: '20px' }}
                  src={story}
                  alt="unsplash"
                />
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Box pl={6} pr={5} display="flex" alignItems="flex-start" width="90%">
          <Typography fontWeight={500} fontSize="25px">
            {texts[index]}
          </Typography>
        </Box>
      </Box>
      {videos.map((video, vIndex) => {
        return (
          <audio
            className="audio"
            controls
            id="audio"
            autoPlay
            style={{
              position: audioIsVisible(vIndex) ? 'relative' : 'absolute',
              visibility: audioIsVisible(vIndex) ? 'visible' : 'hidden',
              marginTop: 40,
            }}
            onEnded={() => {
              if (vIndex === index) {
                swiperRef.current.slideTo(index + 1, 1500)
                setIndex(index + 1)
              }
            }}
          >
            <source src={videos[index]} type="audio/mp3" />
            <track kind="captions" />
          </audio>
        )
      })}
      {isModalOpen && <Box width={100} height={100} />}
    </Box>
  )
}

export default Story
