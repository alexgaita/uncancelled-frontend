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

type StoryProps = {
  storyData: any
}

const images = [
  './../assets/img1.jpeg',
  './../assets/img2.jpeg',
  './../assets/img3.jpeg',
  './../assets/img4.jpeg',
  './../assets/img6.jpeg',
]
const videos = [
  '../../assets/audio/text4.mp3',
  '../../assets/audio/text4.mp3',
  '../../assets/audio/text4.mp3',
  '../../assets/audio/text4.mp3',
  '../../assets/audio/text4.mp3',
]

const texts = [
  'Step 3: Open the Airway\n' +
    "Position the person flat on their back on a hard surface. Kneel next to their neck and shoulders. Place the heel of one hand on the center of the person's chest, and the other hand on top, interlocking your fingers. With your elbows straight, use your body weight to compress the chest at least 2 inches deep, but not more than 2.4 inches. Compress at a rate of 100 to 120 compressions per minute.",
  'Step 4: Check for Breathing\n' +
    "After 30 chest compressions, open the person's airway using the head-tilt, chin-lift maneuver. To do this, place one hand on the person's forehead and gently tilt their head back, lifting the chin using two fingers of your other hand under the chin.\n",
  'Step 5: Give Rescue Breaths\n' +
    "With the airway open, give rescue breaths by pinching the nostrils shut and covering the person's mouth with yours, making a seal. Blow in for about one second, ensuring that the person's chest rises. Give two rescue breaths and then continue chest compressions.",
  "With the airway open, give rescue breaths by pinching the nostrils shut and covering the person's mouth with yours, making a seal. Blow in for about one second, ensuring that the person's chest rises. Give two rescue breaths and then continue chest compressions.",
  "With the airway open, give rescue breaths by pinching the nostrils shut and covering the person's mouth with yours, making a seal. Blow in for about one second, ensuring that the person's chest rises. Give two rescue breaths and then continue chest compressions.",
]
const Story = ({ storyData }: StoryProps) => {
  const swiperRef = useRef<any>()
  const audioRef = useRef<any>()
  const [index, setIndex] = useState(0)
  const [isModalOpen, setIsModalOpen] = useState(true)

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
      gap={2}
      pt={5}
    >
      <Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <Box
          sx={{
            width: '30%',
            height: '20%',
            backgroundColor: 'white',
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 4,
            p: 2,
          }}
        >
          <Typography fontWeight={700} variant="h5">
            Did you enjoy it?
          </Typography>
          <Box display="grid" gridTemplateColumns="1fr 1fr">
            <IconButton sx={{ gap: 1, borderRadius: '10px' }}>
              <ThumbUpOutlinedIcon fontSize="large" />
              <Typography>Like</Typography>
            </IconButton>
            <IconButton sx={{ gap: 1, borderRadius: '10px' }}>
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
        <Box pr={5} display="flex" alignItems="center">
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
            }}
            onEnded={() => {
              if (vIndex === index) {
                swiperRef.current.slideTo(index + 1, 3000)
                setIndex(index + 1)
              }
            }}
          >
            <source src={videos[index]} type="audio/mp3" />
            <track kind="captions" />
          </audio>
        )
      })}
    </Box>
  )
}

export default Story
