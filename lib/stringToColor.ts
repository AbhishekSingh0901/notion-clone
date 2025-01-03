function stringToColor(str: string) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }

  // Create color from hash, but ensure lighter shades
  const r = (hash >> 16) & 0xff;
  const g = (hash >> 8) & 0xff;
  const b = hash & 0xff;

  // Set a minimum level for each color component to ensure lightness
  const minLightness = 180;
  const red = Math.max(r, minLightness);
  const green = Math.max(g, minLightness);
  const blue = Math.max(b, minLightness);

  const color = `#${((1 << 24) + (red << 16) + (green << 8) + blue)
    .toString(16)
    .slice(1)}`;

  return color;
}

export default stringToColor;
