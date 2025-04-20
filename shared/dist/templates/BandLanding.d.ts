interface BandLandingProps {
    config: {
        bandName: string;
        tagline: string;
        heroImage: string;
        ctaText: string;
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
        latestRelease: {
            label: {
                default: string;
            };
            title: string;
            coverArt: string;
            releaseDate: string;
            streamingLinks: Array<{
                platform: string;
                url: string;
            }>;
        };
        upcomingShows: {
            label: {
                default: string;
            };
            shows: Array<{
                date: string;
                venue: string;
                location: string;
                ticketUrl: string;
                style: {
                    bg: string;
                    rounded: string;
                    shadow: string;
                    backgroundImage: string;
                    backgroundOverlay: string;
                };
            }>;
        };
        musicVideos: {
            label: {
                default: string;
            };
            videos: Array<{
                title: string;
                thumbnailUrl: string;
                videoUrl: string;
                style: {
                    bg: string;
                    rounded: string;
                    shadow: string;
                    backgroundImage: string;
                    backgroundOverlay: string;
                };
            }>;
        };
    };
    onConfigChange: (key: string, value: unknown) => void;
}
export declare function BandLanding({ config, onConfigChange }: BandLandingProps): any;
export {};
