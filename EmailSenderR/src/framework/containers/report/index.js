import React from "react";
import Screen from "../../../ui/screens/report";
import { loadEmailHistory, getTotalHistoryCount } from "../../services/emailHistory";

const Container = () => {
    return <Screen onLoad={loadEmailHistory} getTotalHistoryCount={getTotalHistoryCount} />;
};

export default Container;
