import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Image from 'next/image';

type ImageSliderProp = {
  images: string[];
  styles?: React.CSSProperties;
};

const ImageSlider = ({ images, styles }: ImageSliderProp) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index}>
          <Image src={image} alt="image" style={{ ...styles }} width={400} height={400} />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
