import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import banner1 from '../../assets/Banner1.jpg'
import banner2 from '../../assets/Banner2.jpg'
import banner3 from '../../assets/Banner3.jpg'

const Banner = () => {
  return (
    <Carousel className="mt-10" autoPlay={true} infiniteLoop={true}>
      <div>
        <img className="max-h-100" src={banner3} />
      </div>
      <div>
        <img className="max-h-100" src={banner2} />
      </div>
      <div>
        <img className="max-h-100" src={banner1} />
      </div>
    </Carousel>
  );
};

export default Banner;