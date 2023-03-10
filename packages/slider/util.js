export function getOffset(value, min, max) {
  return (value - min) / (max - min);
}
export function getDirectionStyle(direction, value, min, max) {
  const offset = getOffset(value, min, max);
  const positionStyle = {};

  switch (direction) {
    case 'rtl':
      positionStyle.right = `${offset * 100}%`;
      positionStyle.transform = 'translateX(50%)';
      break;

    case 'btt':
      positionStyle.bottom = `${offset * 100}%`;
      positionStyle.transform = 'translateY(50%)';
      break;

    case 'ttb':
      positionStyle.top = `${offset * 100}%`;
      positionStyle.transform = 'translateY(-50%)';
      break;

    default:
      positionStyle.left = `${offset * 100}%`;
      positionStyle.transform = 'translateX(-50%)';
      break;
  }

  return positionStyle;
}
export function getIndex(value, index) {
  return Array.isArray(value) ? value[index] : value;
}