import * as React from 'react';
import Document, {
  Html,
  Head,
  Main,
  NextScript,
  DocumentContext,
} from 'next/document';
import { ServerStyleSheet } from 'styled-components';

export default class MyDocument extends Document {
  static async getInitialProps(ctx: DocumentContext) {
    const styledComponentsSheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            styledComponentsSheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {styledComponentsSheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      styledComponentsSheet.seal();
    }
  }

  render() {
    return (
      <Html lang="en">
        <Head title="Ego Gala Comics">
          <meta name="description" content="Incredibly satisfying illustrations." />

          <meta property="og:type" content="website" />
          <meta property="og:url" content="https://ego-gala-comics.vercel.app/" />
          <meta property="og:title" content="Ego Gala Comics (Social Media Title)" />
          <meta property="og:description" content="Incredibly satisfying illustrations. (Social Media Description)" />
          <meta property="og:image" content="https://ego-gala-comics.vercel.app/_next/image?url=%2Fkristen_shull.png&w=1080&q=75" />
          <meta property="og:image:alt" content="An image should have been here..." />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
          <meta property="og:site_name" content="Ego Gala Comics" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
