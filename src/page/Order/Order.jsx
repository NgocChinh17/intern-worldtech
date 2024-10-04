import React from "react";

import BurgerComponent from "../../component/BurgerBuilderComponent/BurgerBuilderComponent";
import FormOrderComponent from "../../component/FormOrderComponent/FormOrderComponent";
import { useLocation } from "react-router-dom";

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
