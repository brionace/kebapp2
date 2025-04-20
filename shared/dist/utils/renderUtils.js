import ReactDOMServer from "react-dom/server";
import { TEMPLATE_REGISTRY } from "@kebapp/shared/src/templates";
export function renderTemplate(templateId, config, onConfigChange) {
    const TemplateComponent = TEMPLATE_REGISTRY[templateId];
    if (!TemplateComponent) {
        throw new Error(`Template with id "${templateId}" not found.`);
    }
    return <TemplateComponent config={config} onConfigChange={onConfigChange}/>;
}
export function renderTemplateToHTML(templateId, config) {
    const TemplateComponent = TEMPLATE_REGISTRY[templateId];
    if (!TemplateComponent) {
        throw new Error(`Template with id "${templateId}" not found.`);
    }
    // Convert JSX to HTML string
    return ReactDOMServer.renderToStaticMarkup(<TemplateComponent config={config}/>);
}
