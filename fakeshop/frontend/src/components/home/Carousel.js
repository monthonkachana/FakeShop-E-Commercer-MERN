import React from 'react';
import { Carousel } from 'antd';
import banner1 from '../img/banners/banner1.png'
import banner2 from '../img/banners/banner2.png'
import banner3 from '../img/banners/banner3.png'
const contentStyle = {
  height: '400px',
  lineHeight: '150px',
  className:"p-3 mt-5 mb-5 display-4 jumbotron",
 
};
const App = () => (
  <Carousel autoplay>
    <div >
      <img src={banner1} alt="banner1" style={contentStyle} /> 
    </div>
    <div>
    <img src={banner2} alt="banner2" style={contentStyle} /> 
    </div>
    <div>
    <img src={banner3} alt="banner3" style={contentStyle} /> 
    </div>
  </Carousel>
);
export default App;