import type { AppProps } from 'next/app';
import { middleware } from '../middleware';

function MyApp({ Component, pageProps }: AppProps) {
    middleware(pageProps);

    return <Component {...pageProps} />;
}

export default MyApp;