import Image, { ImageProps } from 'next/image';
import { FunctionComponent } from 'react';

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
