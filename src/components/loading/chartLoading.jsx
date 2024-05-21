import React from "react";
import cls from "./index.module.scss";
const ChartLoading = () => {
  return (
    <div className={cls.main}>
      <div className={cls.circle}></div>
      <div className={cls.circle}></div>
    </div>
  );
};

export default ChartLoading;
