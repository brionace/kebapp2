import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "@kebapp/shared/src/components/Layout";
import { TemplateSelection } from "@kebapp/shared/src/components/TemplateSelection";
import { ConfigureTemplate } from "@kebapp/shared/src/components/ConfigureTemplate";
import { PreviewAndBuild } from "@kebapp/shared/src/components/PreviewAndBuild";
import { steps } from "@kebapp/shared/src/utils/navUtils";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={steps[0].path} element={<Layout />}>
          <Route index element={<TemplateSelection />} />
          <Route
            path={`${steps[1].path}/:templateId`}
            element={<ConfigureTemplate />}
          />
          <Route
            path={`${steps[2].path}/:projectId`}
            element={<PreviewAndBuild />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
