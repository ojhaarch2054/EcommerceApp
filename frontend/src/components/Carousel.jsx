import Carousel from 'react-bootstrap/Carousel';
import image1 from '../Assets/Shopping.jpg';
import image2 from '../Assets/Shopping.jpg';
import image3 from '../Assets/Shopping.jpg';

const CarouselSection = () => {
  return (
    <div>
      <Carousel>
        <Carousel.Item>
          <img
            src={image1}
            alt="First slide"
            className="d-block w-100 mx-auto h-auto shadow-lg p-3 rounded"
          />
          <Carousel.Caption>
            {/*<h3 >Enjoy Your Shopping With Us</h3>*/}
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image2}
            alt="Second slide"
            className="d-block w-100 mx-auto h-auto shadow-lg p-3 rounded"
          />
          <Carousel.Caption>
            {/*<h3 >Enjoy Your Shopping With Us</h3>*/}
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            src={image3}
            alt="Third slide"
            className="d-block w-100 mx-auto h-auto shadow-lg p-3 rounded"
          />
          <Carousel.Caption>
            {/*<h3 >Enjoy Your Shopping With Us</h3>*/}
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselSection;