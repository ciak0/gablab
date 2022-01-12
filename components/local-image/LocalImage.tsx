import type { FunctionComponent } from 'react';
import Image, { ImageProps } from 'next/image';

export type LocalImageProps = ImageProps;

const LocalImage: FunctionComponent<LocalImageProps> = ({ alt, ...rest }) => (
  <Image
    {...rest}
    alt={alt}
    unoptimized
    loader={({ src }) => src}
  />
);

export default LocalImage;
