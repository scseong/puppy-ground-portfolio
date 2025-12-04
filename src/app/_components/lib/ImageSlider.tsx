import Image from 'next/image';
import { useEffect } from 'react';
import Slider from 'react-slick';

type ImageSliderProp = {
  images: string[];
  styles?: React.CSSProperties;
  width?: number | `${number}` | undefined;
  height?: number | `${number}` | undefined;
};

const ImageSlider = ({ images, styles, width, height }: ImageSliderProp) => {
  const multiConfig = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  const singleConfig = {
    ...multiConfig,
    dots: false,
    draggable: false,
    arrows: false
  };

  const selectedConfig = images.length > 1 ? multiConfig : singleConfig;

  useEffect(() => {
    import('slick-carousel/slick/slick.css');
    import('slick-carousel/slick/slick-theme.css');
  }, []);

  return (
    <Slider {...selectedConfig}>
      {images.map((image, index) => (
        <div key={index}>
          <Image
            src={image}
            alt="image"
            style={{ ...styles }}
            width={width}
            height={height}
            priority={index === 0}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
