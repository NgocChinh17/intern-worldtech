import React from "react";
import { Button, Popover, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import {
  AlignLeftOutlined,
  EditOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import Search from "antd/es/transfer/search";

import "./style.scss";

const Header = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));

  const userName = storedUserData ? storedUserData.name : null;
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userData");
    localStorage.removeItem("orderData");
    localStorage.removeItem("data");
    navigate("/");
    window.location.reload();
  };

  const content = (
    <div>
      <Link to={ROUTES.AREA_CHART}>
        <p style={{ cursor: "pointer", color: "#333" }}>
          <AlignLeftOutlined /> Biểu Đồ
        </p>
      </Link>
      <p onClick={handleLogout} style={{ cursor: "pointer" }}>
        <LogoutOutlined /> Đăng Xuất
      </p>
    </div>
  );

  return (
    <div className="wrapperHeader">
      <Space className="spaceHeader">
        <div className="containerHeader">
          <Link className="linkHeader" to="/">
            <Button icon={<EditOutlined />}>Burger Builder</Button>
          </Link>

          <Link className="linkHeader" to={ROUTES.ORDER}>
            <Button icon={<ShoppingCartOutlined />} style={{ marginLeft: 20 }}>
              Orders
            </Button>
          </Link>

          <Link className="linkHeader" to={ROUTES.INGREDIENTS}>
            <Button icon={<UnorderedListOutlined />} style={{ marginLeft: 20 }}>
              Ingredients
            </Button>
          </Link>
        </div>

        <div className="searchHeader">
          <Search placeholder="input search text" />
        </div>
        <Popover content={content} title="Thông Tin" trigger="click">
          {userName ? (
            <Button>
              <LoginOutlined /> {userName}
            </Button>
          ) : (
            <Link to={ROUTES.SIGN_IN}>
              <Button>
                <LoginOutlined />
                Đăng Nhập
              </Button>
            </Link>
          )}
        </Popover>
      </Space>
    </div>
  );
};

export default Header;
