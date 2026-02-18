/**
 * Brand-compliant color styles for service/contact icon backgrounds.
 * Replaces non-brand colors (violet, emerald, amber, rose, cyan)
 * with combinations from our approved palette.
 */

export interface IconStyle {
  bg: string;
  text: string;
  border: string;
}

/**
 * 6 icon color styles for the Services (Hizmetler) page.
 * All use brand-approved colors only.
 */
export const SERVICE_ICON_STYLES: IconStyle[] = [
  {
    // Deep indigo
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
  },
  {
    // Purple
    bg: "bg-primary-light/10",
    text: "text-primary-light",
    border: "border-primary-light/20",
  },
  {
    // Lime
    bg: "bg-secondary/10",
    text: "text-secondary",
    border: "border-secondary/20",
  },
  {
    // Dark indigo
    bg: "bg-dark/10",
    text: "text-dark",
    border: "border-dark/20",
  },
  {
    // Muted stone
    bg: "bg-muted/10",
    text: "text-muted",
    border: "border-muted/20",
  },
  {
    // Primary light variant
    bg: "bg-primary-light/5",
    text: "text-primary-light",
    border: "border-primary-light/15",
  },
];

/**
 * 4 icon color styles for the Contact (İletişim) page.
 */
export const CONTACT_ICON_STYLES: IconStyle[] = [
  {
    bg: "bg-primary/10",
    text: "text-primary",
    border: "border-primary/20",
  },
  {
    bg: "bg-primary-light/10",
    text: "text-primary-light",
    border: "border-primary-light/20",
  },
  {
    bg: "bg-secondary/10",
    text: "text-secondary",
    border: "border-secondary/20",
  },
  {
    bg: "bg-dark/10",
    text: "text-dark",
    border: "border-dark/20",
  },
];

/**
 * Get a service icon style by index (cycles).
 */
export function getServiceIconStyle(index: number): IconStyle {
  return SERVICE_ICON_STYLES[index % SERVICE_ICON_STYLES.length];
}

/**
 * Get a contact icon style by index (cycles).
 */
export function getContactIconStyle(index: number): IconStyle {
  return CONTACT_ICON_STYLES[index % CONTACT_ICON_STYLES.length];
}
