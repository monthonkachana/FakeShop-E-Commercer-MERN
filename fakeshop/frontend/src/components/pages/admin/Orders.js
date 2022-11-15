//rafce
import React, { useState, useEffect } from "react";
import MenubarAdmin from "../../layout/MenubarAdmin";
import { useSelector } from "react-redux";
//function
// import { getOrders } from "../../functions/users";
import { updateStatusOrder, getOrdersAdmin } from "../../functions/admin";
// notify
import { toast } from "react-toastify";
// antd
import { Table } from "antd";


const Orders = () => {
  const { user } = useSelector((state) => ({ ...state }));
  const [orders, setOrders] = useState([]);


  const loadData = () => {
    getOrdersAdmin(user.token).then((res) => {
      setOrders(res.data);
    });
  };
  // console.log(orders);

  const handleChangeStatus = (orderId, orderstatus) => {
    updateStatusOrder(user.token, orderId, orderstatus).then((res) => {
      console.log(res.data);
      toast.info("Updated " + res.data.orderstatus + " Success");
      loadData();
    });
  };
  useEffect(() => {
    loadData();
  }, []);
  const columns = [
    {
      title: "ชื่อผู้ใช้",
      dataIndex: "orderdBy",
      render: (item, i) => <>{item.username}</>,
    },
    {
      title: "รายการสินค้า",
      render: (item, i) => (
        <ol>
          {item.products.map((p, i) => (
            <li>
              {p.product.title}{" "}
              <b>
                {p.price}x{p.count}
              </b>
            </li>
          ))}
        </ol>
      ),
    },
    {
      title: "ราคารวมสุทธิ",
      dataIndex: "cartTotal",
      key: "cartTotal",
    },
    {
      title: "สถานะ",
      dataIndex: "orderstatus",
      key: "orderstatus",
    },
    {
      title: "อัพเดทสถานะ",
      render: (item) => (
        <select
          value={item.orderstatus}
          onChange={(e) => handleChangeStatus(item._id, e.target.value)}
          style={{ width: "200px", alignSelf: "center" }}
          className="form form-control"
        >
          <option value="Not Process">Not Process</option>
          <option value="Processing">Processing</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Completed">Completed</option>
        </select>
      ),
    },
  ];
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <MenubarAdmin />
        </div>
        <div className="col text-center">
          <Table dataSource={orders} columns={columns} />
        </div>
      </div>
    </div>
  );
};

export default Orders;
