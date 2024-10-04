import React from "react";
import { Image } from "antd";

import burger from "../../assets/image/burger.jpg";

import "./style.scss";

const BurgerComponent = ({ amount }) => {
  return (
    <div className="wrapperBurger">
      <Image className="imageBurger" width={200} src={burger} preview={false} />

      <div className="contentBurger">
        <span>Price</span>
        <span>{amount}$</span>
      </div>
    </div>
  );
};

export default BurgerComponent;
