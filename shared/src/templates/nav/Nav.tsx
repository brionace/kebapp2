import { useState } from "react";
import * as Icons from "lucide-react";

interface NavConfig {
  mainNav: {
    display: "mobile"; // Controls orientation of links
    theme: {
      bgColour: string; // Background color
      textColour: string; // Text color
      borderColour: string; // Border color
      borderRadius: string; // Border radius
      inverted: {
        bgColour: string; // Inverted background color
        textColour: string; // Inverted text color
        borderColour: string; // Inverted border color
      };
    };
    primaryLinks: {
      label: string; // Text for the link
      href: string; // URL for the link
      style?: {
        bg: string; // Background color
        text: string; // Text color
        rounded: string; // Border radius
        hoverBg: string; // Hover background color
        hoverText: string; // Hover text color
      };
    }[];
    secondaryLinks: {
      label: string; // Text for the link
      href: string; // URL for the link
      style?: {
        text: string; // Text color
        hoverText: string; // Hover text color
      };
    }[];
    socials: {
      display: "icon-only" | "text-only" | "icon-and-text"; // Controls how social links are displayed
      links: {
        label: string; // Text for the link
        href: string; // URL for the link
        icon?: string; // Icon name
        style?: {
          text: string; // Text color
          hoverText: string; // Hover text color
        };
      }[];
    };
  };
}

interface NavProps {
  config: NavConfig;
}

export function Nav({ config }: NavProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Early return if mainNav is not configured
  if (!config.mainNav) {
    return null;
  }

  const renderSocialLink = (
    link: NavConfig["mainNav"]["socials"]["links"][0]
  ) => {
    const IconComponent = Icons[
      link.icon as keyof typeof Icons
    ] as React.ElementType;

    switch (config.mainNav.socials.display) {
      case "icon-only":
        return IconComponent ? <IconComponent className="h-5 w-5" /> : null;
      case "text-only":
        return link.label;
      case "icon-and-text":
        return (
          <span className="flex items-center gap-2">
            {IconComponent ? <IconComponent className="h-5 w-5" /> : null}
            {link.label}
          </span>
        );
      default:
        return link.label;
    }
  };

  // Determine the theme to use (normal or inverted)
  const theme = isOpen ? config.mainNav.theme?.inverted : config.mainNav.theme;

  return (
    <nav className="relative">
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`lg:hidden inline-flex items-center justify-center p-2 rounded-md`}
        style={{
          color: theme?.textColour,
          borderColor: theme?.borderColour,
          borderRadius: theme?.borderRadius,
        }}
      >
        <span className="sr-only">Open main menu</span>
        {isOpen ? (
          <Icons.X className="block h-6 w-6" />
        ) : (
          <Icons.Menu className="block h-6 w-6" />
        )}
      </button>

      {/* Navigation Links */}
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } lg:flex lg:items-center lg:justify-between lg:static absolute top-full right-0 w-auto py-4 lg:py-0 shadow-lg lg:shadow-none z-50`}
        style={{
          backgroundColor: theme?.bgColour,
          color: theme?.textColour,
          borderRadius: theme?.borderRadius,
        }}
      >
        <div className={`flex flex-col lg:flex-row gap-6 px-4 lg:px-0`}>
          {/* Primary Links */}
          <ul className={`flex flex-col lg:flex-row gap-3`}>
            {config.mainNav.primaryLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="font-medium transition-colors"
                  style={{
                    backgroundColor: link.style?.bg,
                    color: link.style?.text,
                    borderRadius: link.style?.rounded,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor =
                      link.style?.hoverBg || "";
                    e.currentTarget.style.color = link.style?.hoverText || "";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      link.style?.bg || "";
                    e.currentTarget.style.color = link.style?.text || "";
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Secondary Links */}
          <ul className={`flex flex-col lg:flex-row gap-3`}>
            {config.mainNav.secondaryLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-500 hover:text-gray-700"
                  style={{
                    color: link.style?.text,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = link.style?.hoverText || "";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = link.style?.text || "";
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Social Links */}
          <ul className={`flex flex-col lg:flex-row gap-3`}>
            {config.mainNav.socials.links.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-500 hover:text-gray-700"
                  style={{
                    color: link.style?.text,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = link.style?.hoverText || "";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = link.style?.text || "";
                  }}
                >
                  {renderSocialLink(link)}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
}
