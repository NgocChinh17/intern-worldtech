import React, { useEffect, useState } from "react"
import { Button, Popover, Space } from "antd"
import { Link, useNavigate } from "react-router-dom"
import { ROUTES } from "../../../constants/routes"
import {
  EditOutlined,
  HighlightOutlined,
  LoginOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
  UnorderedListOutlined,
  UserOutlined,
} from "@ant-design/icons"

import Search from "antd/es/transfer/search"

import "./style.scss"
import firebases from "../../../firebases"

const Header = () => {
  const navigate = useNavigate()

  const [user, setUser] = useState(null)

  useEffect(() => {
    const unsubscribe = firebases.onAuthStateChanged((user) => {
      if (user) {
        setUser(user)
      } else {
        setUser(null)
      }
    })
    return () => {
      unsubscribe()
    }
  }, [])

  const content = (
    <div>
      {user?.role === "admin" && (
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

      <p onClick={firebases.signOut(() => setUser(null))} style={{ cursor: "pointer" }}>
        <LogoutOutlined /> Đăng Xuất
      </p>
    </div>
  )

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
          {user ? (
            <Button>
              <LoginOutlined /> {user.displayName || user.email}{" "}
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
  )
}

export default Header
