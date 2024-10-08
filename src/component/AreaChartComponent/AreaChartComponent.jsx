import React from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";

const AreaChartComponent = ({ data }) => {
  return (
    <div style={{ margin: "-70px 0px 0px 200px" }}>
      <h2>Biểu Đồ</h2>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorTotalAmount" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Area
          type="monotone"
          dataKey="totalAmount"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorTotalAmount)"
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartComponent;
