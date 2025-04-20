interface StyleEditorProps {
    style: {
        bg: string;
        rounded: string;
        shadow: string;
        backgroundImage: string;
        backgroundOverlay: string;
    };
    onChange: (style: any) => void;
}
export declare function StyleEditor({ style, onChange }: StyleEditorProps): any;
export {};
