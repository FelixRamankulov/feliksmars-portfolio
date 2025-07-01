declare module 'react-compare-image' {
  import * as React from 'react';

  export interface ReactCompareImageProps {
    leftImage: string;
    rightImage: string;
    sliderLineColor?: string;
    sliderLineWidth?: number;
    aspectRatio?: number;
    hover?: boolean;
    handleSize?: number;
    sliderPositionPercentage?: number;
    vertical?: boolean;
    alt?: string;
  }

  const ReactCompareImage: React.FC<ReactCompareImageProps>;

  export default ReactCompareImage;
}
