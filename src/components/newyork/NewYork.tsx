import React, { FC } from "react";
import CustomStorageImage from "../common/CustomStorageImage";

const NewYork: FC = () => {
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "16px 0" }}>New York Gallery!</h1>
      <CustomStorageImage path="nyc" />
    </>
  );
};

export default NewYork;