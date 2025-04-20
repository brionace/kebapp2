interface ClassicNavProps {
    config: {
        mainNav?: {
            display: string;
            primaryLinks: {
                label: string;
                href: string;
                style?: {
                    bg: string;
                    rounded: string;
                };
            }[];
            secondaryLinks: {
                label: string;
                href: string;
            }[];
            socials: {
                display: string;
                links: {
                    label: string;
                    href: string;
                }[];
            };
        };
    };
    onConfigChange: (key: string, value: unknown) => void;
}
export declare function ClassicNav({ config }: ClassicNavProps): any;
export {};
