import Image, { ImageProps } from 'next/image';
import { FunctionComponent } from 'react';

const LocalImage: FunctionComponent<ImageProps> = ({ alt, ...rest }) => (
  <Image
    {...rest}
    alt={alt}
    unoptimized
    loader={({ src }) => src}
  />
);

export default LocalImage;
