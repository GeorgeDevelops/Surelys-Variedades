import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Slider = (props) => {
  const {
    slideWidth,
    autoPlay,
    horizontal,
    vertical,
    showBullets,
    bulletsColor,
    bulletsBorderColor,
    topRelative,
    leftRelative,
    images,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgs, setImgs] = useState([]);

  function nextArrow() {
    if (images.length === currentIndex + 1) {
      return setCurrentIndex(0);
    } else if (currentIndex < images.length) {
      return setCurrentIndex(currentIndex + 1);
    }
  }

  function prevArrow() {
    if (currentIndex === 0) {
      return setCurrentIndex(images.length - 1);
    } else if (currentIndex > 0) {
      return setCurrentIndex(currentIndex - 1);
    }
  }

  function slideSlider(time) {
    setInterval(() => {
      nextArrow();
    }, time);
  }

  function setBulletPosition(index) {
    setCurrentIndex(index);
  }

  autoPlay && slideSlider(autoPlay);

  useEffect(() => {
    let urlArray = [];
    if (images) {
      images.forEach((obj) => {
        let url = obj.image;
        urlArray.push(url);
      });

      setImgs(urlArray);
    }
  }, [images]);

  return (
    <React.Fragment>
      <div
        className="sliderContainer"
        style={{ width: slideWidth, top: topRelative, left: leftRelative }}
      >
        <img
          src={imgs[currentIndex || 0]}
          alt="Loading / Image not available"
          id="slider"
          width={slideWidth}
          style={{ display: "flex" }}
        />

        <div className="image_control">
          <FontAwesomeIcon
            onClick={prevArrow}
            style={{ left: horizontal, top: vertical }}
            className="arrow left"
            icon="fa-solid fa-chevron-left"
          />
          <FontAwesomeIcon
            onClick={nextArrow}
            style={{ right: horizontal, top: vertical }}
            id="right_arrow"
            className="arrow right"
            icon="fa-solid fa-chevron-right"
          />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Slider;

// {
//   showBullets && (
//     <div id="bulletsContainer">
//       {Array.from({ length: null }).map((item, index) => (
//         <div
//           key={index}
//           className={currentIndex === index ? "dot active" : "dot"}
//           onClick={() => setBulletPosition(index)}
//           style={{
//             backgroundColor: bulletsColor,
//             borderColor: bulletsBorderColor,
//           }}
//         ></div>
//       ))}
//     </div>
//   );
// }
