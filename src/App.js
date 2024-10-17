import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ROUTES } from "./constants/routes.js";

import LayerRX from "./Layout/LayerRX/LayerRX.jsx";
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";

//page user
import SignIn from "./page/SignIn/signIn.jsx";
import SignUp from "./page/SignUp/signUp.jsx";
import Order from "./page/Order/Order.jsx";
import BurgerBuilder from "./page/BurgerBuilder/BurgerBuilder.jsx";
import Ingredients from "./page/Ingredients";
import AreaChart from "./page/AreaCharts/AreaChart.jsx";

//profile
import Profiles from "./page/Profile/Profiles.jsx";

//Admin
import HomeAdmin from "./page/HomeAdmin/HomeAdmin.jsx";
import firebases from "./firebases.js";

function App() {
  const [user_, setUser] = useState("");

  useEffect(() => {
    const fn = firebases.onAuthStateChanged(function a(user) {
      setUser(user);
    });

    firebases
      .fetchData()
      .then((users) => {
        setUser(users);
        // console.log(users);
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      fn();
    };
  }, []);

  return (
    <Routes>
      <Route element={<LayerRX />}>
        <Route path={ROUTES.SIGN_IN} element={<SignIn mode="SignIn" />} />
        <Route path={ROUTES.SIGN_UP} element={<SignUp mode="SignUp" />} />
      </Route>

      <Route path="/" element={<UserLayout />}>
        <Route index element={<BurgerBuilder />} />
        <Route path={ROUTES.PAGE.ORDER} element={<Order />} />
        <Route path={ROUTES.PAGE.INGREDIENTS} element={<Ingredients />} />
        <Route path={ROUTES.PAGE.PROFILE} element={<Profiles />} />
      </Route>

      <Route element={<AdminLayout />}>
        <Route path={ROUTES.ADMIN.HOME_ADMIN} element={<HomeAdmin />} />
        <Route path={ROUTES.ADMIN.AREA_CHART} element={<AreaChart />} />
      </Route>
    </Routes>
  );
}

export default App;
