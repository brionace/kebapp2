export function invertColor(hex: string): string {
  // Remove the hash if present
  hex = hex.replace("#", "");

  // Convert to RGB
  const r = 255 - parseInt(hex.substring(0, 2), 16);
  const g = 255 - parseInt(hex.substring(2, 4), 16);
  const b = 255 - parseInt(hex.substring(4, 6), 16);

  // Convert back to hex
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
