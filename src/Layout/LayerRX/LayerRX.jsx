import { Segmented } from "antd";
import React, { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

import "./style.scss";

export default function LayerRX() {
  const [mode, setMode] = useState("SignIn");
  const navigate = useNavigate();

  const handleChange = (value) => {
    setMode(value);
    if (value === "SignIn") {
      navigate(ROUTES.SIGN_IN);
    } else if (value === "SignUp") {
      navigate(ROUTES.SIGN_UP);
    }
  };

  return (
    <div>
      <Segmented
        className="segmented"
        size="large"
        value={mode}
        onChange={handleChange}
        options={[
          {
            value: "SignIn",
            label: "Sign In",
          },
          {
            value: "SignUp",
            label: "Sign Up",
          },
        ]}
      />
      <Outlet context={{ mode }} />
    </div>
  );
}
