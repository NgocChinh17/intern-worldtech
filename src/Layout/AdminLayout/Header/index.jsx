import React from "react";
import { Button, Popover, Space } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import {
  HomeOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined,
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
            <Button icon={<HomeOutlined />}>Home</Button>
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
