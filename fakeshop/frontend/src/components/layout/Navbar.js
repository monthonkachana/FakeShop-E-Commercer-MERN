//navbar ไปทุกที่
import React from "react";
import { Menu, Badge } from "antd";
import FakeShop from "../img/FakeShop.png"
import {
  // MailOutlined,
  AppstoreOutlined,
  // SettingOutlined,
  //HomeOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserAddOutlined,
  LoginOutlined,
  LogoutOutlined,
  DownOutlined
} from "@ant-design/icons";

// Router
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Search from "../card/Search";
import Cart from "../pages/Cart";
const Navbar = () => {
  const { SubMenu } = Menu;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user, cart } = useSelector((state) => ({ ...state }));
  console.log("user Navbar", user);

  const logout = () => {
    dispatch({
      type: "LOGOUT",
      payload: null,
    });
    navigate("/");
  };
  return (
    <Menu mode="horizontal">
      <Link to="/" >
        <div className="logo" >
          <img src={FakeShop} alt="FakeShop" width="150" />
        </div>
      </Link>
      <Menu.Item key="shop" icon={<ShoppingCartOutlined />}>
        <Link to="/shop">Shop</Link>
      </Menu.Item>
      <Menu.Item key="cart" icon={<ShoppingOutlined />}>
        <Link to="/cart">
          <Badge count={cart.length} offset={[12, 0]}>Cart</Badge>

        </Link>
      </Menu.Item>

      {user && (
        <>
          {/* {user.username} #loginout */}
          <SubMenu
            style={{ float: "right" }}
            key="SubMenu"
            icon={<DownOutlined />}
            title={user.username}

          >
            {/*  condidtion login data admin/user */}
            {
              user.role == "admin" ? (
                <Menu.Item
                   icon={<AppstoreOutlined />}
                  key="setting:5"
                >
                  <Link to="/admin/index">Data</Link>
                </Menu.Item> //true
              ) : (
                <Menu.Item
                   icon={<AppstoreOutlined />}
                  key="setting:5"
                >
                  <Link to="/user/index">Data</Link>
                </Menu.Item>
              ) //false
            }






            <Menu.Item
              icon={<LogoutOutlined />}
              key="setting:1" onClick={logout}>
              Logout
            </Menu.Item>

          </SubMenu>
        </>
      )}


      {!user && (

        <>
          <Menu.Item
            key="mail"
            style={{ float: "right" }}
            icon={<LoginOutlined />}
          >
            {/* <a href="/login" ></a>*/}
            <Link to="/login">Login</Link>
          </Menu.Item>

          <Menu.Item
            style={{ float: "right" }}
            key="register"
            icon={<UserAddOutlined />}
          >
            <Link to="/register">Register</Link>
          </Menu.Item>
        </>
      )}
      <span className="p-1" style={{ float: "right" }}>
        <Search />
      </span>
    </Menu>
  );
};

export default Navbar;
