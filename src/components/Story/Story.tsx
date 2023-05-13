import React, { useRef } from 'react'

// Import Swiper React components
import { Swiper, SwiperRef, SwiperSlide, useSwiper } from 'swiper/react'

// Import Swiper styles
import 'swiper/css'

type StoryProps = {
  storyData: any
}

const Story = ({ storyData }: StoryProps) => {
  const swiperRef = useRef<any>()

  console.log(swiperRef ? swiperRef.current : 'no swiper')

  return (
    <>
      <button type="button" onClick={() => swiperRef.current.slideTo(10)}>
        NExt slide
      </button>

      <audio controls>
        <source src="../../assets/audio/sample.mp3" type="audio/mp3" />
        <track kind="captions" />
      </audio>
      <Swiper
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{ delay: 100 }}
        onSlideChange={() => console.log('slide change')}
        onSwiper={(swiperEv) => {
          swiperRef.current = swiperEv
        }}
      >
        {storyData.map((story: any) => {
          return (
            <SwiperSlide key={story.id}>
              <img src={story.download_url} alt="unsplash" />
            </SwiperSlide>
          )
        })}
      </Swiper>
    </>
  )
}

export default Story
