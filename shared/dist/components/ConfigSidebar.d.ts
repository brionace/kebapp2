import type { Template } from "../types";
interface ConfigSidebarProps {
    isOpen: boolean;
    onClose: () => void;
    template: Template;
    config: Record<string, any>;
    onConfigChange: (key: string, value: any) => void;
    onAddArrayItem: (key: string, schema: any) => void;
    onRemoveArrayItem: (key: string, index: number, path: string[]) => void;
    onAddLink: (path: string[], defaultLink: any) => void;
    onRemoveLink: (path: string[], index: number) => void;
    onToggleShow: (key: string, value: boolean) => void;
}
export declare function ConfigSidebar({ isOpen, onClose, template, config, onConfigChange, onAddArrayItem, onRemoveArrayItem, onAddLink, onRemoveLink, onToggleShow, }: ConfigSidebarProps): any;
export {};
