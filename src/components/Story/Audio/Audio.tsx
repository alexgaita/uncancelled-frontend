import React from 'react'
import { useSwiper } from 'swiper/react'

const Audio = () => {
  const swiper = useSwiper()

  console.log(swiper ? swiper.activeIndex : 'no swiper')
  return (
    <>
      <button type="button" onClick={() => swiper.slideTo(10)}>
        NExt slide
      </button>

      <audio controls>
        <source src="../../assets/audio/sample.mp3" type="audio/mp3" />
        <track kind="captions" />
      </audio>
    </>
  )
}

export default Audio
