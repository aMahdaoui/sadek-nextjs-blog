import '../styles/global.css';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../styles/prism-overrides.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}
