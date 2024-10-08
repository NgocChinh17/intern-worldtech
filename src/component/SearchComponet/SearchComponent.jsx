import React from "react";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

const SearchComponent = ({ onSearch }) => {
  return (
    <div>
      <Input
        placeholder="Tìm kiếm ở đây"
        prefix={<SearchOutlined />}
        onChange={(e) => onSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchComponent;
