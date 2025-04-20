interface BlankTemplateProps {
    config: {
        title: string;
        description: string;
        components: any[];
    };
    onConfigChange: (key: string, value: any) => void;
}
export declare function BlankTemplate({ config, onConfigChange }: BlankTemplateProps): any;
export {};
