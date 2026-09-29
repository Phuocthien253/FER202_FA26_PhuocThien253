import { useEffect } from 'react'
import './Banner.css'
import pizza1 from '../assets/Images/pizza1.jpg'
import pizza2 from '../assets/Images/pizza2.jpg'
import pizza3 from '../assets/Images/pizza3.jpg'
import pizza4 from '../assets/Images/pizza4.jpg'
import pizza5 from '../assets/Images/pizza5.jpg'

function Banner() {
  useEffect(() => {
    const el = document.getElementById('pizzaBanner')
    if (el && window.bootstrap?.Carousel) {
      const carousel = window.bootstrap.Carousel.getOrCreateInstance(el, {
        interval: 3500,
        ride: 'carousel',
        wrap: true,
      })
      carousel.cycle()
    }
  }, [])

  return (
    <div
      id="pizzaBanner"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="3500"
    >
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="2"
          aria-label="Slide 3"
        ></button>
        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="3"
          aria-label="Slide 4"
        ></button>
        <button
          type="button"
          data-bs-target="#pizzaBanner"
          data-bs-slide-to="4"
          aria-label="Slide 5"
        ></button>
      </div>

      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src={pizza1}
            className="d-block w-100"
            alt="Pizza 1"
          />
        </div>

        <div className="carousel-item">
          <img
            src={pizza2}
            className="d-block w-100"
            alt="Pizza 2"
          />
        </div>

        <div className="carousel-item">
          <img
            src={pizza3}
            className="d-block w-100"
            alt="Pizza 3"
          />
        </div>

        <div className="carousel-item">
          <img
            src={pizza4}
            className="d-block w-100"
            alt="Pizza 4"
          />
        </div>

        <div className="carousel-item">
          <img
            src={pizza5}
            className="d-block w-100"
            alt="Pizza 5"
          />
        </div>
      </div>

      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#pizzaBanner"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>

      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#pizzaBanner"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  )
}

export default Banner