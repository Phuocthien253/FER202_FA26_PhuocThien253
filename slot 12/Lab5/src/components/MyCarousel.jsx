import Carousel from "react-bootstrap/Carousel";
import { banners } from "../data/banners";

function MyCarousel() {
  return (
    <Carousel interval={3000} pause={false}>
      {banners.map((banner) => (
        <Carousel.Item key={banner.id}>
          <img
            className="d-block w-100"
            src={banner.image}
            alt={banner.title}
            style={{
              height: "350px",
              objectFit: "cover"
            }}
          />

          <Carousel.Caption
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.55)",
              borderRadius: "8px",
              padding: "10px"
            }}
          >
            <h3>{banner.title}</h3>
            <p>{banner.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default MyCarousel;