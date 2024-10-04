import React, { useState } from "react";

import FormComponent from "../../component/FormSignInComponent/FormSignInComponent";

const SignIn = () => {
  const [mode, setMode] = useState("SignIn");

  return (
    <div>
      <FormComponent mode={mode} />
    </div>
  );
};

export default SignIn;
