import React, { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { AppstoreOutlined, UsergroupAddOutlined } from "@ant-design/icons";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { FiUser } from "react-icons/fi";
import { updateUser } from "../features/user/userSlice";
const { Content, Sider } = Layout;

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

function MainLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const urlString = window.location.pathname.split("/");

  const [items, setItems] = useState([
    getItem("Brands", "sub1", <LiaChalkboardTeacherSolid />, [
      getItem("All Brand", "/brands"),
    ]),
    {
      type: "divider",
    },
    getItem("Categories", "sub2", <UsergroupAddOutlined />, [
      getItem("All Category", "/category"),
    ]),
    {
      type: "divider",
    },
    getItem("SubCategory", "sub3", <UsergroupAddOutlined />, [
      getItem("All Sub Category", "/subcategory"),
    ]),
    {
      type: "divider",
    },
    getItem("Tags", "sub4", <AppstoreOutlined />, [
      getItem("All Tag", "/tags"),
    ]),
    {
      type: "divider",
    },
    getItem("Capacity", "sub5", <AppstoreOutlined />, [
      getItem("All Capacity", "/capacity"),
    ]),
    {
      type: "divider",
    },
    getItem("Color", "sub6", <AppstoreOutlined />, [
      getItem("All Color", "/color"),
    ]),
    {
      type: "divider",
    },
    getItem("Products", "sub7", <AppstoreOutlined />, [
      getItem("Add Product", "/addproduct"),
      getItem("All Product", "/products"),
    ]),
    {
      type: "divider",
    },
    getItem("Order", "sub8", <AppstoreOutlined />, [
      getItem("All Order", "/order"),
    ]),
    {
      type: "divider",
    },
    getItem("Account", "sub9", <FiUser />, [
      getItem("User Account", "/profile"),
      getItem("Logout", "12"),
    ]),
    {
      type: "divider",
    },
  ]);

  const userAuth = useSelector((state) => state.userInfo.userData);

  useEffect(() => {
    if (userAuth && "error" in userAuth) {
      if (!userAuth.error) {
        navigate("/login");
      }
    }
  }, [userAuth, navigate]);

  useEffect(() => {
    if (userAuth.role === "user") {
      setItems(items.slice(items.length - 2, items.length - 1));
      navigate("/");
    }
  }, []);

  const handleLogout = () => {
    dispatch(updateUser({ error: false }));
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  const onClick = (e) => {
    if (e.key !== "12") {
      navigate(e.key);
    }

    if (e.keyPath[1] === "sub9") {
      if (e.key === "12") {
        handleLogout();
      }
    }
  };

  return (
    <Layout>
      <Layout>
        <Sider
          width={200}
          style={{
            background: colorBgContainer,
          }}
        >
          <Menu
            onClick={onClick}
            mode="inline"
            items={items}
            defaultSelectedKeys={["1"]}
            defaultOpenKeys={["sub1"]}
            style={{
              height: "100vh",
              borderRight: 0,
            }}
          />
        </Sider>
        <Layout
          style={{
            padding: "0 24px 24px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
            items={[
              {
                title: <NavLink to="/">Dashboard</NavLink>,
              },
              {
                title: urlString[1] ? urlString[1] : "Home",
              },
            ]}
          />

          <Content
            style={{
              padding: 24,
              margin: 0,
              height: "100%",
              background: colorBgContainer,
            }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
