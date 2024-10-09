import React, { useEffect, useState } from "react";
import { Area, AreaChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Value } from "sass";

const AreaChartComponent = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const savedDataUpdate = JSON.parse(localStorage.getItem("data")) || [];
    const formattedData = savedDataUpdate.map((item, index) => ({
      name: item.name,
      TotalPrice: item.totalAmount,
    }));
    setData(formattedData);
  }, []);

  return (
    <div style={{ margin: "30px 0px 0px 200px" }}>
      <h2>Biểu Đồ</h2>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip formatter={(value) => value.toLocaleString()} />
        <Area
          type="monotone"
          dataKey="TotalPrice"
          stroke="#8884d8"
          fillOpacity={1}
          fill="url(#colorUv)"
        />
      </AreaChart>
    </div>
  );
};

export default AreaChartComponent;
