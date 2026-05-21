/**
 * LogoDisplay — Shows the brand logo icon in full color + "LIGHT TOWER LIGHTINGS" text in white.
 * Since the logo PNG contains both the icon and dark text, we:
 * - Show only the icon portion by displaying the image with object-position (cropping the text part)
 * - Render the brand text below it in white as a styled HTML element
 */

interface LogoDisplayProps {
  /** Height class for the image. Defaults to h-10 */
  iconClass?: string;
  /** Show the logo image with text. Default: true. If false, shows icon-only */
  showText?: boolean;
  /** Unused prop kept for backwards compatibility */
  textClass?: string;
}

export default function LogoDisplay({
  iconClass = "h-10",
  showText = true,
}: LogoDisplayProps) {
  if (showText) {
    return (
      <img
        src="/images/logo-white-text.png"
        alt="Light Tower Illumination"
        className={`${iconClass} w-auto object-contain select-none`}
      />
    );
  }

  return (
    <img
      src="/images/logo-icon-only.png"
      alt="Light Tower Illumination Icon"
      className={`${iconClass} w-auto object-contain select-none`}
    />
  );
}

