import '../styles/global.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../styles/prism-overrides.css';
import { ThemeProvider } from 'next-themes';

import ActiveSectionContextProvider from '../context/activeSectionContext';

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider enableSystem={true} attribute="class">
      <ActiveSectionContextProvider>
        <Component {...pageProps} />
      </ActiveSectionContextProvider>
    </ThemeProvider>
  );
}
