import React, { useEffect, useState } from "react";
import Slider from "./slider";
import Card from "./common/cards";
import sliderService from "../services/sliderService";
import CommunicationBanner from "./communicationBanner";
import Carousel from "./carousel";

const Feed = (props) => {
  const [images, setImages] = useState();

  async function getSliderContent() {
    const { data } = await sliderService.getSliderContent();
    return setImages(data);
  }

  useEffect(() => {
    getSliderContent();
  }, []);

  return (
    <React.Fragment>
      <Slider
        slideWidth={"65%"}
        images={images}
        autoPlay={null}
        showBullets={true}
        bulletsColor={"#b6488b"}
      />

      <CommunicationBanner />

      <Carousel />

      <div id="feed-banner">
        <p>
          El estilo es una expresión profundamente personal de quién eres, y
          cada vez que te vistes, afirmas una parte de ti misma.
        </p>
        <p>- Nina Garcia -</p>
      </div>

      <div id="cards-banner">
        <Card />
      </div>
    </React.Fragment>
  );
};

export default Feed;
