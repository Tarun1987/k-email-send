import React from "react";
import Screen from "../../../ui/screens/report";
import { loadSomeData } from "../../services";

const Container = () => {
  const handleDataLoad = async () => {
    return await loadSomeData();
  };

  return <Screen onLoad={handleDataLoad} />;
};

export default Container;
