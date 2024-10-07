import React from "react";
import { Steps } from "antd";

const StepComponent = ({ items = [], current = 0 }) => {
  const defaultItems = [{ title: "Burger" }, { title: "Order" }, { title: "CheckOut" }];

  return (
    <div style={{ marginTop: 20, marginBottom: 20 }}>
      <Steps current={current} items={items.length ? items : defaultItems} />
    </div>
  );
};

export default StepComponent;
