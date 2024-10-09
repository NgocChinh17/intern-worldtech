import React from "react";
import { Steps } from "antd";

const StepComponent = ({ currentStep }) => {
  return (
    <div style={{ marginTop: 16, marginBottom: 20 }}>
      <Steps
        size="small"
        current={currentStep}
        items={[
          {
            title: "Burger",
          },
          {
            title: "Order",
          },
          {
            title: "Done",
          },
        ]}
      />
    </div>
  );
};

export default StepComponent;
