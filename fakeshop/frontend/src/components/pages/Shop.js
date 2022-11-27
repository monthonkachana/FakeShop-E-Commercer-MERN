
import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import ProductCard from '../card/ProductCard'

// antd
import { Slider, Checkbox, Collapse, Rate } from "antd";
import { CaretRightOutlined, FrownOutlined, MehOutlined, SmileOutlined } from '@ant-design/icons';
//functions
import { listProduct, searchFilters } from '../functions/product'
import { listCategory } from "../functions/category";

const Shop = () => {
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(false)
  const [price, setPrice] = useState([0, 0]);
  const [ok, setOk] = useState(false);
  const { Panel } = Collapse;
  // Category
  const [category, setCategory] = useState([]);
  const [categorySelect, setCategorySelect] = useState([]);
  //Ranking
  const [value, setValue] = useState(3);
  const desc = ['แย่มาก', 'แย่', 'ปกติ', 'ดี', 'ดีมาก'];

  const { search } = useSelector((state) => ({ ...state }));
  // console.log(search.text)
  const { text } = search;
  // text

  const loadData = () => {
    setLoading(true);
    listProduct(12)
      .then((res) => {
        setProduct(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };


  const handleCheck = (e) => {
    // ค่าปัจจุบันที่ Check
    let inCheck = e.target.value;

    // ค่าเดิมของ Check
    let inState = [...categorySelect];

    let findCheck = inState.indexOf(inCheck);

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelect(inState); //put ส่งไปเก็บ
    fetchDataFilter({ category: inState }); // ดึง [0,0]
    if (inState.length < 1) {
      loadData()
    }
  };



  const handlePrice = (value) => {
    setPrice(value);

    setTimeout(() => {
      setOk(!ok);
    }, 300);
  };
  // Filter api to store หลังบ้าน
  const fetchDataFilter = (arg) => {
    searchFilters(arg).then((res) => {
      setProduct(res.data);
    });
  };

  //useEffect 1 data สำหรับ user filter ค้นหาด้วย text
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchDataFilter({ query: text });
      if (!text) {
        loadData();
      }
    }, 300);
    return () => clearTimeout(delay);
  }, [text]);
  // ถ้าใส่ใน infinity loop จะทำงานทุกครั้ง ที่พิม

  // useEffect 2. Load on Slider การค้าหาด้วย  Slider
  useEffect(() => {
    fetchDataFilter({ price }); // [0,0]
  }, [ok]);

  //useEffect 3 ใช้ตัวที่ import
  useEffect(() => {
    loadData()
    listCategory().then(res => setCategory(res.data))
  }, [])
  return <>
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-md-3'>

          <Collapse
            bordered={false}
            defaultActiveKey={['1']}
            expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
            className="site-collapse-custom-collapse"
          >
            <Panel header="ค้นหาด้วยราคาสินค้า" key="1" className="site-collapse-custom-panel">
              <Slider value={price} onChange={handlePrice} range max={100000} />
            </Panel>
            <Panel header="ค้นหาตามหมวดหมู่สินค้า" key="2" className="site-collapse-custom-panel">
              {category.map((item, index) => (
                <Checkbox onChange={handleCheck} value={item._id}>
                  {item.name}
                </Checkbox>
              ))}
            </Panel>
            <Panel header="Ranking" key="3" >
              <span>
                <Rate tooltips={desc} onChange={setValue} value={value} />
                {value ? <span className="ant-rate-text">{desc[value - 1]}</span> : ''}
              </span>
            </Panel>
          </Collapse>

        </div>
        {/* ขวามือ Product */}
        <div className=' col-md-9'>
          {loading
            ? <h4 className='text-danger'>Loading...</h4>
            : <h4 className='text-info'>Product</h4>
          }
          {product.length < 1 && <p> No Product found</p>}
          <div className='row pb-5'>
            {product.map((item, index) => (
              <div key={index} className="col-md-4 mt-3">
                <ProductCard product={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </>

}

export default Shop