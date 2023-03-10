import * as React from 'react';
import type { StretchType } from '../interface';

export default (
  stretch?: StretchType,
): [React.CSSProperties, (element: HTMLElement) => void] => {
  const [targetSize, setTargetSize] = React.useState({ width: 0, height: 0 });

  function measureStretch(element: HTMLElement) {
    setTargetSize({
      width: element.offsetWidth,
      height: element.offsetHeight,
    });
  }

  // Merge stretch style
  const style = React.useMemo<React.CSSProperties>(() => {
    const sizeStyle: React.CSSProperties = {};

    if (stretch) {
      const { width, height } = targetSize;

      // Stretch with target
      if (stretch.indexOf('height') !== -1 && height) {
        // @ts-ignore
        sizeStyle.height = height;
      } else if (stretch.indexOf('minHeight') !== -1 && height) {
        // @ts-ignore
        sizeStyle.minHeight = height;
      }
      if (stretch.indexOf('width') !== -1 && width) {
        // @ts-ignore
        sizeStyle.width = width;
      } else if (stretch.indexOf('minWidth') !== -1 && width) {
        // @ts-ignore
        sizeStyle.minWidth = width;
      }
    }

    return sizeStyle;
  }, [stretch, targetSize]);

  return [style, measureStretch];
};
