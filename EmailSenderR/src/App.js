import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./ui/layout";
import "./App.css";
import HomePage from "./framework/containers/home";
import RecipientsPage from "./framework/containers/recipients";
import ReportsPage from "./framework/containers/report";
import TemplatesPage from "./framework/containers/templates";
import SignaturesPage from "./framework/containers/signatures";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/reports" element={<ReportsPage />} />
          <Route exact path="/master-recipients" element={<RecipientsPage />} />
          <Route exact path="/templates" element={<TemplatesPage />} />
          <Route exact path="/signatures" element={<SignaturesPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
