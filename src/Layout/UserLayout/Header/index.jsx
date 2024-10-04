import React, { useEffect, useState } from "react";
import { Button, Popover, Space } from "antd";
import Search from "antd/es/transfer/search";
import { Link } from "react-router-dom";
import { ROUTES } from "../../../constants/routes";
import {
  AlignCenterOutlined,
  HomeOutlined,
  LoadingOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";

import { useLocation } from "react-router-dom";

import "./style.scss";

const Header = () => {
  const location = useLocation();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (location.state?.userData) {
      setUserData(location.state.userData);
      localStorage.setItem("userData", JSON.stringify(location.state.userData));
    } else {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
        setUserData(JSON.parse(storedUserData));
      }
    }
  }, [location.state?.userData]);

  const content = (
    <div>
      <p>
        <AlignCenterOutlined /> Đơn Hàng
      </p>
      <p>
        <LogoutOutlined /> Đăng Xuất
      </p>
    </div>
  );

  return (
    <div className="wrapperHeader">
      <Space className="spaceHeader">
        <Link to="/">
          <Button icon={<HomeOutlined />}>Trang Chủ</Button>
        </Link>

        <div className="containerHeader">
          <Link className="linkHeader" to="/">
            <Button icon={<LoadingOutlined />}>Burger Builder</Button>
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
          <Link to={ROUTES.SIGN_IN}>
            <Button>
              <LoginOutlined />
              Đăng Nhập
            </Button>
          </Link>
        </Popover>
      </Space>
    </div>
  );
};

export default Header;
