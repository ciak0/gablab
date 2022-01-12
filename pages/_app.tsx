import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/globals.css';

const Gablab = ({ Component, pageProps }: AppProps) => (
  <Component {...pageProps} />
);

export default Gablab;
