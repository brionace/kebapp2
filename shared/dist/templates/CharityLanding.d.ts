type CharityLandingConfig = {
    title: {
        type: "string";
        label: "Page Title";
        default: "Support Our Cause";
    };
    heroSection: {
        type: "object";
        label: "Hero Section";
        properties: {
            heading: {
                type: "string";
                label: "Heading";
                default: "Make a Difference Today";
            };
            subheading: {
                type: "string";
                label: "Subheading";
                default: "Join us in our mission to create a better world.";
            };
            backgroundImage: {
                type: "string";
                label: "Background Image URL";
                default: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee";
            };
        };
    };
    donationCTA: {
        type: "object";
        label: "Donation Call-to-Action";
        properties: {
            heading: {
                type: "string";
                label: "Heading";
                default: "Your Support Matters";
            };
            buttonText: {
                type: "string";
                label: "Button Text";
                default: "Donate Now";
            };
            donationLink: {
                type: "string";
                label: "Donation Link";
                default: "https://example.com/donate";
            };
        };
    };
    featuredCauses: {
        type: "array";
        label: "Featured Causes";
        default: Array<{
            title: string;
            description: string;
            imageUrl: string;
        }>;
        items: {
            type: "object";
            label: "Cause";
            properties: {
                title: {
                    type: "string";
                    label: "Title";
                    default: "";
                };
                description: {
                    type: "string";
                    label: "Description";
                    default: "";
                };
                imageUrl: {
                    type: "string";
                    label: "Image URL";
                    default: "";
                };
            };
        };
    };
    contactSection: {
        type: "object";
        label: "Contact Section";
        properties: {
            heading: {
                type: "string";
                label: "Heading";
                default: "Get in Touch";
            };
            email: {
                type: "string";
                label: "Contact Email";
                default: "contact@example.com";
            };
            phone: {
                type: "string";
                label: "Contact Phone";
                default: "+1 234 567 890";
            };
        };
    };
};
interface CharityLandingProps {
    config: CharityLandingConfig;
    onConfigChange?: (key: string, value: unknown) => void;
}
export declare function CharityLanding({ config }: CharityLandingProps): any;
export {};
