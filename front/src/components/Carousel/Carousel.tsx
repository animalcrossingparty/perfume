import React from 'react'
import Icon from '@material-ui/core/Icon'

// carousel
import Carousel from '@brainhubeu/react-carousel';
// import '@brainhubeu/react-carousel/lib/style.css';

export default () => (
  <Carousel
  slidesPerPage={1}
  arrows
  infinite
  arrowLeft={<Icon>keyboard_arrow_left</Icon>}    
  arrowLeftDisabled={<Icon>keyboard_arrow_left</Icon>}
  arrowRight={<Icon>keyboard_arrow_right</Icon>}
  arrowRightDisabled={<Icon>keyboard_arrow_right</Icon>}
  addArrowClickHandler
  >
      <img src="https://user-images.githubusercontent.com/52684457/78364149-f4a44680-75f7-11ea-807e-058782006beb.png"
        alt="" />
      <img src="https://user-images.githubusercontent.com/52684457/78364153-f5d57380-75f7-11ea-8a7b-ec33f2acb971.png"
        alt="" />
      <img src="https://user-images.githubusercontent.com/52684457/78364154-f66e0a00-75f7-11ea-8bdf-696c60f88508.png"
        alt="" />
      <img src="https://user-images.githubusercontent.com/52684457/78810565-78e53800-7a03-11ea-8a22-80c4f7211b71.png"
        alt="" />
      <img src="https://user-images.githubusercontent.com/52684457/78810573-7aaefb80-7a03-11ea-8c68-048c7e7b0234.png"
        alt="" />
      <img src="https://user-images.githubusercontent.com/52684457/78810576-7b479200-7a03-11ea-8cd4-8c08624bb059.png"
        alt="" />
      <img src="https://user-images.githubusercontent.com/52684457/78810580-7c78bf00-7a03-11ea-93f0-2c8081ace8e8.png"
        alt="" />
      <img src="https://user-images.githubusercontent.com/52684457/78810584-7c78bf00-7a03-11ea-88dd-c84b60138d10.png"
        alt="" />
    </Carousel>
)