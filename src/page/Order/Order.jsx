import React from "react";
import { useLocation } from "react-router-dom";

import BurgerComponent from "../../component/BurgerBuilderComponent/BurgerBuilderComponent";
import FormOrderComponent from "../../component/FormOrderComponent/FormOrderComponent";

const Order = () => {
  const location = useLocation();
  const { totalAmount, data } = location.state || {};

  return (
    <div>
      <BurgerComponent amount={totalAmount} />
      <FormOrderComponent data={data} amount={totalAmount} />
    </div>
  );
};

export default Order;
