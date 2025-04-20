
      import React from "react";
      import ReactDOM from "react-dom/client"; 
      import { TEMPLATE_REGISTRY } from "@kebapp/shared/src/templates/index.js";
      import "../../frontend/src/index.css"; // Import Tailwind CSS

      const config = {"title":"My Landing Page","heroTitle":"Welcome to our platform","heroSubtitle":"The best solution for your needs","ctaText":"Get Started","primaryColor":"#4F46E5","mainNav":{"display":"default","primaryLinks":[{"label":"Home","href":"/"},{"label":"Features","href":"/features"}],"secondaryLinks":[{"label":"About","href":"/about"},{"label":"Contact","href":"/contact"}],"socials":{"display":"icon-and-text","links":[{"platform":"twitter","label":"Twitter","href":"https://twitter.com","icon":"Twitter"},{"platform":"github","label":"GitHub","href":"https://github.com","icon":"Github"}]}},"seo":"Our landing page description goes here","features":[{"title":"Feature 1","description":"Description of feature 1","style":{"bg":"bg-white","rounded":"rounded-lg","shadow":"shadow-sm","backgroundImage":"","backgroundOverlay":"bg-opacity-100"}},{"title":"Feature 2","description":"Description of feature 2","style":{"bg":"bg-white","rounded":"rounded-lg","shadow":"shadow-sm","backgroundImage":"","backgroundOverlay":"bg-opacity-100"}},{"title":"Feature 3","description":"Description of feature 3","style":{"bg":"bg-white","rounded":"rounded-lg","shadow":"shadow-sm","backgroundImage":"","backgroundOverlay":"bg-opacity-100"}}]};
      const TemplateComponent = TEMPLATE_REGISTRY["modern-landing"];

      if (!TemplateComponent) {
        throw new Error("TemplateComponent not found in TEMPLATE_REGISTRY");
      }

      const rootElement = document.getElementById("root");
      if (!rootElement) {
        throw new Error("Root element not found in the DOM");
      }

      const root = ReactDOM.createRoot(rootElement); // Use createRoot for React 18+
      root.render(React.createElement(TemplateComponent, { config }));
    