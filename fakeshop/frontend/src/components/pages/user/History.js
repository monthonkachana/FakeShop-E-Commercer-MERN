import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import MenubarUser from "../../layout/MenubarUser";
// Order <> History
import { getOrders } from "../../functions/users";

import InvoiceJsPDF from '../../order/InvoiceJsPDF'

const History = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [orders, setOrders] = useState([]);

  const loadData = () => {
    getOrders(user.token).then((res) => setOrders(res.data));
  };

  useEffect(() => {
    loadData();
  }, []);


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarUser />
        </div>

        <div className="col text-center">
          <div className="row">
            <h1>ประวัติการ ซื้อ-ขาย</h1>
            {/* 1 Loop Order Card */}
            {orders.map((item, index) => {
              console.log("item", item);
              return (
                <div key={index} className="card m-3">
                  <p>Order {"   " + item.orderstatus}</p>
                  {/* Table */}
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <td>ชื่อสินค้า</td>
                        <td>ราคา</td>
                        <td>จำนวน</td>
                      </tr>
                    </thead>
                    {/* 2 Loop Table */}
                    {item.products.map((p, i) => (
                      <tr>
                        <td>{p.product.title}</td>
                        <td>{p.price}</td>
                        <td>{p.count}</td>
                      </tr>
                    ))}
                    <tr>
                      <td colSpan={3}>
                        ราคาสุทธิ:{" "}
                        <b>
                          <u>{item.cartTotal}</u>
                        </b>
                      </td>
                    </tr>
                  </table>
                  {/* Table */}
                  {/*  PDF */}
                  <div className="row">
                    <div className="col">
                      <InvoiceJsPDF order={item} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;
