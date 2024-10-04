import React, { useState } from "react";

import FormComponent from "../../component/FormSignUpComponent/SignUp";

const SignUp = () => {
  const [mode, setMode] = useState("SignUp");

  return (
    <div>
      <FormComponent mode={mode} />
    </div>
  );
};

export default SignUp;
