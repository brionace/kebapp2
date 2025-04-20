export declare function renderTemplate(templateId: string, config: Record<string, unknown>, onConfigChange: (key: string, value: unknown) => void): any;
interface RenderTemplateToHTMLConfig {
    config: Record<string, unknown>;
}
export declare function renderTemplateToHTML(templateId: string, config: RenderTemplateToHTMLConfig["config"]): string;
export {};
