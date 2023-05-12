import React from 'react'

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

type StoryProps = {
  storyData: any
}

const Story = ({ storyData }: StoryProps) => {
  return (
    <>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 100 }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiper) => console.log(swiper)}
      >
        {storyData.map((story: any) => {
          return (
            <SwiperSlide key={story.id}>
              <img src={story.download_url} alt="unsplash" />
            </SwiperSlide>
          )
        })}
      </Swiper>
      <audio src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3">
        <source
          src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/123941/Yodel_Sound_Effect.mp3"
          type="audio/mp3"
        />
        <track kind="captions" />
      </audio>
    </>
  )
}

export default Story
