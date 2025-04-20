export type ConfigSchemaField = {
    type: "string";
    label: string;
    default?: string;
    show?: true;
    options?: string[];
} | {
    type: "array";
    label: string;
    default?: unknown[];
    show?: true;
    items?: ConfigSchemaField;
} | {
    type: "object";
    label: string;
    show?: true;
    properties: Record<string, ConfigSchemaField>;
};
export type Template = {
    id: string;
    name: string;
    description: string;
    thumbnail: string;
    category: "landing" | "blog" | "band" | "blank" | "charity" | "portfolio" | "ecommerce" | "business" | "restaurant" | "event" | "showcase";
    framework: "nextjs" | "react";
    configSchema: Record<string, ConfigSchemaField>;
};
export interface Project {
    id: string;
    templateId: string;
    config: Record<string, unknown>;
    createdAt: string;
    updatedAt: string;
}
export interface NextJsTemplate {
    pages: Record<string, string>;
    styles: Record<string, string>;
    components: Record<string, string>;
    config: Record<string, unknown>;
}
