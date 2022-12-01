import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "./ui/layout";
import "./App.css";
import HomePage from "./framework/containers/home";
import RecipientsPage from "./framework/containers/recipients";
import ReportsPage from "./framework/containers/report";
import TemplatesPage from "./framework/containers/templates";
import SignaturesPage from "./framework/containers/signatures";
import PrivateRoutes from "./framework/routes/PrivateRoutes";
import HelpPage from "./framework/containers/help";
import UnAuthorizedPage from "./framework/containers/unAuthorized";
import NotFoundPage from "./framework/containers/notFound";

function App() {
    return (
        <BrowserRouter>
            <Layout>
                <Routes>
                    <Route element={<PrivateRoutes />}>
                        <Route exact path="/" element={<HomePage />} />
                        <Route exact path="/reports" element={<ReportsPage />} />
                        <Route exact path="/master-recipients" element={<RecipientsPage />} />
                        <Route exact path="/templates" element={<TemplatesPage />} />
                        <Route exact path="/signatures" element={<SignaturesPage />} />
                    </Route>
                    <Route exact path="/help" element={<HelpPage />} />
                    <Route exact path="/unauthorized" element={<UnAuthorizedPage />} />
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </Layout>
        </BrowserRouter>
    );
}

export default App;
