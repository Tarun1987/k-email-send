import React from "react";
import Screen from "../../../ui/screens/recipients";
import { loadSomeData } from "../../services";

const Container = () => {
  const handleDataLoad = async () => {
    return await loadSomeData();
  };

  return <Screen onLoad={handleDataLoad} />;
};

export default Container;
