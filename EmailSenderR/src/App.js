import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./ui/layout";
import "./App.css";
import HomePage from "./framework/containers/home";
import RecipientsPage from "./framework/containers/recipients";
import ReportsPage from "./framework/containers/report";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/reports" element={<ReportsPage />} />
          <Route exact path="/master-recipients" element={<RecipientsPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
