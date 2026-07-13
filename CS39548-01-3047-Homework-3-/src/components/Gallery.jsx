import { useState } from 'react' //Improved features based on the comments left on Homework 1: reconfigured gallery to be more mobile friendly
import { gallerySlides } from '../data/gallerySlides'

export default function Gallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalSlides = gallerySlides.length

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides)
  }

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  return (
    <section id="gallery">
      <h2 className="section-title">Gallery</h2>
      <div className="slider-container">
        <div
          className="slider"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {gallerySlides.map((slide) => (
            <div key={slide.id} className="slide">
              <img src={slide.image} alt={slide.alt} />
              <div className="slide-caption">{slide.caption}</div>
            </div>
          ))}
        </div>
        <button
          type="button"
          className="slider-btn prev"
          aria-label="Previous slide"
          onClick={goToPrev}
        >
          ❮
        </button>
        <button
          type="button"
          className="slider-btn next"
          aria-label="Next slide"
          onClick={goToNext}
        >
          ❯
        </button>
      </div>
    </section>
  )
}
