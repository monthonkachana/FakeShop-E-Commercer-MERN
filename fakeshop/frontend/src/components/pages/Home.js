// หน้าเว็บเพจAdmin-user จัดการสินค้า
import React,{ useState }  from "react";
import NewProduct from "../home/NewProduct";
import BestSeller from '../home/BestSeller'
import Carousel from '../home/Carousel'

//antd
import { Pagination } from 'antd';
const Home = () => {
  
  const [current, setCurrent] = useState(3);
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };
  return (
    <div>      
        <Carousel/>     
      {/* New Product */}
      <h4 
      className="text-center p-3 mt-5 mb-5 display-4 jumbotron bg-dark text-white">
          สินค้ามาใหม่
       </h4>
         <NewProduct />   
        <div  className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <Pagination current={current} onChange={onChange} total={5} />
        </div>




      {/* Best Seller */}
      <h4 
      className="text-center p-3 mt-5 mb-5 display-4 jumbotron bg-dark text-white">
          สินค้าขายอย่างดี
       </h4>
        <BestSeller />
        <div  className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
        <Pagination current={current} onChange={onChange} total={5} />
        </div>

        
    </div>
  );
};

export default Home;
