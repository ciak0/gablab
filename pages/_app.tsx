import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';
import '@fortawesome/fontawesome-svg-core/styles.css';

const Gablab = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default Gablab;
