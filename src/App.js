import React from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes.js";

import LayerRX from "./Layout/LayerRX/LayerRX.jsx";
import UserLayout from "./Layout/UserLayout";

import SignIn from "./page/SignIn/signIn.jsx";
import SignUp from "./page/SignUp/signUp.jsx";
import Order from "./page/Order/Order.jsx";
import BurgerBuilder from "./page/BurgerBuilder/BurgerBuilder.jsx";
import Ingredients from "./page/Ingredients";
import AreaChart from "./page/AreaCharts/AreaChart.jsx";

function App() {
  return (
    <Routes>
      <Route element={<LayerRX />}>
        <Route path={ROUTES.SIGN_IN} element={<SignIn mode="SignIn" />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp mode="SignUp" />} />
      </Route>

      <Route path="/" element={<UserLayout />}>
        <Route index element={<BurgerBuilder />} />
        <Route path={ROUTES.ORDER} element={<Order />} />
        <Route path={ROUTES.INGREDIENTS} element={<Ingredients />} />
        <Route path={ROUTES.AREA_CHART} element={<AreaChart />} />
      </Route>
    </Routes>
  );
}

export default App;
