import React, { useState } from "react";
import { Button, Popover, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import {
  EditOutlined,
  HighlightOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons";

import Search from "antd/es/transfer/search";

import "./style.scss";

const Header = () => {
  const storedUserData = JSON.parse(localStorage.getItem("userData"));
  const { role } = storedUserData || {};
  const userName = storedUserData ? storedUserData.name || storedUserData.email : null;
  const navigate = useNavigate();

  const [userLogin, setUser] = useState("") || {};

  const handleLogout = () => {
    localStorage.removeItem("userData");
    navigate("/");
    window.location.reload();
  };

  const content = (
    <div>
      {role === "admin" && (
        <p
          style={{ cursor: "pointer" }}
          onClick={() => navigate(ROUTES.ADMIN.HOME_ADMIN)}
        >
          <HighlightOutlined /> Quản Lý Sản Phẩm
        </p>
      )}

      <p style={{ cursor: "pointer" }} onClick={() => navigate(ROUTES.PAGE.PROFILE)}>
        <UserOutlined /> Thông Tin Tài Khoản
      </p>

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

          <Link className="linkHeader" to={ROUTES.PAGE.ORDER}>
            <Button icon={<ShoppingCartOutlined />} style={{ marginLeft: 20 }}>
              Orders
            </Button>
          </Link>

          <Link className="linkHeader" to={ROUTES.PAGE.INGREDIENTS}>
            <Button icon={<UnorderedListOutlined />} style={{ marginLeft: 20 }}>
              Ingredients
            </Button>
          </Link>
        </div>

        <div className="searchHeader">
          <Search placeholder="input search text" />
        </div>

        <Popover content={content} title="Thông Tin" trigger="click">
          {userLogin ? (
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
